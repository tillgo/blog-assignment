const { series, src, dest } = require('gulp')

function a() {
    return src('./src/views/**/*.*').pipe(dest('./dist/views'))
}

function b() {
    return src('./public/**/*.*').pipe(dest('./dist/public'))
}

exports.default = series(a, b)
