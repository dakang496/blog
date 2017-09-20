---
title: 异步操作
date: 2017-09-20 22:29:29
tags:
---


## 异步处理的方式

- 最早是使用回调，但如果有多个，并且串行的话，就会嵌套了，在代码阅读和理解上增加了难度。

- 后来有了Promise，解决了这个问题。但是编写起来时，还是没办法做到与同步代码一样。(ES6)

- 接着新增了generator函数，但是需要自己处理流程管理。（ES6）

- 最后新增了async函数，解决了上面流程管理的问题。(ES7)

## 准备

主流浏览器还只是支持ES5，直接使用上面的语法是不行的。Babel是一款javascript的编译器，可以把高版本语法写的javascript代码转变为低版本的代码，然后可以运行在尚不支持高版本javascript的环境中。[Babel官网](https://babeljs.io/)

例如：

```
[1,2,3].map(n => n + 1);
```


转为


```
[1,2,3].map(function(n) {
    return n + 1;
});
```


#### 使用Babel

任意目录下，执行下面操作。（默认已经安装好npm工具）

- 目录下新建package.json文件

```
$ npm init
```

- 安装用于编译文件的Babel内置命令行工具[详细](http://babeljs.io/docs/usage/cli/)

```
$ npm install --save-dev  babel-cli
```

- 安装ES2015 preset

```
$ npm install --save-dev babel-preset-es2015  
```

- 新建.babelrc文件，并编辑

```
$ vi .babelrc  
```


```
{
  "presets":["es2015"]
}
```


- 安装Babel插件  [generator](http://babeljs.io/docs/plugins/transform-regenerator/) [async](http://babeljs.io/docs/plugins/syntax-async-functions/)

```
npm install babel-plugin-transform-regenerator
```

```
npm install babel-plugin-syntax-async-functions
```

在.baelrc中设置插件


```
{
  "presets":["es2015"],
  "plugins": ["syntax-async-functions","transform-regenerator"]

}
```


- 编译代码 [详细可见](https://babeljs.io/docs/usage/cli/)

```
$ babel script.js --watch --out-file script-compiled.js
```

--watch 或者-w 会监控代码自动编译，如果不需要，去掉即可

--out-file或者-o 设置输出的文件

- 在浏览器运行编译后的代码   [详细](http://babeljs.io/docs/usage/polyfill/)

编译后的代码不一定可以执行，可能会依赖别的环境，即babel-polyfill。

在babel-polyfill模块中的dist目录下找到polyfill.js，在html中先引入该脚本。

## 实例

### 传统回调

下面代码是请求书籍信息，然后显示计数。

可以看到嵌套了两个回调，如果嵌套多了，写起来复杂，还难懂。


```
function fetchBook(success,error){
    $.ajax({
        url:'/say/data/book.json',
        success:function(data, status, xhr){
            success&&success(data);
        },
        error:function(xhr, errorType, error){
            error&&error();
        }
    });
}

function counter(complete){
    setTimeout(function(){
        complete&&complete(10);
    },3000);
}
//嵌套回调
fetchBook(function(data){
    console.log('获取的数据:'+JSON.stringify(data));
    counter(function(num){
        console.log('获取的数值:'+num);
    });
});
```


### 使用Promise
几种状态：
+ 已完成（resolved，又称fulfilled） - 与 promise 有关的操作成功
+ 已拒绝（rejected） - 与 promise 有关的操作失败
+ 待定（pending） - 尚未执行或拒绝
+ 已解决 - 已执行或拒绝  -->这个不清楚是否也属于一种状态，是否是finally

下面代码的功能和上面一样，但是改成了Promise的形式，没有了嵌套回调，简洁了很多。

请求网络数据时也可以使用更简洁的fetch。

```
function fetchBook() {

    return new Promise(function(resolve,reject){
        $.ajax({
            url:'/say/data/book.json',
            success:function(data, status, xhr){
                resolve(data);
            },
            error:function(xhr, errorType, error){
                reject(error);
            }
        });
    });
    //return fetch('/say/data/book.json').then((response)=>response.json());
}
function counter(){

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },3000);
    });
}

fetchBook().then(function(data){
    console.log('获取的数据:'+JSON.stringify(data));
    return counter();
}).then(function(num){
    console.log('获取的数值:'+num);
});
```


### 使用generator函数

可以看到generator函数内部就像是写同步代码一样，没有了回调的嵌套，也没有了Promise一个个的then。

可是需要我们自己处理流程管理，即控制generator函数内部逻辑的执行。

那是否可以写一个通用的流程管理呢？其实是可以的。

当执行next方法时，获取到执行异步处理的返回值。如果这个返回值格式固定，就可以使用通用的逻辑处理下一步的操作了。

就像下面代码中，返回值都是promise，如果要控制执行generator函数的下一步，就可以在promise.then方法中调用next方法。采用递归的方式，可以不断执行next方法，直到generator函数结束。


```
function fetchBook() {
    return fetch('/say/data/book.json').then((response)=>response.json());
}

function counter(){

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },3000);
    });
}

function * gen(){
    console.log('开始获取书籍信息');
    var data=yield fetchBook();
    console.log('获取的数据:' + JSON.stringify(data));
    var num=yield counter();
    console.log('获取的数值:' + num);
}

//流程处理
var g=gen();
var result=g.next();
result.value.then(function(res){
    var result2=g.next(res);
    result2.value.then(function(res2){
        g.next(res2);
    });
});

/*
//基于promise的简单的通用流程管理
function executeGen(g){
    nextGen(g.next());

    function nextGen(genResult){
        if(genResult.done){
            return;
        }
        genResult.value.then(function(data){
            var result=g.next(data);
            nextGen(result)
        });
    }
}
executeGen(gen());*/
```


### 使用async函数

如你所见，没有了流程管理，更加简洁。


```
function fetchBook() {
    return fetch('/say/data/book.json').then((response)=>response.json());
}

function counter(){

    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(10);
        },3000);
    });
}

async function doWork(){
    console.log('开始获取书籍信息');
    var data=await fetchBook();
    console.log('获取的数据:' + JSON.stringify(data));
    var num=await counter();
    console.log('获取的数值:' + num);
}
doWork();
```
