const Encore = require('@symfony/webpack-encore');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const ASSET_PATH = "/build";
const OUTER_WEBPACK_PORT = process.env.OUTER_WEBPACK_PORT;

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath(ASSET_PATH)
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    .configureFilenames({
        js: '[name].js?[hash:8]',
        css: '[name].css?[contenthash:8]',
        images: '[name].[ext]?[contenthash:8]',
        fonts: '[name].[ext]?[contenthash:8]'
    })

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    // .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .disableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // ignored when .babelrc is present
    // enables @babel/preset-env polyfills
    // .configureBabelPresetEnv((config) => {
    //     config.plugins.push('@babel/plugin-transform-runtime');
    // config.useBuiltIns = 'usage';
    // config.corejs = 3;
    // })
    // configure babel-loader with second argument
    // .configureBabel(null,
    //     {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        // include bootstrap-vue src files for treeshaking
        // includeNodeModules: ['bootstrap-vue'],
    // })
    .addPlugin(new VuetifyLoaderPlugin())

    // enables Sass/SCSS support
    .enableSassLoader(function (options) {
        // options.data = `@import "./assets/css/vars.scss";`;
        // options.resolveUrlLoader = false;
        options.implementation = require('sass')
        options.fiber = require('fibers')
        options.indentedSyntax= true
    })

    .enableVueLoader()

    // .enableEslintLoader()
    .addLoader({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/],
        options: {
            configFile: './.eslintrc.js',
            fix: true,
            emitError: true,
            emitWarning: true,
        }
    })

    .enablePostCssLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    // .autoProvidejQuery()

// uncomment if you use API Platform Admin (composer req api-admin)
//.enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')
;

// export the final configuration
let webConfig = Encore.getWebpackConfig();
webConfig.name = 'webConfig';

if (webConfig.devServer) {
    webConfig.devServer.host = '0.0.0.0';
    webConfig.devServer.port = OUTER_WEBPACK_PORT;
    webConfig.devServer.public = "virus-webpack";
    webConfig.devServer.publicPath = "/build/";
    webConfig.devServer.disableHostCheck = true;
}

module.exports = [webConfig];
