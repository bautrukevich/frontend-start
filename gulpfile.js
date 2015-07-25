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
	less = require('fd-gulp-less'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');

var packFor = 'site',
	path = {
		build: {
			html: 'public/',
			js: 'public/assets/' + packFor + '/js/',
			jsMin: 'public/assets/' + packFor + '/js/',
			css: 'public/assets/' + packFor + '/css/',
			cssMin: 'public/assets/' + packFor + '/css/',
			img: 'public/assets/' + packFor + '/img/',
			fonts: 'public/assets/' + packFor + '/fonts/'
		},
		src: {
			html: 'src/*.html',
			js: 'src/js/all.js',
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
		clean: './public'
	};

var server = {
	host: 'localhost',
	port: '1495'
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
	opn( 'http://' + server.host + ':' + server.port + '/public' );
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(notify('HTML: Done!'))
		.pipe(connect.reload());
});

gulp.task('html:build-dev', function () {
	gulp.src(path.src.html)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(notify('HTML: Done!'))
		.pipe(connect.reload());
});

gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		.pipe(notify('JS: Done!'))
		.pipe(connect.reload());
});

gulp.task('js:build-dev', function () {
	gulp.src(path.src.js)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rigger())
		//.pipe(sourcemaps.init())
		.pipe(uglify())
		//.pipe(sourcemaps.write())
		.pipe(rename('all.min.js'))
		.pipe(gulp.dest(path.build.jsMin))
		.pipe(notify('JS: Done!'))
		.pipe(connect.reload());
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		// .pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(prefixer())
		.pipe(gulp.dest(path.build.css))
		.pipe(notify('CSS: Done!'))
		.pipe(connect.reload());
});

gulp.task('style:build-dev', function () {
	gulp.src(path.src.style)
		// .pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(prefixer())
		.pipe(cssmin())
		// .pipe(sourcemaps.write())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(path.build.cssMin))
		.pipe(notify('CSS: Done!'))
		.pipe(connect.reload());
});

gulp.task('image:build', function () {
	gulp.src(path.src.img)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
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

gulp.task('image:build-dev', function () {
	gulp.src(path.src.img)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}, {cleanupIDs: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(notify('IMG DEV: Done!'))
		.pipe(connect.reload());
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(path.build.fonts))
		.pipe(notify('FONTS: Done!'));
});

gulp.task('fonts:build-dev', function() {
	gulp.src(path.src.fonts)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest(path.build.fonts))
		.pipe(notify('FONTS DEV: Done!'));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);

gulp.task('build-dev', [
	'html:build-dev',
	'js:build-dev',
	'style:build-dev',
	'fonts:build-dev',
	'image:build-dev'
]);

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

gulp.task('watch-dev', function(){
	watch([path.watch.html], function(event, cb) {
		gulp.start('html:build-dev');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build-dev');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build-dev');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build-dev');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build-dev');
	});
});

gulp.task('default', ['build', 'webserver-stop', 'webserver', 'watch', 'openbrowser']);
gulp.task('start', ['build', 'webserver-stop', 'webserver', 'watch']);
gulp.task('dev', ['build-dev']);
gulp.task('stop', ['webserver-stop']);
