module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/jurisdiction" : "/",
  presets: [
    '@vue/app'
  ]
}
