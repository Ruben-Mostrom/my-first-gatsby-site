import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import PortfolioPage from './portfolio';

const Page = ({ data }) => {
  const page = data.contentfulPage;

  // Render portfolio page separately
  if (page.slug === 'portfolio') {
    return <PortfolioPage />;
  }

  return (
    <Layout>
      <div className="content">
        {/* Page body */}
        {page.body && <div>{renderRichText(page.body)}</div>}
      </div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      body {
        raw
      }
    }
  }
`;

export const Head = ({ data }) => {
  const title = data.contentfulPage.slug === 'portfolio' ? 'Portfolio' : data.contentfulPage.title;
  return (
    <>
      <title>{title}</title> <meta name="description" content={data.contentfulPage.title}></meta>
    </>
  );
};
