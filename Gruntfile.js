module.exports = function(grunt){

    grunt.initConfig({

        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js']
        },

        csslint: {
            src: ['css/**/*.css']
        },

        compass: {
            build: {
                options: {
                    config: 'config.rb',
                    cssDir: '../webapp/css',
                    outputStyle: 'compressed',
                    lineComments: false
                }
            },
            development: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        clean: {
            options: { force: true },
            build: ["../webapp/components", "../webapp/css", "../webapp/img", "../webapp/js"]
        },

        uglify: {
            build: {
                src:  './bower_components/requirejs/require.js',
                dest: '../webapp/bower_components/requirejs/require.js'
            }
        },

        requirejs: {
            compile: {
                options: {
                    // main path
                    baseUrl: "./js",

                    mainConfigFile: "./js/require.config.js",

                    waitSeconds: 45,

                    optimizeAllPluginResources: true,

                    // optimize the main module (and its dependancies) only
                    name: "require.config",

                    optimize: "uglify",

                    // name of optimized file
                    out: "../webapp/js/finance.build.js"
                }
            }
        },

        copy: {
            build: {
                files: {
                    '../webapp/':                           ['./img/**',  './font/**', './*.html', './*.ico']
                }
            }
        },

        usemin: {
            html: ['../webapp/*.html']
        },

        useminPrepare: {
            html: '*.html',
            options: {
                dest: '../webapp/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');



    grunt.registerTask('default', 'jshint');
    grunt.registerTask('checkcss', 'csslint');
    grunt.registerTask('sass', 'compass:development');
    grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'compass:build', 'requirejs:compile', 'copy:build', 'useminPrepare', 'usemin']);
};