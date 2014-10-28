'use strict';

// gulp
var gulp = require('gulp');
var cached = require('gulp-cached');
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var del = require('del');

// css
var rework = require('gulp-rework');
var reworkSuit = require('rework-suit');

// js
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');

// dev/deploy
var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
var liveReload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');

var libName = 'react-time-slider'
var paths = {
  libSource: 'src/',
  dist: 'dist/',
  demo: 'demo/'
};
paths.static = [
  join(paths.demo, paths.libSource, '**/*'),
  join('!', paths.demo, paths.libSource, '**/*.css'),
  join('!', paths.demo, paths.libSource, '**/*.js'),
  'README.md'
]
paths.css = [
  join(paths.demo, paths.libSource, '**/*.css'),
  join(paths.libSource, '**/*.css')
]
paths.js = [
  join(paths.demo, paths.libSource, '**/*.js'),
  join(paths.libSource, '**/*.js')
]
var bundleCache = {};
var pkgCache = {};
function join (){
  return Array.prototype.slice.call(arguments).join('');
}

// demo
// ============================================================================

gulp.task('demo:clean', function (cb) {
  del(join(paths.demo, paths.dist), cb);
});

gulp.task('demo:css', function(){
  return gulp.src(join(paths.demo, paths.libSource, 'demo.css'))
    .pipe(cached('demo-css'))
    .pipe(rework(reworkSuit()))
    .pipe(gulp.dest(join(paths.demo, paths.dist)))
    .pipe(liveReload());
});

var demoBundler = watchify(
  browserify(join('./', paths.demo, paths.libSource, 'demo.js'), {
    cache: bundleCache,
    packageCache: pkgCache,
    fullPaths: true,
    standalone: 'demo',
    debug: true
  })
);
demoBundler.transform(reactify);
demoBundler.exclude('jquery');

gulp.task('demo:js', function(){
  return demoBundler.bundle()
    // browserify -> gulp transfer
    .pipe(source('demo.js'))
    .pipe(buffer())
    .pipe(cached('demo-js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(join(paths.demo, paths.dist)))
    .pipe(liveReload());
});

gulp.task('demo:static', function(){
  return gulp.src(paths.static)
    .pipe(cached('static-demo'))
    .pipe(gulp.dest(join(paths.demo, paths.dist)))
    .pipe(liveReload());
});

gulp.task("demo", function(callback) {
  return runSequence(
    ['demo:clean'],
    ['demo:css', 'demo:js', 'demo:static'],
    callback
  );
});

gulp.task('demo:server', function(cb){
  var port = parseInt(process.env.PORT) || 9090;
  var rootFolder = path.join(__dirname, paths.demo, paths.dist);
  var server = http.createServer(ecstatic({root: rootFolder}));
  server.listen(port, cb);
});

gulp.task('watch', function(){
  gulp.watch(paths.css, ['demo:css']);
  demoBundler.on('update', function(){
    gulp.start('demo:js');
  });
  gulp.watch(paths.static, ['demo:static']);
});

gulp.task('default', function(callback) {
  return runSequence(
    ['demo'],
    ['demo:server', 'watch'],
    callback
  );
});

// dist
// ============================================================================

gulp.task('dist:css', function(){
  gulp.src(join(paths.libSource, 'index.css'))
    .pipe(rename(join(libName, '.css')))
    .pipe(cached('dist-css'))
    .pipe(rework(reworkSuit()))
    .pipe(gulp.dest(paths.dist))
});

var distBundler = watchify(
  browserify(join('./', paths.libSource, 'index.js'), {
    cache: bundleCache,
    packageCache: pkgCache,
    fullPaths: true,
    standalone: libName,
    debug: true
  })
);
distBundler.transform(reactify);

gulp.task('dist:js', function(){
  var browserifyStream = distBundler.bundle()
    // browserify -> gulp transfer
    .pipe(source(join(libName, '.js')))
    .pipe(buffer())
    .pipe(cached('dist-js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));

  var lintStream = gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(browserifyStream, lintStream);
});

gulp.task('dist', ['dist:css', 'dist:js']);

// deploy
// ============================================================================

gulp.task('gh-pages', function(){
  return gulp.src(join(paths.demo, paths.dist, '**/*'))
    .pipe(deploy());
});

gulp.task('deploy', ['dist', 'demo', 'ghPages']);
