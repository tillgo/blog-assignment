const { series, src, dest } = require('gulp')
const gulpClean = require('gulp-clean')

function clean1() {
    return src('dist/public/*').pipe(gulpClean())
}
function clean2() {
    return src('dist/views/*').pipe(gulpClean())
}

function a() {
    return src('./src/views/**/*.*').pipe(dest('./dist/views'))
}

function b() {
    return src('./public/**/*.*').pipe(dest('./dist/public'))
}

exports.default = series(clean1, clean2, a, b)
