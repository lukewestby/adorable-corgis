module.exports = function (grunt) {
	grunt.initConfig({

		connect: {
			server: {

			}
		},

		watch: {
			sass: {
				files: ['scss/*.scss'],
				tasks: ['sass']
			},
			handlebars: {
				files: ['js/*.hbs'],
				tasks: ['handlebars']
			},
			requirejs: {
				files: ['js/*.js'],
				tasks: ['requirejs']
			}
		},

		handlebars: {
			compile: {
				options: {
					amd: true,
					processName: function (filename) {
						return filename.replace('js/', '').replace('.hbs', '');
					}
				},
				files: {
					'js/templates.js': 'js/*.hbs'
				}
			}
		},

		copy: {
			fonts: {
				files: [
					{ expand: true, src: ['bower_components/ionicons/fonts/*'], dest: 'dist/fonts/', flatten: true }
				]
			},
			requirejs: {
				files: [
					{ expand: true, src: ['bower_components/requirejs/require.js'], dest: 'dist/js/', flatten: true }
				]
			}
		},

		sass: {
			compile: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/css/app.css': 'scss/app.scss'
				}
			}
		},

		requirejs: {
			compile: {
				options: {
                    baseUrl: 'js/',
                    mainConfigFile: 'js/config.main.js',
                    name: 'config.main',
                    out: 'dist/js/app.js'
                }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('build', ['sass', 'handlebars', 'requirejs', 'copy'])
	grunt.registerTask('default', ['connect', 'watch'])
};