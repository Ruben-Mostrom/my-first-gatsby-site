import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const PortfolioPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolioItem {
        nodes {
          slug
          title
          description {
            raw
          }
        }
      }
    }
  `);

  const items = data.allContentfulPortfolioItem.nodes;

  return (
    <Layout>
      <div className="content">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">Välkommen till min portfolio!</h1>
          <ul>
            {items.map((item) => (
              <li key={item.slug}>
                <Link to={`/portfolio/${item.slug}`}>
                  <h2>{item.title}</h2>
                </Link>
                {item.description?.raw && <div>{renderRichText(item.description)}</div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <title>Portfolio</title>;
export default PortfolioPage;
