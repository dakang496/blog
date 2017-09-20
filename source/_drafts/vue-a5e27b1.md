---
title: vue源码学习笔记-a5e27b1
date: 2017-01-08 23:05:13
tags: vue源码学习笔记
---

## 获取含有特定前缀属性的元素集合els
属性名的结构

```
prefix-dirname
```
prefix为sd
dirname分别为text、show、class、on


## 解析成指令directive

元素的属性可看成此结构

```
prefix-dirname-arg="key | filter1 | filter2.."
```
解析后得到directive

```
{
  attr:当前属性,
  key:key,//认为是数据的索引key
  filters:filter的数组,
  definition:指令,//dirname对应的指令，
  argument:arg,
  update:definition或者definition.update //主要看definition是否为方法
}
```

## 绑定指令
### 绑定
修改数据会自动同步更新到页面元素上，更新页面的操作(指令)都应该对应到某个数据下的。所以绑定的关系，要以数据分类。

### 处理元素和数据和指令的关系

+ 在某数据名下建立绑定关系

```
bindings[key] = binding = {
    value: undefined,
    directives: []
}
```
+ 指明指令针对哪个元素

```
directive.el=el;
```

+ 添加指令

```
binding.directives.push(directive)
```

+ 操作数据触发指令
所有的数据都以key-value的形式存放在scope中。通过Object.defineProperty,当改动scope的数据时，可以触发指令。
该数据名下的每条指令就会针对自己的元素进行操作。

```
function bindAccessors (seed, key, binding) {
    Object.defineProperty(seed.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            binding.value = value
            binding.directives.forEach(function (directive) {
                if (value && directive.filters) {
                    value = applyFilters(value, directive)
                }
                directive.update(
                    directive.el,
                    value,
                    directive.argument,
                    directive,
                    seed
                )
            })
        }
    })
}

```

