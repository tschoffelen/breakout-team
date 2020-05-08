const tailwindConfig = require("./tailwind.config.js");

module.exports = {
    siteMetadata: {
        title: `Breakout Team`,
        description: `Video breakout rooms made easy.`,
        author: `@tschoffelen`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Breakout Team`,
                short_name: `Breakout`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: '#000000',
                display: `minimal-ui`,
                icon: `src/static/icon.png`
            }
        },
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/room/*`] },
        },
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                postCssPlugins: [
                    require(`tailwindcss`)(tailwindConfig),
                    require(`autoprefixer`),
                    ...(process.env.NODE_ENV === `production` ? [require(`cssnano`)] : [])
                ]
            }
        }
    ]
};
