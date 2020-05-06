---
title: 为Gatsby添加阅读时长提示
date: "2020-04-27T14:44:49.233Z"
description: "一直想要的功能，今天总算实现了"
---

## 前言

一些博客的时间栏附近会提示阅读完这篇博客大致所需要的时间，原理是统计这篇文章的总字数，然后按照每几百字对应一分钟来进行换算的，今天正好将此功能实现了，现记录在此

参考资料：[Dan Abramov大佬的博客](https://overreacted.io/)

## 修改index.js

在首页index.js的`pageQuery`下添加`timeToRead`

```js
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY年MM月DD日")
            title
            description
          }
        }
      }
    }
  }
`
```

是的，第一步并不是安装插件，原因是Gatsby的`gatsby-transformer-remark`自带这个功能，十分神奇，直接添加进GraphQL即可

## 编写helper.js

这是将时间数据转换成🍵或🍚并输出文本的主要文件

```js
export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  if (cups > 4) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍚')
      .join('')} 阅读需要 ${minutes} 分钟`;
  } else {
    return `${new Array(cups || 1).fill('🍵').join('')}阅读需要 ${minutes} 分钟`;
  }
}
```

每 5 minutes 会被转换为 1 cup 🍵（至少有 1 cup 🍵），当有 5 cups 🍵 以上时，每 e cups 🍵 会被转换为 1 🍚（约等于18mins，较为符合平均进餐时间）

时间和emoji都可以自行修改，下附全部食物emoji~

***

🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍅🍆🌽🍄🌰🍞🍖🍗🍔🍟🍕🍳🍲🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍡🍦🍧🍨🍩🍪🎂🍰🍫🍬🍭🍮🍯🍼☕🍵🍶🍷🍸🍹🍺🍻🍴

***

## 修改PostList.js

修改PostList.js中的`<small>`

PostList.js是我将index.js拆分后的文件，若你没有修改过index.js，则应在index.js中操作

```js
import { formatReadingTime } from "../utils/helper" //导入helper,路径请自行修改
//略
return (
  <article key={node.fields.slug}>
    <header>
      <small>
        {node.frontmatter.date}
        {` • ${formatReadingTime(node.timeToRead)}`}
      </small>
    </header>
  </article>
)
//略
```

## 修改blog-post.js

```js
import { formatReadingTime } from "../utils/helper" //导入helper,路径请自行修改
//略
<p
  style={{
  ...scale(-1 / 5),
  display: `block`,
  marginBottom: rhythm(1),
  }}
>
  {post.frontmatter.date}
  {` • ${formatReadingTime(post.timeToRead)}`} //插入代码
</p>
//略
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        description
      }
    }
  }
`
```

***

做完以上步骤后，阅读时长提示应该会完美的出现在你文章时间栏的附近(=v=)b

另外，经过这次实践后不得不感叹GraphQL的奇妙，以后有时间必须得深入了解下
