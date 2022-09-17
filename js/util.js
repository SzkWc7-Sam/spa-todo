

export default {

	showAuthContent: function(visible) {
		if (visible) {
			$('[data-auth=true]').fadeIn(400);
			$('[data-auth=false]').fadeOut(400);
		} else {
			$('[data-auth=true]').fadeOut(400);
			$('[data-auth=false]').fadeIn(400);
		}
	},

	updateViewField: function(key, value, $context) {
		if ($context) {
			$('[data-field="' + key + '"]', $context).html(value);
		} else {
			$('[data-field="' + key + '"]').html(value);
		}
	},

	showFlashMessage: function(msg) {
		//...
	}
}
