import React, { Fragment } from "react";
import { Link } from "gatsby";
import { rhythm } from "../utils/typography";
import { formatReadingTime } from "../utils/helper";
import Slide from '@material-ui/core/Slide';

const PostList = ({ posts = [] }) => {
  return (
    <Fragment>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <Slide in={true} direction={"up"} {...{ timeout: 500 }} mountOnEnter unmountOnExit>
              <div>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4)
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
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
          </article>
        );
      })}
    </Fragment>
  );
};

export default PostList;
