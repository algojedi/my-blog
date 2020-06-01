import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import Head from "../components/head"

const Index = props => {
  return (
    <Layout>
      <Head subtitle="Home" />
      <h3 className="page-title">Welcome!</h3>
    </Layout>
  )
}
export default Index
