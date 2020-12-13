const path = require('path')
const withStylus = require('@zeit/next-stylus')


let config = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            hooks: path.join(__dirname, 'src', 'hooks'),
            components: path.join(__dirname, 'src', 'components'),
        };
        return config;
    },
}

config = withStylus({
    ...config,
    cssModules: true
})


module.exports = config
