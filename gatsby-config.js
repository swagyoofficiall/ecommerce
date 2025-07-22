require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Swagyo Shop`,
    siteUrl: `https://shop.swagyo.com`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ['GATSBY_SUPABASE_URL', 'GATSBY_SUPABASE_ANON_KEY'],
      },
    },
    // ✅ This removes old service workers from user browsers
    'gatsby-plugin-remove-serviceworker',
  ],
};
