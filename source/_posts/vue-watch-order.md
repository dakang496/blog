---
title: Vue的watch执行顺序
date: 2019-08-18 20:26:48
tags:
---
## 问题
最近遇到了和watch相关的问题，执行顺序却不符合预期。  
先后改变了name2和name1的值，但触发watch的顺序却是先name1后name2。  

代码逻辑如下：

```html
<template>
  <div>
    <button @click="onClick">点击</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name1: "name1",
      name2: "name2"
    };
  },
  watch: {
    name1(val) {
      console.log(val);
    },
    name2(val) {
      console.log(val);
    }
  },
  methods: {
    onClick() {
      this.name2 = "name2!";
      this.name1 = "name1!";
    }
  }
};
</script>


```
执行结果：
name1!  
name2!  

## 响应式原理
在Vue文档中没有找到执行顺序的介绍，所以最好的方式就是从源码中一探究竟。  
先大概了解下Vue的响应式原理，请看[官方文档](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96)提供的图
![Vue的响应式原理](/images/vue-responsive.png)

简要说明下：  
把data的属性全部转为getter和setter。  
当属性被引用时，触发getter。在getter中，每个属性都对应一个dep对象，dep对象会存储当前的watcher，同时当前的watcher也会存储dep(这就是所谓的依赖收集)。
当属性被赋值时，触发setter。上面提到的dep就发挥作用了，它通知watcher执行。

本文的重点就是通知watcher执行的过程发生了什么？   

## 研究
下面是setter的源码，经过调试，发现属性name2是先于name1触发了。    
dep.notify()就是通知watcher执行，我们跟进去。  

```javascript
 set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
```

------------------------------


在dep的notify方法中，对subs按id从小到大排序，然后遍历执行它们的update方法。
subs存放着的就是watcher，在我们的例子中，name2的dep并不会有name1的watcher,所以这里的排序不影响例子的执行结果，重点看update方法。我们继续跟进去看。


```javascript
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

```
------------------------------

经过调试，执行了queueWatcher,所以lazy和sync这里不关注。 
queueWatcher的定义没有在watcher中，而是在/src/core/observer/scheduler.js文件。  
当跟进scheduler.js中，发现了这里就有本文的答案，涉及到了队列更新。

```javascript
  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
```

## 更新队列
其实在Vue的官方文档也有提到，下面是截取的一段话：
> 可能你还没有注意到，Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

**Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。**这一句尤为重要。本文例子中，name2的watcher先被通知的，被队列缓冲了。在这个事件循环中name1的watcher接着也被缓冲了。估计是执行队列时，这两个watcher顺序发生了变化，导致例子运行结果不符合预期。带着疑问继续看代码。

-------------------------------------
watcher会被添加到队列，执行flushSchedulerQueue方法会清理队列并执行里面的watcher。

```javascript
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
}
```
-------------------------------------

从这个方法中找到了本文的答案，原来在执行watcher前需要按它们的id从小到大进行排序，再按顺序执行。  
在调式中发现name1对应的watcher的id确实比name2的小，所以先执行了name1的watcher，虽然name2先被赋值，name2的watcher先被通知且放进更新队列中。


```javascript
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
```
----------------------------------------------

肯定大家都有疑问，name1的watcher的id为什么就小呢，我们从创建它们watcher的源码找到了答案。  
遍历定义Vue组件时的watch对象，每个属性都对应生成一个watcher。生成watcher时，id是自增的(代码没放上来，有兴趣的可以自行探索)。  
可见name1和name2对应的watcher的id就看遍历的顺序了。浏览器中遍历对象的顺序貌似也是值得探究的问题，这里不做讨论。  

```javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

```javascript
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```

## 结论
本文例子在chrome下执行，name1的watcher的id是比name2的小，所以name1的watcher先执行。  
有兴趣的可以试试把watch中定义的两个watcher的顺序调换下，可验证本文所说的。

