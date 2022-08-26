const { environment } = require("@rails/webpacker");

const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  ".env.local",
  `.env.${process.env.NODE_ENV}`,
  ".env",
];

dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.insert(
  "Environment",
  new webpack.EnvironmentPlugin(process.env)
);

const customConfig = {
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "..", "..", "app/javascript/src"),
      "@components": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/components"
      ),
    },
  },
};

environment.config.merge(customConfig);

environment.splitChunks();

module.exports = environment;
