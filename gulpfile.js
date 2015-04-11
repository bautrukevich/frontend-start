'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	connect = require('gulp-connect'),
	opn = require('opn'),
	notify = require('gulp-notify'),
	copy = require('gulp-copy'),
	less = require('fd-gulp-less');

var path = {
	project: {
		name: 'clodsystem',
	},
	build: {
		html: 'build/',
		js: 'build/assets/sys/js/',
		css: 'build/assets/sys/css/',
		img: 'build/assets/sys/img/',
		fonts: 'build/assets/sys/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/style.less',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.less',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

var server = {
	host: 'localhost',
	port: '1345'
};

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('webserver', function() {
	connect.server({
		host: server.host,
		port: server.port,
		livereload: true
	});
});

gulp.task('webserver-stop', function() {
	connect.server({
		host: server.host,
		port: server.port,
		livereload: true
	});
	connect.serverClose();
});

gulp.task('openbrowser', function() {
	opn( 'http://' + server.host + ':' + server.port + '/build' );
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(notify('HTML: Done!'))
		.pipe(connect.reload());
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(notify('JS: Done!'))
		.pipe(connect.reload());
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(notify('CSS: Done!'))
		.pipe(connect.reload());
});

gulp.task('image:build', function () {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}, {cleanupIDs: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(notify('IMG: Done!'))
		.pipe(connect.reload());
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(notify('FONTS: Done!'));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);

gulp.task('build-dev', function() {

    gulp.src('./' + path.build.css + '*')
        .pipe(copy('../../' + path.project.name + '/public', {prefix: 1}))
        .pipe(notify('COPY DEV CSS: Done!'));

    gulp.src('./' + path.build.js + '*')
        .pipe(copy('../../' + path.project.name + '/public', {prefix: 1}))
        .pipe(notify('COPY DEV JS: Done!'));

    gulp.src('./' + path.build.img + '**')
        .pipe(copy('../../' + path.project.name + '/public', {prefix: 1}))
        .pipe(notify('COPY DEV IMG: Done!'));

    gulp.src('./' + path.build.fonts + '**')
        .pipe(copy('../../' + path.project.name + '/public', {prefix: 1}))
        .pipe(notify('COPY DEV FONTS: Done!'));

});

gulp.task('watch', function(){
	watch([path.watch.html], function(event, cb) {
		gulp.start('html:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
});

gulp.task('default', ['build', 'webserver-stop', 'webserver', 'watch', 'openbrowser']);
gulp.task('start', ['build', 'webserver-stop', 'webserver', 'watch']);
gulp.task('stop', ['webserver-stop']);