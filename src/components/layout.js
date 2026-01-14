import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { container } from '../styles/layout.module.css';
import { StaticImage } from 'gatsby-plugin-image';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulMenuItem(sort: { order: ASC }) {
        nodes {
          label
          order
          page {
            slug
          }
        }
      }
    }
  `);

  const menuItems = data.allContentfulMenuItem.nodes;
  return (
    <div className={container}>
      <header>
        <div>
          <StaticImage
            src="../images/loggan.png"
            alt="Rubens logotyp"
            placeholder="blurred"
            layout="constrained"
            width={600}
          />

          <h1>Här är min header</h1>
        </div>
      </header>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.order}>
              <Link to={item.page.slug === '/' || item.page.slug === '' ? '/' : `/${item.page.slug}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main>{children}</main>
      <footer>Här lägger vi till en footer</footer>
    </div>
  );
};

export default Layout;
