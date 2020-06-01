import React from "react"
import { graphql } from "gatsby"
import Head from "../components/head"
import templateStyle from './template.module.scss'
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

const Blog = ({ data, pageContext }) => {
  //props.data paramater is the result of query
  const { markdownRemark: post } = data
  //above is alternate way of writing : 'const post = data.markdownRemark'
  return (
    <Layout>
      <Head subtitle="blog" />
      <h1>{post.frontmatter.title}</h1>
      <p className="blog-date-reading-time">
        <span className="blog-date"> {post.frontmatter.date}</span> |{" "}
        <span className="reading-time">{pageContext.readingTime}</span>
      </p>
      <div className={templateStyle.content}
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      ></div>
    </Layout>
  )
}

export default Blog
