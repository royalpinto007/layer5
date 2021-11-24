import React from "react";
import { ThemeProvider } from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Navigation from "../sections/General/Navigation";
import ResourceList from "../sections/Resources/Resource-list";
import Footer from "../sections/General/Footer";

import { GlobalStyle } from "../sections/app.style";
import theme from "../theme/app/themeStyles";
import {graphql} from "gatsby";

export const query = graphql`query ResourcesByTags($tag: String!, $skip: Int!, $limit: Int!) {
  allMdx(
    sort: {fields: [frontmatter___date], order: DESC}
    filter: {fields: {collection: {eq: "resources"}}, frontmatter: {tags: {in: [$tag]}, published: {eq: true}}}
    skip: $skip
    limit: $limit
  ) {
    totalCount
    nodes {
      id
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM Do, YYYY")
        author
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          extension
          publicURL
        }
      }
      fields {
        slug
      }
    }
  }
}
`;

const ResourceListPage = ({ pageContext, data }) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <GlobalStyle />
      <SEO title="Service Mesh Resources" description="Articles on how to service mesh from the world's largest service mesh community. Service mesh how-tos and cloud native ecosystem news."  />
      <Navigation />
      <ResourceList data={data} pageContext={pageContext} />
      <Footer />
    </Layout>
  </ThemeProvider>
);
export default ResourceListPage;