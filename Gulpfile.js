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

let node, regex = new RegExp("listening at port");

stats(gulp);

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:5000",
        tunnel: true
    });
});

gulp.task('watch', function () {
	gulp.watch(['components/src/**/*.jsx', 'views/**/*.pug'], function () {
		runSequence('build', 'server');
	})
	gulp.watch(['server.js', 'routes/**/*.js', 'controllers/**/*.js', 'public/styles/**/*.css'], ['server'])
	gulp.watch(['client.js'], ['webpack'])
});

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['server.js'])
  node.stdout.on('data', (data) => {
    console.log(data.toString())
    if (regex.test(data.toString())) browserSync.reload()
  })
  node.stderr.on('data', (data) => {
    //throw new Error(data.toString())
  })
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
	runSequence('build', 'watch', 'server', 'browser-sync');
});

gulp.task('default', ['dev']);

process.on('exit', function() {
    if (node) node.kill()
})
