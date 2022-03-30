const { src, dest, series, task, watch } = require("gulp");
const babel = require("gulp-babel");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

function watchTask() {
  console.log("ENTER0");
  return watch(["src/**/*.ts", "*.html"], series(typeScriptCompile, genHtml));
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

exports.default = series(typeScriptCompile, genHtml, watchTask);
