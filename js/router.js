import store from './store.js';

const $main = $('main');

const routes = {};

export default {

	register: function(path, component) {
		routes[path] = component;
	},

	navigate: function(path) {
		if (location.hash !== '#' + path) {
			location.hash = path;
		} else {
			render();
		}
	}
}

function render() {
	const path = location.hash.replace('#', '');
	if (!routes[path]) {
		replaceView($('<h2>404 Not Found</h2><p>Sorry, page not found</p>'));
		return;
	}
	const component = routes[path];
	if (component.requiresAuth && !store.getUser()) {
		replaceView($('<h2>401 Unauthorized</h2><p>Please login first!</p>'));
		return;
	}
	const $view = component.render();
	replaceView($view);
	document.title = "Todo App - " + component.getTitle();
}

function replaceView($view) {
	$main.fadeOut(200, () => $main.empty().append($view).fadeIn(300));
}

$(window).on('hashchange', render);
