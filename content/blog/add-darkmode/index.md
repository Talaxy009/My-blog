---
title: 利用gatsby-plugin-use-dark-mode来添加夜间模式功能
date: "2020-05-01T15:37:09.233Z"
description: "又实现了一个一直想要的功能，现将过程记录于此~"
---

>一直以来，夜间模式都是人类眼睛的好朋友，但却常常被忽视。为了推动“夜间模式革命”，为人类带去黑暗，特写此文。

## 介绍

看完众大佬们的教程后还是选择了直接上插件，毕竟可以省去很多时间和精力（真香）。下文会介绍如何使用[gatsby-plugin-use-dark-mode](https://www.gatsbyjs.cn/packages/gatsby-plugin-use-dark-mode/?=dark)、[use-dark-mode](https://github.com/donavon/use-dark-mode)以及Material UI的[Icons](https://material-ui.com/zh/components/icons/)和[Button](https://material-ui.com/zh/components/buttons/)来制作一个顶级棒的夜间模式( •̀ ω •́ )y

## 准备步骤

* 安装所需插件

```bash
npm install gatsby-plugin-use-dark-mode use-dark-mode
npm install npm install @material-ui/core
```

* 在gatsby-config.js中启用`gatsby-plugin-use-dark-mode`

```js
module.exports = {
  plugins: [
    `gatsby-plugin-use-dark-mode`,
  ],
};
```

## 编写一个js文件来处理点击事件

[use-dark-mode](https://github.com/donavon/use-dark-mode#readme)提供了一个简单的示例来告诉我们如何调用它，如下

```js
import React from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './Toggle';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;
```

在这里我不想使用react-toggle而是使用Material UI的Icons和Button来显示，所以会有较大的修改，主要思路是：

当我点击了右上角的 ☀ ，它会调用夜间模式的插件来实现日间模式切换到夜间模式，同时把自己（☀）的`display`设置为`none`，而把 ☾ 的`display`设置为`block`。这样一来，当我想切换回日间模式时就需要点击 ☾ 了，然后将会发生的事同上。表面上看，似乎是一个Button干完了这些事，实际上是两个Buttons轮流显现和隐藏，而你每次点击的都不是同一个Button，这样能使页面更加的美观简洁，也让代码变得更简单些。

将上述说明实践之后，我得到了这个：

```js
import React from 'react'
import clsx from 'clsx'
import useDarkMode from 'use-dark-mode'
import { makeStyles } from '@material-ui/core/styles'
import Sun from '@material-ui/icons/WbSunnyRounded'
import Moon from '@material-ui/icons/Brightness2Rounded'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  turnOn:{
    display:'none',
  },
  turnOff:{
    display:'block',
  }
});

const DarkMode = () => {
  const darkMode = useDarkMode(false);
  const classes = useStyles();

  return (
    <div>
      <IconButton
      type="button"
      onClick={darkMode.enable}
      className={
        clsx({[classes.turnOff]:!darkMode.value,
        [classes.turnOn]: darkMode.value})
      }
      >
        <Sun style={{ color: '#ff9800' }}/>
      </IconButton>
      <IconButton
      type="button"
      onClick={darkMode.disable}
      className={
        clsx({[classes.turnOn]:!darkMode.value,
        [classes.turnOff]: darkMode.value})
      }
      >
        <Moon style={{ color:'#ffb74d' }}/>
      </IconButton>
    </div>
  );
};

export default DarkMode;

```

如上，对于最困难的部分——也就是两个Buttons的显隐，我使用了[clsx](https://www.npmjs.com/package/clsx)来对布尔型的`darkMode.value`进行判断来决定哪个Button的`display`是`none`哪个是`block`。

## 修改layout.js

现在我们已经有了能调用夜间模式插件的DarkMode.js——也就是那一对Buttons，剩下要做的就是让每个页面都有这对Buttons，方法便是修改layout.js的`<header>`。

```js
import DarkMode from "./DarkMode"
//略...
<header style={{display:'flex', justifyContent:'space-between'}}>
    {header}
    <DarkMode/>
</header>
//略...
```

## 在全局CSS文件中添加相关样式

```css
body.light-mode
{
 background-color: #fff;
 color: #333;
 transition: background-color 0.3s ease;
}

body.dark-mode
{
 background-color: #212121;
 color: #999;
 transition: background-color 0.3s ease;
}

.dark-mode blockquote
{
 color: #999;
 border-left: 0.32813rem solid #999;
}

```

以上步骤结束后，你的网页应该能正常的切换日间和夜间模式了

## 最后

仍然存在一些不足的是，部分组件无法随夜间模式改变自身颜色，这里需要自己去寻找和解决，我的方法是将background-color和color设为`inherit`，这样可以解决大多数的问题，实在不行便设为`#8f8f8f`——灰色，这样无论哪个模式都能够清晰地显示了。
