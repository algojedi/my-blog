/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config()

module.exports = {
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-image", //these next three plugins are for images
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",

    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-reading-time",
          "gatsby-remark-relative-images",
          "gatsby-remark-prismjs",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false, //disables having images clicks lead to the image
            },
          },
        ],
      },
    },
  ],
  siteMetadata: {
    author: "Sukhdev Banwait",
    title: "SUKHDEV BANWAIT",
    description: "A blog to journal my revelations in software development",
    social: {
      twitter: `codemanjedi`,
    },
  },
}
