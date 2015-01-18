var gulp = require('gulp'),
    sass = require('gulp-sass'),
    wiredep = require('wiredep'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    queue = require('streamqueue'),
    html2js = require('gulp-html2js'),
    concat = require('gulp-concat'),
    karma = require('karma').server


gulp.task('sass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(reload({stream:true}))
});

gulp.task('serve', ['wiredep', 'inject', 'sass', 'karma-conf', 'templates'], function(){
  browserSync({
    server: {
      baseDir: './',
    }
  })

  gulp.watch(['js/**/*.html', 'js/**/*.js', '!js/templates/*'], ['inject', 'wiredep', 'karma-conf', 'templates', reload]);
  // gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('wiredep', function(){
  gulp.src('index.html')
    .pipe(wiredep.stream())
    .pipe(gulp.dest(''))
})
 
gulp.task('inject', function(){
  gulp.src('index.html')
    // .pipe(inject(gulp.src('www/vendor/**/*.js'), {relative: true, name: 'vendor', read: false}))
    .pipe(inject(appFiles(), {relative: true}))
    .pipe(gulp.dest(''))
})

gulp.task('templates', function(){
  gulp.src('js/**/*.html')
    .pipe(html2js({
      outputModuleName: 'ngTemplates',
      base: 'js/'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/templates/'))
})

gulp.task('karma-conf', function () {
  return gulp.src('./karma.conf.js')
    .pipe(inject(testFiles(), {
      starttag: '// testfiles:js',
      endtag: '// endinject',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '\'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('karma', ['karma-conf'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
  // gulp.watch('www/**/*.js', ['karma-conf']);
});

function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(wiredep({
      devDependencies: true
    }).js))
    .queue(appFiles())
    .queue(gulp.src(['js/**/*_test.js']))
    .done();
}

function appFiles () {
  var files = [
    'js/**/*.js',
    '!js/**/*_test.js'
  ];
  return gulp.src(files)
    .pipe(angularFilesort());
}