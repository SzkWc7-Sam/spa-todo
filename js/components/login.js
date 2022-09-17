import service from '../service.js';
import router from '../router.js';
import store from '../store.js';
import util from '../util.js';

export default {

	getTitle: function() {
		return "Login";
	},

	render: function() {
		const $view = $($('#tpl-login').html());

		$('[data-action=login]', $view).click(e => {
			e.preventDefault();
			processLogin($view);
		});

		$('[data-action=register]', $view).click(e => {
			e.preventDefault();
			processRegister($view);
		})

		return $view;
	}
}


function processLogin($view) {
	const user = getFormData();
	service.getTodos(user)
		.then(todos => initAfterLogin(user, todos))
		.catch(jqXHR => {
			const msg =  jqXHR.status === 401
				? "Wrong username or password, please try again!"
				: "Ups, something failed!"
			$('[data-field=error]', $view).html(msg);
		});
}

function processRegister($view) {
	const user = getFormData();
	service.registerUser(user)
		.then(data => initAfterLogin(user, []))
		.catch(jqXHR => {
			let msg;
			switch(jqXHR.status) {
				case 400: msg = "The provided user data is invalid!"; break;
				case 409: msg = "Please choose another username!"; break;
				default: msg = "Ups, something failed!";
			}

			$('[data-field=error]', $view).html(msg);
		});
}

function initAfterLogin(user, todos) {
	store.setUser(user);
	store.setTodos(todos);
	util.showAuthContent(true);
	util.updateViewField('user.name', user.name);
	router.navigate('/todos');
}


function getFormData() {
	const form = document.forms[0];
	return {
		name: form.username.value,
		password: form.password.value
	};
}
