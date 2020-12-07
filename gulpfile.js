// 0. 导入 gulp
const gulp = require('gulp')
    // 1-1. 导入gulp-sass 第三方包
const sass = require('gulp-sass')
    // 1-2. 导入 gulp-cssmin 第三方包
const cssmin = require('gulp-cssmin')
    // 1-3. 导入 gulp-autoprefixer 第三方包
const autoprefixer = require('gulp-autoprefixer')
    // 3-1. 导入 gulp-uglify 
const uglify = require('gulp-uglify')
    // 3-2. 导入 gulp-babel
const babel = require('gulp-babel')
    // 4. 导入 gulp-htmlmin
const htmlmin = require('gulp-htmlmin')
    // 5. 导入 gulp-imagemin (此处因为网络原因没有导入这个 gulp-imagemin 第三方包)
    // const imagemin = require('gulp-imagemin')
    // 7. 导入 del
const del = require('del')
    // 8. 导入 gulp-webserver
const webserver = require('gulp-webserver')



// 当任务创建完成以后，就可以在命令行去执行了
// 打开命令行，切换目录到你的 gulpfile.js 所在的目录
// 执行指令 $ gulp 任务名称

// 就会把你的函数书写的任务去完成

// 1. sass 文件 - gulp4 的书写信息
const sassHandler = () => {
        return gulp
            .src('./src/sass/*.scss')
            .pipe(sass()) // 转码
            .pipe(autoprefixer()) // 添加前缀
            .pipe(cssmin()) // 压缩
            .pipe(gulp.dest('./dist/sass/')) // 存放到指定目录
    }
    // 2. 打包 css 文件
const cssHandler = () => {
        return gulp
            .src('./src/css/*.css')
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./dist/css/'))
    }
    // 3. 打包 js 文件
const jsHandler = () => {
        // 找到 js 文件
        return gulp
            .src('./src/js/*.js')
            .pipe(babel({ presets: ['@babel/env'] })) //ES6转码
            .pipe(uglify()) // 压缩
            .pipe(gulp.dest('./dist/js/')) // 保存
    }
    // 4. 打包 html 文件
const htmlHandler = () => {
        // 找到 html 文件
        return gulp
            .src('./src/pages/*.html')
            // 因为 htmlmin 的所有的打包信息都需要以参数的形式进行配置
            .pipe(htmlmin({ // 压缩
                collapseWhitespace: true, // 去除空白内容
                collapseBooleanAttributes: true, // 简写布尔值属性
                removeAttributeQuotes: true, // 去除属性上得双引号
                removeComments: true, // 去除注释
                removeEmptyElements: true, // 去除空元素
                removeEmptyAttributes: true, // 去除空的属性
                removeScriptTypeAttributes: true, // 去除 script 标签上得 type 属性
                removeStyleLinkTypeAttributes: true, // 去除 style 和 link 标签上得 type 属性
                minifyJS: true, // 压缩内嵌式 js 代码，不认识 ES6
                minifyCSS: true, // 压缩内嵌式 css 文本，不能自动前缀
            }))
            .pipe(gulp.dest('./dist/pages/')) // 保存
    }
    // 5. 打包 image 文件
const imgHandler = () => {
        // 找到文件
        return gulp
            .src('./src/images/*.**')
            .pipe(gulp.dest('./dist/images/'))
    }
    // 6. 转存 assets 文件
const assetsHandler = () => {
        return gulp
            .src('./src/assets/*/**')
            .pipe(gulp.dest('./dist/assets'))
    }
    // 7. 删除 dist 文件
const delHandler = () => {
        return del('./dist/')
    }
    // 8. 开启 服务器
const webHandler = () => {
        return gulp
            .src('./dist/')
            .pipe(webserver({ // 开启服务器
                host: 'www.daobao.com',
                port: 8080,
                open: './pages/a.html', // 默认打开哪一个文件夹，从 dist 目录开始向后写
                livereload: true, // 自动刷新
                proxies: [{
                        source: '/zhang',
                        target: 'http://localhost:80/test.php'
                    }
                    // {
                    //     source: '/zhang1',
                    //     target: 'http://localhost:80/test2.php'
                    // }
                ]
            }))
    }
    // 9. 开启监控任务
const watchHandler = () => {
    // 不需要 return
    // 实时开启监控，多个任务执行的时候，需要把这个任务放在最后执行
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/sass/*.scss', sassHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
}


// last 配置一个 默认任务
const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler, cssHandler, jsHandler, htmlHandler, imgHandler, assetsHandler),
    webHandler,
    watchHandler
)



//  把导出的任务放在最后执行
module.exports.sassHandler = sassHandler
module.exports.cssHandler = cssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imgHandler = imgHandler
module.exports.assetsHandler = assetsHandler
module.exports.delHandler = delHandler
    // 为什么一定要起名叫做 default
    // 因为你在命令行执行的时候, 如果书写 $ gulp default
    // 可以简写成 $ gulp
module.exports.default = defaultHandler