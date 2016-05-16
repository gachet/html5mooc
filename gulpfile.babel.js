import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var argv = require('yargs').argv;

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'modules'
    }
  });

  gulp.watch([
    'modules/**/*',
  ]).on('change', reload);

});

gulp.task('serve:dist', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('copyindex', () => {
  return gulp.src(`./modules/*.html`)
    .pipe(gulp.dest(`./dist`));
})

gulp.task('build', ['copyindex'], () => {
  console.log(argv);
  return gulp.src(`./modules/module${argv.module}/**/*`)
    .pipe(gulp.dest(`./dist/module${argv.module}`))
    .pipe($.zip(`./module${argv.module}.zip`))
    .pipe(gulp.dest(`./dist/module${argv.module}`));
});

gulp.task('deploy', ['build'], () => {
  return gulp.src('./dist')
    .pipe($.subtree())
    .pipe($.clean());
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
