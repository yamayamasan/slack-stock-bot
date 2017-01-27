'use strict';

const gulp = require('gulp');
const Hjson = require('gulp-hjson');

gulp.task('default');

gulp.task('hjson', (cb) => {
  gulp.src(['./hjson/*.hjson'])
    .pipe(Hjson({ to: 'json' }))
    .pipe(gulp.dest('./config'));
});
