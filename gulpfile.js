const gulp = require("gulp"),
      scss = require("gulp-sass"),
      del  = require("del"),
      pug = require("gulp-pug"),
      fileInclude = require("gulp-file-include"),
      browserSync = require("browser-sync").create();

let path = {
    build: {
        style: "build/style/",
        js: "build/js/",
        img: "build/img/",
        fonts: "build/fonts/",
        views: "build/"
    },

    watch: {
        style: "src/style/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*",
        views: "src/views/**/*.pug"
    },

    src: {
        style: "src/style/*.scss",
        js: "src/js/**/app.js",
        img: "src/img/*.*",
        fonts: "src/fonts/**/*.*",
        views: "src/views/index.pug"
    },

    del: "build/**/*"
};

// TASKS

// ***** BUILD *****

// build views 
gulp.task('build:views', () => {
  return gulp.src(path.src.views)
    .pipe(pug())
    .pipe(gulp.dest(path.build.views));
});

// build style
gulp.task("build:style", () => {
    gulp.src(path.src.style)
        .pipe(scss().on("error", scss.logError))
        //add autoprefixer
        //add minify
        .pipe(gulp.dest(path.build.style));
});


// build js
gulp.task("build:js", () => {
    gulp.src(path.src.js)
        // uglify
        .pipe(fileInclude("@@"))
        .pipe(gulp.dest(path.build.js));
});

// copy images from src to build
gulp.task("build:img", () => {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

// copy fonts from src to build
gulp.task("build:fonts", ()=> {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task("build", () => {
    gulp.start("build:views");
    gulp.start("build:style");
    gulp.start("build:js");
    gulp.start("build:img");
    gulp.start("build:fonts");
});

// ***** WATCH HANDLERS *****

gulp.task("watch:style", ["build:style"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("watch:js", ["build:js"], (done) => {
    browserSync.reload();
    done(); 
});

gulp.task("watch:img", ["build:img"], (done) => {
    browserSync.reload();
    done();    
});

gulp.task("watch:fonts", ["build:fonts"], (done) => {
    browserSync.reload();
    done();    
});

gulp.task("watch:views", ["build:views"], (done) => {
    done();    
});

// ***** SPECIAL *****

// удалить содержимое папки для сборки
gulp.task("del", () => {
    return del([path.del]);
});

// удалить и собрать проект
gulp.task("delAndBuild", ["del"], () => {
    gulp.start("build");
});

// run server and watch
gulp.task("serve", (done) => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    // enable watch
    gulp.watch(path.watch.style, ["watch:style"]);
    gulp.watch(path.watch.js, ["watch:js"]);
    gulp.watch(path.watch.img, ["watch:img"]);
    gulp.watch(path.watch.fonts, ["watch:fonts"]);
    gulp.watch(path.watch.views, ["watch:views"]);

    done();
});

// ***** DEFAULT *****

gulp.task("default", ["delAndBuild"], () => {
    gulp.start("serve");
});