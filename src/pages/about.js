import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RouterTabs from "../components/RouterTabs";
import SEO from "../components/seo";
import Bio from "../components/bio";

const AboutPage = props => {
  const { data } = props;

  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="关于" />
      <Bio />
      <RouterTabs
        routers={data.site.siteMetadata.menuLinks}
        currentPage="/about/"
      />
      <Grow in={true} {...{ timeout: 500 }}>
        <p
          style={{
            margin: `1rem 0 1rem 0`,
            textAlign: `center`,
            fontSize: `1.2rem`
          }}
        >
          我
        </p>
      </Grow>
      <Slide direction="up" in={true} {...{ timeout: 500 }} mountOnEnter unmountOnExit>
        <div>
          <Card
            style={{
              transition: "background-color 0.5s ease",
              color: "inherit"
            }}
          >
            <CardContent>
              <li>
                是一个平凡的大学生，在广州上大学，计算机系大一新生~自认为能在一线城市上着喜欢的专业课是件幸福的事。
              </li>
              <li>
                属于到了新地方就喜欢到处乱跑的那种人，所以无论是在现实世界还是在游戏里的都有不错的方向感（低概率迷路）。
              </li>
              <li>
                最喜欢的点心的蛋黄酥，最喜欢的茶是菊普，最喜欢的节日是中秋节。
              </li>
              <li>
                感兴趣的东西有动漫、一二战、后摇，还喜欢毛茸茸的小动物，人生目标之一是养只猫或狗。
              </li>
              <li>
                偶尔会去拍些月亮、地标建筑、小花小草之类的，又一人生目标是拍出又大又圆的月亮。
              </li>
              <li>
                没有啥特别的建树，愿意虚心学习和真诚待人，又又一人生目标是能大胆的说出自己的心里话。
              </li>
            </CardContent>
          </Card>
        </div>
      </Slide>
    </Layout>
  );
};

export default AboutPage;

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
  }
`;
