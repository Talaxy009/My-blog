const friendship = require('./friendship')
const musiclist = require('./musiclist')
require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `雪山深处`,
    author: {
      name: `Taozc`,
      summary: `广州大学生一枚，喜欢动漫、二战、后摇、新古典和小动物，最近在研究/学习Openwrt和Gatsby。`,
    },
    description: `一个个人博客，记录所思所想`,
    siteUrl: `https://snow-mountain.life/`,
    social: {
      twitter: `Taozc009`,
      github: `Talaxy009`,
      pixiv: `15409749`,
    },
    menuLinks: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '收藏',
        link: '/collections/',
      },
    ],
    friendship: [...friendship],
    musiclist: [...musiclist],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-158975002-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Taozc's Blog`,
        short_name: `Taozc`,
        lang: `zh`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#009ba1`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
