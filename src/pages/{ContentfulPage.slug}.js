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
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Page title */}
          <h1 className="text-4xl font-bold mb-6 text-center text-white">{page.title}</h1>

          {/* Page body */}
          {page.body && <div className="prose prose-lg max-w-full mx-auto text-white">{renderRichText(page.body)}</div>}
        </div>
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
  return <title>{title}</title>;
};
