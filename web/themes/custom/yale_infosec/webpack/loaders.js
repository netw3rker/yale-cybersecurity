const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const postcssCustomProperties = require('postcss-custom-properties');

const ImageLoader = {
  test: /\.(png|svg|jpg|gif)$/i,
  exclude: /icons\/.*\.svg$/,
  loader: 'file-loader',
};

const CSSLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        url: false,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve('./webpack/'),
        },
        ident: 'postcss',
        plugins: () => [
          postcssCustomProperties(),
          require('autoprefixer')({ grid: 'autoplace' })
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          importer: globImporter(),
          outputStyle: 'compressed',
        },
      },
    },
  ],
};

const SVGSpriteLoader = {
  test: /icons\/.*\.svg$/, // your icons directory
  loader: 'svg-sprite-loader',
  options: {
    extract: true,
    spriteFilename: '../dist/icons.svg',
  },
};

const FontLoader = {
  test: /.(woff|woff2|ttf|eot|otf)$/,
  loader: 'file-loader',
  include: [/fonts/],
};

module.exports = {
  CSSLoader,
  SVGSpriteLoader,
  ImageLoader,
  FontLoader
};
