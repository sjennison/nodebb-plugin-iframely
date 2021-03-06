'use strict';
/* globals $, app, socket */

define('admin/plugins/iframely', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('iframely', $('.iframely-settings'), function() {

			function tagifyInput(selector) {
				var input = $(selector).tagsinput({
					confirmKeys: [13, 44],
					trimValue: true
				});
				$(input[0]['$input']).addClass('form-control').parent().css('display', 'block');

			}

			tagifyInput('#blacklist');
			tagifyInput('#expandDomains');
			tagifyInput('#collapseDomains');
		});

		$('#save').on('click', function() {
			Settings.save('iframely', $('.iframely-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'iframely-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});