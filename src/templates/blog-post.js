import React from "react";
import { Link, graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import { formatReadingTime } from "../utils/helper";
import Valine from "gatsby-plugin-valine";
import Image from "gatsby-image";
import "../styles/code.css";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <Image fluid={post.frontmatter.img.childImageSharp.fluid} />
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1)
            }}
          >
            {post.frontmatter.date}
            {` • ${formatReadingTime(post.timeToRead)}`}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
      <div className="pagination">
        <div
          style={{
            width: `100%`,
            margin: `0 auto`
          }}
        >
          {previous && (
            <div style={{ float: `left`, maxWidth: `40%` }}>
              上一篇
              <br />
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            </div>
          )}
          {next && (
            <div style={{ float: `right`, maxWidth: `40%`, textAlign: `right` }}>
              下一篇
              <br />
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>
            </div>
          )}
        </div>
      </div>
      <Valine path={post.frontmatter.title} />
    </Layout>
  );
};

export default BlogPostTemplate;

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
        img {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
