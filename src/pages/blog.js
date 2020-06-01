import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"
//this component renders a listing of all articles. BlogListPage should be better name

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
              readingTime {
                text
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <h2 className="page-title">Blog</h2>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <li className={blogStyles.listItem}>
              <Link to={`/blog/${node.fields.slug}`}>
                <h2>{node.frontmatter.title}</h2>
                <p>
                  {node.fields.readingTime.text} | {node.frontmatter.date}
                </p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
