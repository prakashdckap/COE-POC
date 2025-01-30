module.exports = {
  plugins:{
    tailwindcss: {},
    ...(process.env.REACT_APP_NEXTJS_PRODUCTION === 'production' ? { cssnano: {} } : {})
  }
}
