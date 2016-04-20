module.exports = function( grunt ) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell : {
            clean_coder : {
                command : 'mkdir -p build/js; mkdir -p build/css; rm -rf build/js/*; rm -rf build/css/*;'
            },
        },

        preprocess: {
            coder: {
                src        : 'src/partials/index.html.tmpl',
                dest       : 'index.html',
                options    : {
                    context : { ts: "<%= now %>" }
                }
            },
        },

        concat: {
            coder    : { src: "<%= coder_js_list %>", dest:'build/js/coder_app_<%= now %>.js' },
            vendor_coder : {
                src: "<%= vendor_coder_js_list %>", dest:'build/js/vendor_libs_<%= now %>.js'
            },
            coder_css: {
                src: "<%= coder_css_list %>", dest: 'build/css/coder_app_<%= now %>.css'
            },
        },

        uglify: {
            options    : { mangle: true, compress: false },
            coder     : {
                options: { sourceMap: true, mangle: false, compress: false },
                src    : "<%= coder_js_list %>", // make this work for uglify to replace concat                       
                dest   : 'build/js/coder_app_<%= now %>.js'
            },
        },

        cssmin: {
            coder: {
                files: {
                    'build/css/coder_app_<%= now %>.css': "<%= coder_css_list %>"
                }
            },
        },

        coder_js_list: [
            "src/js/app.js",
            "src/js/modules.js",
            "src/js/services/user.js",
            "src/js/services/cookie.js",
            "src/js/services/browser.js",
            "src/js/controllers/home.js",
            "src/js/controllers/login.js",
            "src/js/controllers/register.js",
            "src/js/controllers/editor.js",
            "src/js/directives/header.js",
            "src/js/filters/editor.js",
        ],

        vendor_coder_js_list: [
            "node_modules/angular/angular.min.js",            
            "node_modules/angular-resource/angular-resource.min.js",
            "node_modules/angular-route/angular-route.min.js",
            "node_modules/angular-sanitize/angular-sanitize.min.js",
            "node_modules/angular-cookies/angular-cookies.min.js",
            "node_modules/angular-animate/angular-animate.min.js",
            "node_modules/angular-aria/angular-aria.min.js",
            "node_modules/angular-material/angular-material.min.js",
        ],

        coder_css_list: [
            "node_modules/angular-material/angular-material.min.css",
            "node_modules/angular-material/angular-material.layouts.min.css",
            "src/css/helper.css",
        ],

        now: (new Date()).getTime()
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-preprocess' );
    grunt.loadNpmTasks( 'grunt-shell' );

       grunt.registerTask( 'default', 'Build', function() {
        var hostname = require("os").hostname();
        if ( hostname.match( /www/ )) {
            grunt.log.writeln( 'Running PRODUCTION build on ' + hostname + ' ...' );
            grunt.task.run([
                'shell:clean_coder', 'preprocess',
                'uglify:coder', // 'concat:coder',
                'concat:vendor_coder', 'concat:coder_css',
            ]);
        } else {
            grunt.log.writeln( "Running development build on " + hostname + " ..." );
            grunt.task.run([
                'shell:clean_coder', 'preprocess',
                'uglify:coder', // 'concat:coder',
                'concat:vendor_coder', 'concat:coder_css',
            ]);
        }
    });

};

