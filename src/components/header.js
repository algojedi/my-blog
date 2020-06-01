import React from "react"
import headerStyle from "./header.module.scss"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.title}>
        <Link className={headerStyle.titleLink} to="/">
          <h2 className={headerStyle.titleLink}>
            {data.site.siteMetadata.title}
          </h2>
        </Link>
      </div>
      <nav>
        <ul className={headerStyle.navList}>
          <li>
            <Link
              className={headerStyle.navLink}
              activeClassName={headerStyle.activeLink}
              to="/blog"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              className={headerStyle.navLink}
              to="/contact"
              activeClassName={headerStyle.activeLink}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
