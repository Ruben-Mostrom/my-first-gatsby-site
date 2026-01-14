const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  //hämta alla slugs från Contentful
  const result = await graphql(`
    query {
      allContentfulPortfolioItem {
        nodes {
          slug
        }
      }
    }
  `);
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  const items = result.data.allContentfulPortfolioItem.nodes;

  //skapa en sida för varje portfolio item
  items.forEach((item) => {
    createPage({
      path: `/portfolio/${item.slug}`, //måste matcha dina länkar
      component: path.resolve('./src/templates/portfolio-item.js'),
      context: {
        slug: item.slug // skickas in till page queryn som $slug
      }
    });
  });
};
