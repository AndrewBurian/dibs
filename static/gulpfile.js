
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync');


gulp.task('sass', function(){
  return gulp.src('scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    })) 
});

gulp.task('browserSync', function() {
  browserSync({
    proxy: "http://localhost:9000"
    
  })
})

gulp.task('default', ['browserSync', 'sass'], function (){
  gulp.watch('scss/styles.scss', ['sass']); 
  gulp.watch('views/*.html', browserSync.reload); 
  gulp.watch('**/*.js', browserSync.reload);
});