// Configuration for your app
const SplitChunksPlugin = require('webpack').optimize.SplitChunksPlugin;
module.exports = function(ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'quillEditor',
      'custom'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      'fontawesome',
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {},
      chainWebpack(chain) {
        chain.plugin('split-chunk')
          .use(SplitChunksPlugin, [{
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 8,
            maxInitialRequests: 8,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              default: false,
              d3: {
                name: 'd3',
                test: /[\\/]node_modules[\\/]d3(-){0,1}[a-z]{0,100}[\\/]/,
                chunks: 'initial',
              },
              vueRouter: {
                name: 'vueRouter',
                test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                chunks: 'initial',
              },
              vuex: {
                name: 'vuex',
                test: /[\\/]node_modules[\\/]vuex[\\/]/,
                chunks: 'initial',
              },
              vueI18n: {
                name: 'vueI18n',
                test: /[\\/]node_modules[\\/]vue-i18n[\\/]/,
                chunks: 'initial',
              },
              vue: {
                name: 'vue',
                test: /[\\/]node_modules[\\/]vue[\\/]/,
                chunks: 'initial',
              },
              quasarFramework: {
                name: 'quasarFramework',
                test: /[\\/]node_modules[\\/]quasar-framework[\\/]/,
                chunks: 'initial',
              },
              quill: {
                name: 'quill',
                test: /[\\/]node_modules[\\/]quill[\\/]/,
                chunks: 'initial',
              },
              VueQuillEditor: {
                name: 'VueQuillEditor',
                test: /[\\/]node_modules[\\/]vue-quill-editor[\\/]/,
                chunks: 'initial',
              }
            }
          }]);
      }
    },
    devServer: {
      port: 7005,
      open: false, // opens browser window automatically
      proxy: {
        '/rest-api': {
          target: 'https://donsen.site',
          secure: false
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QChip',
        'QCollapsible',
        'QTimeline',
        'QTimelineEntry',
        'QPopover',
        'QScrollArea',
        'QInnerLoading',
        'QSpinnerGears',
        'QInfiniteScroll',
        'QSelect',
        'QCard',
        'QCheckbox',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QBtn',
        'QIcon',
        'QToggle',
        'QRating',
        'QLayoutDrawer',
        'QLayout',
        'QPageSticky',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QBtnDropdown',
        'QModal',
        'QField',
        'QInput',
        'QModalLayout',
        'QToolbar',
        'QToolbarTitle',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
      ],
      directives: [
        'CloseOverlay',
        "Scroll"
      ],
      // Quasar plugins
      plugins: [
        'Loading',
        'Screen',
        'Notify',
        'Dialog',
        'LocalStorage',
        'Meta'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: []
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
