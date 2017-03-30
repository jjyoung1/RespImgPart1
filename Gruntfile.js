/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
 "grunt" alone creates a new, completed images directory
 "grunt clean" removes the images directory
 "grunt responsive_images" re-processes images without removing the old ones
 */

module.exports = function (grunt) {
   // var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        /*
                         Change these:
                         */
                        width: '800',
                        suffix: '_mr',
                        quality: '80'

                    }]
                },

                /*
                 You don't need to change this part if you don't change
                 the directory structure.
                 */
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'images_src/',
                    dest: 'images/'
                }]
            }
        },

        /* Clear out the images directory if it exists */
        clean: {
            dev: {
                src: ['images']
            }
        },

        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['images']
                }
            }
        },

        /* Copy the "fixed" images that don't go through processing into the images/directory */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: 'images_src/fixed/*.{gif,jpg,png}',
                    dest: 'images/'
                }]
            }
        },

        imagemin: {                          // Task
            options: {                       // Target options
                optimizationLevel: 3,
                svgoPlugins: [{ removeViewBox: false }],
     //           use: [mozjpeg()]
            },
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/'                  // Destination path prefix
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'img_compress']);
    grunt.registerTask('img_compress', ['imagemin']);
};
