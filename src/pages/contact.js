import React from "react"

import contactStyle from "./contact.module.scss"
import Layout from "../components/layout"

import Head from "../components/head"

const Contact = () => {
  return (
    <Layout>
      <Head subtitle="Contact" />
      <h2 className="page-title">Contact Me</h2>
    </Layout>
  )
}

export default Contact
