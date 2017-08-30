"use strict";
/*
* Utils
*/
const gulp = require('gulp');
const filter = require('gulp-filter');
const clip = require('gulp-clip-empty-files');
const watch = require('gulp-watch');
const util = require('gulp-util');
const rename = require('gulp-rename');
var print = require('gulp-print');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');
const browsersync = require('browser-sync').create();
/*
* JS
*/
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

var APPENV = {
  PROD: process.env.NODE_ENV === 'production',
}

class AppFoldersStore {
  constructor() {
		/*
		 * Common app resources
		 */
    this.commonAppSource = path.resolve("./app");
    this.commonAppSourceJS = path.join(this.commonAppSource, "js");
    this.commonAppSourceCSS = path.join(this.commonAppSource, "css");
    this.commonAppSourceImages = path.join(this.commonAppSource, "images");
    /*
     * Public or destination folder
     */
    this.distFolder = path.resolve("./public");
    this.distAssetsFolder = path.join(this.distFolder, "assets");
    // stab
    this.distStab = path.join(this.distAssetsFolder, "stab");
    this.distStabJS = path.join(this.distStab, "js");
    this.distStabStabCSS = path.join(this.distStab, "css");
    // dev
    this.distDev = path.join(this.distAssetsFolder, "dev");
    this.distDevJS = path.join(this.distDev, "js");
    this.distDevCSS = path.join(this.distDev, "css");
    /*
    *
    */
    this.browsersyncTarget = path.resolve(this.distFolder);
    this.sassCoreTarget = path.join(this.commonAppSourceCSS, "/**/*.scss");
    this.jsWatcherCoreTarget = path.join(this.commonAppSourceJS, "/**/*.js");
    this.webpackCoreTarget = path.join(this.commonAppSourceJS, "main.js");
  }

  static checkFolderExist(folder) {
    throw new Error("Not implemented yet");
  }
}

const AppFolders = new AppFoldersStore();

gulp.task('default', () => {
  runSequence('browser-sync', 'dev:sass', 'dev:js', 'browsersync-reload');
});

gulp.task('dev:sass', () => {
  gulp.watch([AppFolders.sassCoreTarget], (event) => {
    runSequence('build:css:sass', 'browsersync-reload');
  });
});

gulp.task('build:css:sass', () => {
  return gulp.src([AppFolders.sassCoreTarget])
    .pipe(clip())
    .pipe(sass({
      includePaths: ['./node_modules']
    }).on('error', function (e) {
      logger.error(e);
      this.emit('end');
    }))
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest(AppFolders.distDevCSS));
});

gulp.task('dev:js', () => {
  gulp.watch([AppFolders.jsWatcherCoreTarget], (event) => {
    runSequence('dev:js:jshint', 'build:dev:js:webpack', 'browsersync-reload');
  }); 
});  

gulp.task('dev:js:jshint', () => {
  return gulp.src(AppFolders.jsWatcherCoreTarget)
    .pipe(jshint({
        esnext: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('build:dev:js:webpack', () => {
  return gulp.src([])
    .pipe(webpackStream({
      entry: {
        app: AppFolders.webpackCoreTarget
      },
      output: {
        filename: "[name].js"
      },
      devtool: ["source-map", "cheap-module-source-map"], 
      modules: [path.resolve('./node_modules')],
      module: {
        loaders: [
          {
            test: /.js?$/,
            loader: 'babel',
            exclude: /node_modules|bower_components/,
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      plugins: [new webpack.DefinePlugin({
        ENV: APPENV
      })]
    }, null, (e) => {
      logger.message(e)
    })).on('error', function (e) {
      logger.error(e);
      this.emit('end');
    }).pipe(gulp.dest(AppFolders.distDevJS));
});

gulp.task('browser-sync', () => {
  //https://www.browsersync.io/docs/options
  browsersync.init({
    server: {
      baseDir: AppFolders.browsersyncTarget
    },
    port: 8654,
    online: false,
    notify: false,
    browser: "chromium-browser"
  });
});


gulp.task('browsersync-reload', () => {
  browsersync.reload();
})

var logger = {
  error: (message) => {
    console.error(message);
  },
  message: (message) => {
    console.log(message);
  }
};