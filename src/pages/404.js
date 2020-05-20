import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

import Head from "../components/head"
const NotFound = () => {
  return (
    <Layout>
      <Head subtitle="404" />
      <h1>Page Not Found</h1>
      <Link to="/">
        <p>Let's head home....</p>
      </Link>
    </Layout>
  )
}

export default NotFound
