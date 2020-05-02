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
npm install @material-ui/core
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

在这里我不想使用react-toggle而是使用Material UI的Icons和Button来显示，所以会有一些修改，主要思路是：

当我点击了右上角的 ☀ ，它会调用夜间模式的插件来实现模式地切换，同时把自己的 ☀ 设置为 ☾ 。这样一来，当我想切换回日间模式时点击的就是 ☾ 了，然后会发生的事同上。这样能使页面更加的美观简洁（个人认为），也让代码变得更简单些。

将上述说明实践之后，我得到了这个：

```js
import React from 'react'
import useDarkMode from 'use-dark-mode'
import Sun from '@material-ui/icons/WbSunnyRounded'
import Moon from '@material-ui/icons/Brightness2Rounded'
import IconButton from '@material-ui/core/IconButton'
const DarkMode = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <IconButton
      type="button"
      onClick={darkMode.value? (darkMode.disable) : (darkMode.enable) }
      >
        {
          darkMode.value?
          (<Moon style={{ color:'#ffb74d' }}/>):
          (<Sun style={{ color: '#ff9800' }}/>)
        }
      </IconButton>
    </div>
  );
};

export default DarkMode;

```

如上，一个简单的Button就出炉啦~

## 修改layout.js

现在我们已经有了能调用夜间模式插件的DarkMode.js——也就是那个Button，剩下要做的就是让每个页面都有个Button，方法便是修改layout.js的`<header>`。

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
