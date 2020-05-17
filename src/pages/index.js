import React from "react";
import { graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostList from "../components/PostList";
import RouterTabs from "../components/RouterTabs";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="首页" />
      <Bio />
      <RouterTabs routers={data.site.siteMetadata.menuLinks} currentPage="/" />
      <PostList posts={posts} />
    </Layout>
  );
};

export default BlogIndex;

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
          description
          name
          url
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
`;
