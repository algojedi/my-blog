import React from "react"
//import "../styles/index.scss"
import layoutStyle from "./layout.module.scss"
import Footer from "../components/footer"
import Header from "../components/header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={layoutStyle.container}>
        <div className={layoutStyle.content}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
