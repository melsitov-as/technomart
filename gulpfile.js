const gulp = require('gulp');
const sync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const csso = require("postcss-csso");
const sourcemap = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const gcmq = require('gulp-group-css-media-queries');

const styles = () => {
  return gulp.src('source/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const watcher = () => {
  gulp.watch("source/scss/**/*.scss", gulp.series("styles"));
  gulp.watch(["source/*.html", "source/css/*css"]).on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
