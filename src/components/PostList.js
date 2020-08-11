import React, { Fragment } from "react";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";
import { formatReadingTime } from "../utils/helper";
import Image from "gatsby-image";
import Slide from "@material-ui/core/Slide";

const PostList = ({ posts = [], articleImages = [] }) => {
  return (
    <Fragment>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <div className="post-item" key={node.fields.slug}>
            <Slide
              in={true}
              direction={"right"}
              {...{ timeout: 500 }}
              mountOnEnter
              unmountOnExit
            >
              <div className="post-image">
                <Link to={node.fields.slug}>
                  <Image fluid={node.frontmatter.img.childImageSharp.fluid} />
                </Link>
              </div>
            </Slide>
            <Slide
              in={true}
              direction={"up"}
              {...{ timeout: 500 }}
              mountOnEnter
              unmountOnExit
            >
              <div className="post-about">
                <header>
                  <p
                    style={{
                      marginBottom: rhythm(1 / 4),
                      fontSize: "1.4rem"
                    }}
                  >
                    <Link to={node.fields.slug}>{title}</Link>
                  </p>
                  <small>
                    {node.frontmatter.date}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt
                    }}
                  />
                </section>
              </div>
            </Slide>
          </div>
        );
      })}
    </Fragment>
  );
};

export default PostList;
