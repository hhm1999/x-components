module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  globals: {
    'vue-jest': {
      experimentalCSSCompile: true,
      'resources': {
        'scss': [
          './components/assets/css/variable.scss',
          './components/assets/css/commonClass.scss'
        ]
      }
    }
  }
}
