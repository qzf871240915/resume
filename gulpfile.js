/*本文件带有版本监管*/

/*npm init*/
/*定义我们的开发环境为src目录项目的生产环境为www目录*/


var gulp =require("gulp");
var webserver=require("gulp-webserver");
var url=require("url");
//fs filesystem
var fs=require("fs");
//sass模块
var sass=require("gulp-sass")

//压缩css
var minifyCSS =require('gulp-minify-css')
//丑化操作
var uglify =require('gulp-uglify')

//模块化打包工具
var webpack=require('gulp-webpack')
//命名模块
var named =require("vinyl-named")


//版本模块
var rev = require('gulp-rev')
//版本控制模块
var revCollector =require('gulp-rev-collector')



//监控模块
var watch  =require('gulp-watch')
//队列模块
var sequence =require('gulp-watch-sequence')


//亚索html
var minifyHTML=require('gulp-minify-html')

//将sass进行转换

gulp.task("sass",function(){
      return gulp.src(["src/styles/**/*.scss"])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest("www/css"))
})

gulp.task("images",function(){
      return gulp.src("./src/images/**").pipe(gulp.dest("www/images"))
})


gulp.task('webserver',['copy-index','sass'], function() {
  gulp.src('www')
    .pipe(webserver({
      port:8080,
      livereload: true,
      directoryListing: true,
      open: true,

      //实现我们的mock数据/
      /*原理*/
      /**
      用户在浏览器中输入url地址
      通过判断，获取url的地质参数queryList
      通过url的地质参数查找香型的接送文件
      读取queryList。并将这个文件内容写到（write）我们的浏览器上
      */
      middleware:function(req,res,next){
              var urlObj = url.parse(req.url,true),
              method=req.method; 
              switch(urlObj.pathname){
                  case '/api/skill':
                  //设置头信息
                  res.setHeader("Content-Type","application/json");
                  //都区本地的json文件，
                  fs.readFile("mock/skill.json","utf-8",function(err,data){
                        //
                        res.end(data);
                  });
                  return;
                  case '/api/my':
                  //设置头信息
                  res.setHeader("Content-Type","application/json");
                  //都区本地的json文件，
                  fs.readFile("mock/my.json","utf-8",function(err,data){
                        //
                        res.end(data);
                  });
                  return;
                  case '/api/instructs':
                  //设置头信息
                  res.setHeader("Content-Type","application/json");
                  //都区本地的json文件，
                  fs.readFile("mock/instructs.json","utf-8",function(err,data){
                        //
                        res.end(data);
                  });
                  return;
                  case '/api/project':
                  //设置头信息
                  res.setHeader("Content-Type","application/json");
                  //都区本地的json
                  fs.readFile("mock/project.json","utf-8",function(err,data){
                        res.end(data);
                  });
                  return;
                  case '/api/work':
                  //设置头信息
                  res.setHeader("Content-Type","application/json");
                  //都区本地的json渲染到浏览器上
                  fs.readFile("mock/work.json","utf-8",function(err,data){
                        //req 请求   res 回应 
                        res.end(data);
                  });
                  return;
                  default:;
              }
              next();//这行代码非常重要，执行的循环便利的工作
      }//end middleware


    }));
});

gulp.task("copy-index",function(){
      return gulp.src("./src/index.html").pipe(gulp.dest("./www/"))
})




//js模块化管理

var jsFiles=['src/scripts/index.js'];


//打包js
gulp.task('packjs',function(){
      return gulp.src(jsFiles)
      .pipe(named())
      .pipe(webpack())
      // .pipe(uglify())
      .pipe(gulp.dest('www/js'))
})



//版本控制  为了方便控制
var cssDistFiles=['www/css/index.css'];
var jsDistFiles=['www/js/index.js'];

//css的rev控制
gulp.task('verCss',function(){
      
      return gulp.src(cssDistFiles)
      //生成一个版本
      .pipe(rev())
      
      //复制到制定文件目录
      
      .pipe(gulp.dest('www/css'))
      //生成对应的映射关系
      
      .pipe(rev.manifest())
      //将映射文件输出到指定目录
      
      .pipe(gulp.dest('www/ver/css'))
})


gulp.task('verJs',function(){
      return gulp.src(jsDistFiles)
      //生成一个版本
      .pipe(rev())
      //复制到制定文件目录
      .pipe(gulp.dest('www/js'))
      //生成对应的映射关系
      .pipe(rev.manifest())
      //将映射文件输出到指定目录
      .pipe(gulp.dest('www/ver/js'))
})






gulp.task('html',function(){
      return gulp.src(['www/ver/**/*.json','www/*.html'])
      .pipe(revCollector({replaceReved:true}))
      .pipe(gulp.dest('www/'))
})

gulp.task('watch',function(){
      gulp.watch('./src/index.html',['copy-index']);
      var queue =sequence(300);
      watch('./src/scripts/**/*.js',{
            name:'JS',
            emitOnGlob:false
      },queue.getHandler('packjs','verJs','html'));


      watch('./src/styles/**/*.*',{
            name:'CSS',
            emitOnGlob:false
      },queue.getHandler('sass','verCss','html'))

})







gulp.task('default',['webserver','watch'])