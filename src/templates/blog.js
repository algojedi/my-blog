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
      <h1 className={templateStyle.title}>{post.frontmatter.title}</h1>
        <div className={templateStyle.subtitle}>
          <span className={templateStyle.blogDate}> {post.frontmatter.date}</span> |{" "}
          <span className={templateStyle.readingTime}>{pageContext.readingTime}</span>
        </div>
      <div className={templateStyle.content}
        dangerouslySetInnerHTML={{
          __html: post.html,
        }}
      ></div>
    </Layout> 
  )
}

export default Blog
