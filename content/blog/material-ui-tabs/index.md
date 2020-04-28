---
title: 利用Material UI为Gatsby站点增加Tabs实现友链功能
date: "2020-03-19T18:14:00.000Z"
description: "好马配好鞍，研究了两天总算是摸清楚了，现将步骤记录在此"
---

## 一些有用的资料

[Material UI官网](https://material-ui.com/zh/)

[Material UI的一些Tabs样式](https://material-ui.com/zh/components/tabs/)

[Material UI的API](https://material-ui.com/zh/api/tab/)

## 安装Material UI

cd到自己的文件夹跟目录后按照官网提示安装即可

安装成功后根目录下的package.json应该会有以下段落

``` js
"@material-ui/core": "^4.9.6",
"@material-ui/styles": "^4.9.0",
```

## 编写RouterTabs.js

在/src/components下新建RouterTabs.js

``` js
import React, { useState } from 'react'
import { navigate } from 'gatsby'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const RouterTabs = ({ routers = [], currentPage}) => {
  const [index] = useState(
    routers.findIndex(v => v.link === currentPage)
  )
  return (
    <Tabs value={index} onChange={(_, value) => navigate(routers[value].link)} centered>
      {routers.map(router => (
        <Tab label={router.name} key={router.link} />
      ))}
    </Tabs>
  )
}

export default RouterTabs
```

这段代码利用了Material UI来生成Tabs和根据gatsby-config.js来生成对应的Tab

## 修改gatsby-config.js

在gatsby-config.js顶部加入以下代码

```js
const friendship = require('./friendship')
require('dotenv').config()
```

在`social`段下方插入以下代码

```js
menuLinks: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '友情链接',
        link: '/friends',
      },
    ],
friendship: [...friendship],
```

这些代码会获取根目录下friendship.js的数据，以提供给friends.js来生成页面，同时menulink储存的配置会提供给RouterTabs.js来生成对应的Tab

## 编写friendship.js

在根目录下新建friendship.js(一个push会对应一个展示出来的友链)

```js
const friendship = []
const push = (name, url, image = '' ) =>
  friendship.push({ name, url, image })

push('友链名称', '友链网址', '友链Logo')
push('友链名称', '友链网址', '友链Logo')

module.exports = friendship
```

这个文件主要是为了更方便的存储友链的一些信息

## 编写friends.js

在/src/pages/下新建friends.js

```js
import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import RouterTabs from '../components/RouterTabs'
import SEO from '../components/seo'
import Bio from "../components/bio"

const useStyles = makeStyles({
  friends: {
    margin: '1rem 0 0 0',
  },
})

const FriendPage = props => {
  const { data } = props
  const classes = useStyles()
  const siteTitle = data.site.siteMetadata.title

  const avatars = data.avatars.edges.map(avatar => avatar.node)

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="友情链接" />
      <RouterTabs routers={data.site.siteMetadata.menuLinks} currentPage="/friends/" />
      <div className={classes.friends}>
        {data.site.siteMetadata.friendship.map(friend => {
          const image = avatars.find(v =>
            new RegExp(friend.image).test(v.relativePath)
          )
          return (
            <div
              key={friend.name}
              className="friend-card"
              onClick={() => window.open(friend.url)}
            >
              <Image
                alt={props.alt}
                fluid={image.childImageSharp.fluid}
                onKeyDown={() => window.open(friend.url)}
                role="button"
                tabIndex="0"
                style={{
                  flex: 1,
                  maxWidth: 50,
                  borderRadius: '100%',
                }}
                imgStyle={{
                  borderRadius: '50%',
                }}
              />
              <div
                className="friend-card-content"
              >
                <span>{friend.name}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default FriendPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
        friendship {
          name
          url
          image
        }
      }
    }
    avatars: allFile(filter: {relativeDirectory: {eq: "friend"}}) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
```

这个文件用于生成友情链接的目录，设置了友链Logo保存的路径：`/content/assets/friend/`

## 修改index.js文件

在src/pages下的index.js文件的顶部添加

```js
import RouterTabs from '../components/RouterTabs'
```

`<Bio />`段下方添加以下代码

```js
<RouterTabs routers={data.site.siteMetadata.menuLinks} currentPage="/" />
```

这样便能在bio和推文之间给Tabs找个位置

至此便已经完成了80%，剩下的是调整友链页面的布局

## 修改css文件

若没有可在src中新建一个并在gatsby-browser.js中import

添加以下代码

```css
.friend-card
{
 margin-top: 1rem;
 display: flex;
 text-decoration-color: transparent;
 align-items: center;
 justify-content: flex-start;
 cursor: pointer;
}

.friend-card-content
{
 margin-left: 1rem;
}
```

这里是让友链的Logo和名字并排显示并隔出一点距离

至此你的网页应该可以完美的显示Tabs和友链界面了(=v=)b

如果还是觉得不够的话？可继续进行如下操作

## 自定义Tabs颜色

在文件中增加以下代码

```js
import { withStyles } from '@material-ui/core/styles';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#009ba1', //Tabs光标颜色(自行修改，下同)
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles({
  root: {
    textTransform: 'none',
    color: '#000000',//未选中Tab的颜色
    '&:hover': {
      color: '#009ba1',//鼠标下Tab的颜色
    },
    '&$selected': {
      color: '#009ba1',//已选中Tab的颜色
    },
  },
  selected: {},
})(props => <Tab disableRipple {...props} />);
```

并将文件内原来的`<Tabs>`改为`<StyledTabs>`；`<Tab>`改为`<StyledTab>`

## 优化friends页的顶部

为了让index页与friends页能有一样的顶部，可进行以下操作

在friends.js的`<SEO>`段下方插入`<Bio />`即可

最后为了防止header在friends页变小，可在src/components/下的layout.js下修改

将

```js
if (location.pathname === rootPath)
```

改为

```js
if (location.pathname === rootPath||location.pathname === `/friends/`)
```

这样便能防止header因为不是根目录而变小

## 结语

这次真的是受益匪浅！！！(=v=)b

代码多是从[Edward Elric大佬](https://github.com/SASUKE40/sasuke40.github.io)和[Himself65大佬](https://github.com/Himself65/himself65.github.io)贵处搬来再经研究修改后得来的

在研究Material UI官网教程的过程也逐步实现了如何进行以下诸如：自定义Tabs颜色、Tabs居中、优化friends页顶部等操作，最终完成了一个满意的作品，成就感爆棚！！！

以上
