/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 70, height: 70, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            pixiv
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 70,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        由<strong>{author.name}</strong>创作<br></br>{author.summary}<br></br>
        {` `}
        你可以在
        <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${social.twitter}`}>
          Twitter
        </a>
        、
        <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${social.github}`}>
          Github
        </a>
        、
        <a target="_blank" rel="noopener noreferrer" href={`https://pixiv.net/users/${social.pixiv}`}>
          Pixiv
        </a>
        上关注我~
      </p>
    </div>
  )
}

export default Bio
