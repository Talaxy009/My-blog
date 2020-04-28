import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import RouterTabs from '../components/RouterTabs'
import Music from '../components/Music'
import Friends from '../components/Friends'
import SEO from '../components/seo'
import Bio from "../components/bio"

const CollectionsPage = props => {
  const { data } = props
  
  const siteTitle = data.site.siteMetadata.title
  const avatars = data.avatars.edges.map(avatar => avatar.node)
  const musicImages = data.musicImages.edges.map(musicImages => musicImages.node)

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="收藏" />
      <Bio />
      <RouterTabs routers={data.site.siteMetadata.menuLinks} currentPage="/collections/" />
      <p style={{margin: `1rem 0 0`, textAlign: `center`,fontSize: `1.2rem`,}}>音乐</p>
      <Music musicImages={musicImages} props={props} data={data}/>
      <p style={{textAlign: `center`,fontSize: `1.2rem`,}}>网站</p>
      <Friends avatars={avatars} props={props} data={data}/>
    </Layout>
  )
}

export default CollectionsPage

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
        musiclist {
          name
          image
          band
          time
          description
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
    musicImages: allFile(filter: {relativeDirectory: {eq: "album"}}) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`