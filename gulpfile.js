const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sync = require('browser-sync').create();
const del = require('del');
const webpack = require('webpack-stream');

const js = () => {
  return src('./src/js/**.ts')
  .pipe(webpack(
    require('./webpack.config.js')
  ))
  .pipe(dest('dist/js'))
  ;
}

const scss = () => {
  return src('src/scss/**.scss')
  .pipe(sass())
  .pipe(autoprefix({
    overrideBrowserslist: ['last 2 versions']
  }))
  .pipe(csso())
  .pipe(dest('dist/css'))
  ;
}

const images = () => {
  return src(['src/img/**/*'])
  .pipe(dest('dist/img'))
  ;
}

const clear = () => {
  return del('dist/css');
}

const build = series(clear, scss, js, images);

const serve = () => {
  sync.init({
    server: './',
  });
  watch('./src/scss/**.scss', series(scss)).on('change', sync.reload);
  watch('./src/js/**.ts', series(js)).on('change', sync.reload);
}

module.exports = {
  js, scss, images, serve, build,
};
