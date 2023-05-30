module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  plugins: ["@babel/plugin-syntax-jsx", "transform-export-extensions"],
  only: ["./**/*.jsx", "./**/*.js", "node_modules/jest-runtime"],
};