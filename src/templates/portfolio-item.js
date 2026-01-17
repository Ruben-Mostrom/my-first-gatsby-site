import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;

  // Options for rendering rich text, e.g., make h2 bigger
  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl md:text-4xl font-semibold my-4">{children}</h2>
    }
  };

  const image = getImage(item.image);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center">{item.title}</h1>

        {/* Image on top */}
        {image && (
          <GatsbyImage
            image={image}
            alt={item.image.description || `${item.title} main image`}
            className="mb-8 rounded-lg"
            imgClassName="block w-full"
          />
        )}

        {/* Description below */}
        {item.description && <div className="prose max-w-full">{renderRichText(item.description, options)}</div>}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      title
      slug
      description {
        raw
      }
      image {
        description
        gatsbyImageData(layout: CONSTRAINED, width: 2000, placeholder: BLURRED)
      }
    }
  }
`;

export const Head = ({ data }) => <title>{data.contentfulPortfolioItem.title}</title>;

export default PortfolioItemPage;
