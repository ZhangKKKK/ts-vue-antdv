module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '8007',
    proxy: {
      '/mock': {
        target: 'http://localhost',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      }
    }
  }
}