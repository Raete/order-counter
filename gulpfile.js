const gulp         = require('gulp');
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS     = require('gulp-clean-css'),
      include      = require('gulp-include'),
      plumber      = require('gulp-plumber'),
      rename       = require('gulp-rename'),
      sass         = require('gulp-sass'),
      uglify       = require('gulp-uglify'),

gulp.task('styles', () => {
    return gulp.src('scss/main-style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> .5%', 'android 4', 'ios 8']
        }))
        .pipe(gulp.dest('css'))
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                },
                2: {}
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
});

gulp.task('scripts', () => {
    return gulp.src('js/main.js')
        .pipe(plumber())
        .pipe(include())
        .pipe(rename({basename: 'script'}))
        .pipe(gulp.dest('js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js'));
});


gulp.task('watch', ['build'], () => {
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('js/main.js', ['scripts']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['styles', 'scripts']);
