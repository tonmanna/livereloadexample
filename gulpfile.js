const { src, dest, series, task, watch, parallel } = require("gulp");
const babel = require("gulp-babel");
var ts = require("gulp-typescript");
const livereload = require("gulp-livereload");
var tsProject = ts.createProject("tsconfig.json");

function watchTask() {
  livereload.listen(
    {
      port: 3900,
      src: "./dist",
    },
    (err) => {}
  );
  livereload.onChange = (result) => {
    console.log("result: ", result);
  };

  return watch(
    ["src/**/*.ts", "*.html"],
    series(typeScriptCompile, genHtml)
  ).on("change", async function (url) {
    //TODO : CURL For generator specific page
    setTimeout(() => {
      src(["./dist/*"]).pipe(livereload());
    }, 3000);
  });
}

function typeScriptCompile() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest("./dist"));
}

function genHtml() {
  return src(["*.html"]).pipe(dest("./dist"));
}

exports.default = parallel([typeScriptCompile, genHtml, watchTask]);
