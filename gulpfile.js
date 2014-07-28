var gulp = require('gulp');
var clean = require('gulp-rimraf');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var nib = require('nib');
var es = require('event-stream');
var merge = require('event-stream').concat;

var publicDir = './public';
var publicAssetsDir = './public/assets';

var concatLibJS = function() {
  return gulp.src([
      './frontend/lib/jquery/dist/jquery.js',
      './frontend/lib/bootstrap/dist/js/bootstrap.js',
      './frontend/lib/bootstrap/js/button.js',
      './frontend/lib/moment/moment.js',
      './frontend/lib/underscore/underscore.js',
      './frontend/lib/angular/angular.js',
      './frontend/lib/angular-route/angular-route.js',
      './frontend/lib/angularjs-google-maps/dist/ng-map.js',

    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(publicAssetsDir));
};
var concatAppJS = function() {
  return gulp.src('./frontend/app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest(publicAssetsDir));
};
var concatCSS = function(){
  return gulp.src([
    './frontend/app/**/*.styl',
    ])
    .pipe(stylus({use: [nib()]}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(publicAssetsDir));
};
var copyStuff = function() {
  return gulp.src(['./frontend/**/*', '!./frontend/**/*.js', '!./frontend/**/*.styl', '!./frontend/lib/**/*'])
    .pipe(filterEmptyDirs())
    .pipe(gulp.dest(publicDir));
};
//removes empty dirs from stream
var filterEmptyDirs = function() {
  return es.map(function(file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
  });
};

gulp.task('clean', function(){
   return gulp.src(publicDir,{read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function(){

  gulp.watch('./frontend/app/**/*.js', function(){
    console.log("File change - concatAppJS()");
    concatAppJS();
  });
  gulp.watch('./frontend/lib/**/*.js', function(){
    console.log("File change - concatLibJS()");
    concatLibJS();
  });
  gulp.watch('./frontend/app/**/*.styl', function(){
    console.log("File change - concatCSS()");
    concatCSS();
  });
  gulp.watch(['./frontend/**/*', '!./frontend/**/*.js', '!./frontend/**/*.styl', '!./frontend/lib/**/*'], function(){
    console.log("File change - copyStuff()");
    copyStuff();
  });

  return merge(copyStuff(), concatLibJS(), concatAppJS(), concatCSS());
});

gulp.task('build', ['clean'], function(){
  return merge(copyStuff(), concatLibJS(), concatAppJS(), concatCSS());
});
