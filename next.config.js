const path = require('path')
const withStylus = require('@zeit/next-stylus')
const withImages = require('next-images')


let config = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            hooks: path.join(__dirname, 'src', 'hooks'),
            assets: path.join(__dirname, 'src', 'assets'),
            components: path.join(__dirname, 'src', 'components'),
        };
        return config;
    },
}

config = withStylus({
    ...config,
    cssModules: true
})

config = withImages(config)


module.exports = config
