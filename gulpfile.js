var gulp = require('gulp'),
  imagemin = require('gulp-tinypng'),
  spritesmith = require('gulp.spritesmith');

//Image optimization

gulp.task('tinypng', function() {
  gulp.src('img/common/*.png')
    .pipe(imagemin('2dywIYbcYicKNU11BDeWwgwbkWptRk6g'))
    .pipe(gulp.dest('img/common/'));
});
gulp.task('tinypng-retina', function() {
  gulp.src('img/retina/*.png')
    .pipe(imagemin('2dywIYbcYicKNU11BDeWwgwbkWptRk6g'))
    .pipe(gulp.dest('img/retina/'));
});

// Sprite 

gulp.task('sprite', function generateSpritesheets () {
  // Use all normal and `-2x` (retina) images as `src`
  //   e.g. `github.png`, `github-2x.png`
  var spriteData = gulp.src('img/**/*.png')
    .pipe(spritesmith({
      // Filter out `-2x` (retina) images to separate spritesheet
      //   e.g. `github-2x.png`, `twitter-2x.png`
      retinaSrcFilter: 'img/**/*-2x.png',
      // Generate a normal and a `-2x` (retina) spritesheet
      imgName: 'sprite.png',
      retinaImgName: 'sprite-retina.png',
      // Optional path to use in CSS referring to image location
      imgPath: '../img/sprite.png',
      retinaImgPath: '../img/sprite-retina.png',
      // Generate SCSS variables/mixins for both spritesheets
      cssName: 'sprite.less'
    }));
  // Deliver spritesheets to `dist/` folder as they are completed
  spriteData.img.pipe(gulp.dest('img/'));
  // Deliver CSS to `./` to be imported by `index.scss`
  spriteData.css.pipe(gulp.dest('less/'));
});


// Default
gulp.task('default', [ 'sprite']);