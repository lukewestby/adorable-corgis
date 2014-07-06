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
				files: ['js/*.handlebars'],
				tasks: ['handlebars']
			}
		},

		handlebars: {
			compile: {
				options: {
					amd: true,
					processName: function (filename) {
						return filename.replace('js/', '').replace('.handlebars', '');
					}
				},
				files: {
					'js/templates.js': 'js/*.handlebars'
				}
			}
		},

		sass: {
			compile: {
				options: {
					style: 'compressed'
				},
				files: {
					'app.css': 'scss/app.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['connect', 'watch'])
};