var gulp = require('gulp');
var notify = require("gulp-notify");
var argv = require('yargs').argv;
 
gulp.task("sendmessage", function () {
  return gulp.src("test.txt")
      .pipe(notify({message: "Complete", title: 'Build Process'}));
});


