var gulp = require('gulp');
var notify = require("gulp-notify");

gulp.task("sendmessage", function () {
  return gulp.src('')
      .pipe(notify({message: "Complete: " + new Date().toTimeString(), title: 'Build Process'}));
});


