module.exports = {
  src: './src',
  tasks: {
    build: {
      tasks: ['example']
    },
    exampleStatic: {
      src: './src/example/**/*',
      dest: './example'
    },
    exampleDist: {
      src: './dist/**/*',
      dest: './example'
    },
    exampleBower: {
      watch: './bower_components/**/*',
      dest: './example/bower_components'
    },
    distJs: {
      src: './src/modal.js',
      dest: './dist'
    },
    distScss: {
      src: './src/scss/modal.scss',
      dest: './dist'
    },
    ghpages: {
      src: './example/**/*',
      watch: false
    }
  }
};
