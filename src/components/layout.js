import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <nav className="bg-gray-900 px-6 py-4 w-full">
          <ul className="flex gap-6 justify-center">
            {menuItems.map((item) => (
              <li key={item.order}>
                <Link
                  to={item.page.slug === '/' || item.page.slug === '' ? '/' : `/${item.page.slug}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full">
          <StaticImage
            src="../images/banner2.jpg"
            alt="Rubens logotyp"
            placeholder="blurred"
            layout="fullWidth"
            className="md:h-15"
            imgClassName="object-cover"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center w-full">
        <p>&copy; {new Date().getFullYear()} Ruben - Student at IT-Hogskolan</p>
      </footer>
    </div>
  );
};

export default Layout;
