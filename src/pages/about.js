import React from "react"
import aboutStyle from "./about.module.scss"
import Layout from "../components/layout"
import Head from "../components/head"
const About = () => {
  return (
    <Layout>
      <Head subtitle="About" />
      <h2>I am the about pg</h2>
    </Layout>
  )
}

export default About
