'use strict'

const path = require('path')
const gulp = require('gulp')
const browserSync = require('browser-sync').create();
const plugins = require('gulp-load-plugins')()
const stats = require('gulp-stats')
const runSequence = require('run-sequence')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const spawn = require('child_process').spawn

let node;

stats(gulp);

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:5000"
    });
});

gulp.task('watch', function () {
	gulp.watch(['components/src/**/*.jsx', 'views/**/*.jade'], function () {
		runSequence('build', 'server');
	}).on('change', browserSync.reload);
	gulp.watch(['server.js', 'routes/**/*.js'], ['server']).on('change', browserSync.reload);
	gulp.watch(['client.js'], ['webpack']).on('change', browserSync.reload);;
});

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('webpack', function (done) {
		webpack(webpackConfig, function (err, stats) {
			if (err) throw new plugins.util.PluginError('webpack', err);
      plugins.util.log('[webpack]', stats.toString({chunks: false}));
			done();
		});
});

gulp.task('babel', function () {
  return gulp.src('components/src/**/*.jsx')
    .pipe(plugins.babel())
    .pipe(gulp.dest('components/dist'));
});

gulp.task('build', function (done) {
	runSequence('babel', 'webpack', done);
});

gulp.task('dev', function () {
	runSequence('build', 'watch', 'browser-sync', 'server');
});

gulp.task('default', ['dev']);

process.on('exit', function() {
    if (node) node.kill()
})
