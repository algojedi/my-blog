import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import indexStyle from "./index.module.scss"
import Head from "../components/head"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import { IconContext } from "react-icons";


const Index = props => {
  return (
    <Layout>
      <Head subtitle="Home" />
      <h3 className="page-title">
        Welcome to my site, dedicated largely to the quote...
      </h3>
        <blockquote className={indexStyle.blockquote}>
<IconContext.Provider
      value={{ color: 'blue', size: '50px', className: "react-icon" }}
    >
          <FaQuoteLeft />
          <p className={indexStyle.quote}>
            If you can't explain something in simple terms, you don't understand
            it 
          </p>
          <cite className={indexStyle.author}>-Richard Feynman</cite>
      </IconContext.Provider>
        </blockquote>
        <p>
          I hope you find the articles on this site as useful in reading as I
          found in writing them.
        </p>
    </Layout>
  )
}
export default Index
