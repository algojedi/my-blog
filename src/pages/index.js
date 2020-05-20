import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import Head from "../components/head"

// avatar: file(absolutePath: { regex: "/sbphoto-sm.jpg/" }) {
//         childImageSharp {
//           fixed(width: 50, height: 50) {
//             ...GatsbyImageSharpFixed
//           }
//         }
//       }

//the below query result will get sent to this component as a prop
export const query = graphql`
  query {
    avatar: file(relativePath: { eq: "images/sbphoto-sm.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 100, maxHeight: 200) {
          ...GatsbyImageSharpFluid
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`
const Index = props => {
  console.log("$$$$ the image is in.... ", props.data)
  return (
    <Layout>
      <Head subtitle="Home" />
      <div>I Played Around... still working?</div>

      <Img fluid={props.data.avatar.childImageSharp.fluid} alt="" />
      <p>
        <Link to="/404">lets go to blog</Link>
      </p>
    </Layout>
  )
}
export default Index
