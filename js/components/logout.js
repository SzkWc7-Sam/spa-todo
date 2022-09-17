import store from '../store.js';
import util from '../util.js';

export default {
	requiresAuth: true,

	getTitle: function() {
		return "Logout";
	},

	render: function() {
		store.clear();
		util.showAuthContent(false);
		return $($('#tpl-logout').html());
	}
}
