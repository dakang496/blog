---
title: git学习 
date: 2016-12-02 10:13:45
tags:
---

## 传统的VCS和git的区别

## 三种状态和对应的三个工作区域
### 状态
+ modified
+ staged
+ committed
### 区域
+ 工作区域
+ 暂存区域
+ 本地仓库

## 配置文件的三个位置

+ /etc/gitconfig
+ ~/.gitconfig或者~/.config/git/config
+ .git/config

范围小的会覆盖范围大的配置

```
git config --list
git config user.name "John Doe"    //可添加指定修改哪个范围的，目前当前目录下的配置。--system、--global
```
## 忽略文件（不纳入git管理）
在项目目录下，添加.gitignore文件，可指定忽略的文件，内容格式为：
1、所有空行或者以 # 开头的行都会被 Git 忽略。
2、可以使用标准的 glob 模式匹配。（ shell 所使用的简化了的正则表达式）。
3、匹配模式可以以( / )开头防止递归。
4、匹配模式可以以( / )结尾指定目录。 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号( ! )取反。


## 常用命令操作

+ 现有目录或者项目使用git
```
git init
```

+ 克隆仓库
```
git clone https://github.com/test/test.git
```

+ 检查当前文件状态
```
git status
```

+ 跟踪新文件或者暂存已修改文件
```
git add xxx   //xxx可以是文件或者文件夹路径，相对于当前目录
```

+ 撤销修改
1、撤销工作区域的修改
```
git reset --hard HEAD
```
2、撤销工作区域某个文件的修改
```
git checkout HEAD <file>
```
3、撤销暂存区域的某个文件的修改

```
git reset HEAD <file>
```
4、合并上一次提交
```
git commit --amend
```
+ 删除文件
1、删除工作区域的文件
```
git rm <file>
```
2、删除已经在暂存区的文件
```
git rm --cached <file>
```

+ 移动文件
```
git mv <file> <file>
```

+ 查看提交历史
```
git log
git log -p -<number>
git log --stat
git log --pretty=<option>
```


