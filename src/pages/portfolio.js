import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const PortfolioPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolioItem {
        nodes {
          slug
          title
          image {
            description
            gatsbyImageData(
              layout: CONSTRAINED
              width: 800 # bigger images
              placeholder: BLURRED
            )
          }
        }
      }
    }
  `);

  const items = data.allContentfulPortfolioItem.nodes;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-white">Welcome to my portfolio!</h1>

        <ul className="list-none p-0 m-0 grid gap-12 sm:grid-cols-1 md:grid-cols-2">
          {items.map((item) => {
            const image = getImage(item.image);

            return (
              <li key={item.slug} className="list-none">
                <Link to={`/portfolio/${item.slug}`} className="block">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">{item.title}</h2>
                  {image && (
                    <GatsbyImage
                      image={image}
                      alt={item.image.description || item.title}
                      className="rounded-md w-full h-auto"
                      imgClassName="block w-full h-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <>
    <title>Portfolio</title>
    <meta name="description" content="Portfolio"></meta>
  </>
);

export default PortfolioPage;
