import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import DarkMode from "./DarkMode"
import RSS from "@material-ui/icons/RssFeedRounded"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath||location.pathname === `/collections/`) {
    header = (
      <h1
        style={{
          ...scale(0.8),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header style={{display:'flex', justifyContent:'space-between'}}>
        {header}
        <DarkMode/>
      </header>
      <main>{children}</main>
      <footer style={{textAlign: 'center', fontSize: '0.8rem',}} >
        <a target="_blank" rel="noopener noreferrer" href="http://beian.miit.gov.cn/">粤ICP备20015580号</a>
        <br/>
        ©{new Date().getFullYear()}<br/>
        由<a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">Gatsby</a>强力驱动<br/>
        <RSS style={{fontSize:'14px'}} />
        <a target="_blank" rel="noopener noreferrer" href="https://snow-mountain.life/rss.xml">RSS订阅</a>
      </footer>
    </div>
  )
}

export default Layout
