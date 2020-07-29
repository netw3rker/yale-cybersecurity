const path = require('path');
const globImporter = require('node-sass-glob-importer');
const _StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = async ({ config }) => {
  // In the case of using yarn/npm link, this will help.
  config.resolve = { symlinks: false };

  // For hot reloading (watch), ignore node_modules except the yale-scss/twig directories.
  config.watchOptions = {
    ignored: [
      /node_modules\/(?!(yale-scss|yale-twig)\/)/,
      /\(?!(yale-scss|yale-twig)([\\]+|\/)node_modules/,
    ],
  };

  // Transpile yale-twig because it includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(yale-twig)\/)/];
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  // Twig
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: 'twig-loader',
        options: {
          twigOptions: {
            namespaces: {
              'yale-atoms': path.resolve(__dirname, '../', 'node_modules/@yalesites-org/yale-twig/01-atoms'),
              atoms: path.resolve(__dirname, '../', 'components/01-atoms'),
              molecules: path.resolve(
                __dirname,
                '../',
                'components/02-molecules',
              ),
              organisms: path.resolve(
                __dirname,
                '../',
                'components/03-organisms',
              ),
              templates: path.resolve(
                __dirname,
                '../',
                'components/04-templates',
              ),
              pages: path.resolve(
                __dirname,
                '../',
                'components/05-pages',
              ),
            },
          },
        },
      },
    ],
  });

  // SCSS
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          sassOptions: {
            importer: globImporter(),
          },
        },
      },
    ],
  });

  config.plugins.push(
    new _StyleLintPlugin({
      configFile: path.resolve(__dirname, '../', 'webpack/.stylelintrc'),
      context: path.resolve(__dirname, '../', 'components'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
  );

  // YAML
  config.module.rules.push({
    test: /\.ya?ml$/,
    loader: 'js-yaml-loader',
  });

  // JS
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    include: /node_modules\/yale-/,
    loader: 'eslint-loader',
    options: {
      cache: true,
    },
  });

  return config;
};
