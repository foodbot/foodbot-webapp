var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var rename = require('gulp-rename');
var es = require('event-stream');
var merge = require('event-stream').concat;

// var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var nib = require('nib');


var concatLib = function() {
  return gulp.src([
      './src/lib/jquery/dist/jquery.js',
      './src/lib/bootstrap/dist/js/bootstrap.js',
      './src/lib/bootstrap/js/button.js',
      './src/lib/moment/moment.js',
      './src/lib/underscore/underscore.js',
      './src/lib/angular/angular.js',
      './src/lib/angular-route/angular-route.js',
      './src/lib/angular-moment/angular-moment.js',
      './src/lib/angularjs-google-maps/dist/ng-map.js',
      './src/lib/spin.js/spin.js',
      './src/lib/angular-spinner/angular-spinner.js',
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/'));
};
var concatApp = function() {
  return gulp.src('./src/app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/'));
};
var concatCSS = function(){
  return gulp.src('./src/app/**/*.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/'));
};
var copyStuff = function() {
  return gulp.src(['./src/**/*', '!./src/**/*.js', '!./src/**/*.styl', '!./src/lib/**/*'])
    .pipe(filterEmptyDirs())
    .pipe(gulp.dest('public/'));
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
   return gulp.src('./public/',{read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function(){

  gulp.watch('./src/app/**/*.js', function(){
    console.log("File change - concatApp()");
    concatApp();
  });
  gulp.watch('./src/lib/**/*.js', function(){
    console.log("File change - concatLib()");
    concatLib();
  });
  gulp.watch('./src/app/**/*.styl', function(){
    console.log("File change - concatCSS()");
    concatLib();
  });
  gulp.watch(['./src/**/*', '!./src/**/*.js', '!./src/**/*.styl', '!./src/lib/**/*'], function(){
    console.log("File change - copyStuff()");
    copyStuff();
  });

  return merge(copyStuff(), concatLib(), concatApp(), concatCSS());
});

gulp.task('build', ['clean'], function(){
  return merge(copyStuff(), concatLib(), concatApp(), concatCSS());
});
