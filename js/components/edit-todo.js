import service from '../service.js';
import router from '../router.js';
import store from '../store.js';
import util from '../util.js';

export default {
	requiresAuth: true,

	getTitle: function() {
		return "Edit Todo";
	},

	render: function(id) {

		if (!id) {
			return $(`<p class="message danger">Invalid parameter! Expecting todo id.</p>`);
		}

		const todo = store.getTodo(id);
		if (!todo) {
			return $(`<p class="message danger">Invalid parameter! ${id} is not a valid todo id!</p>`);
		}

		const $view = $($('#tpl-edit-todo').html());

		$('[name=title]', $view).val(todo.title);
		$('[name=category]', $view).val(todo.category);
		$('[name=date]', $view).val(todo.dueDate);

		$('[data-action=cancel]', $view).click(e => {
			e.preventDefault();
			router.navigate('/todos');
		});

		$('[data-action=save]', $view).click(e => {
			e.preventDefault();
			const updatedTodo = {...todo, ...getFormData()};
			service.putTodo(store.getUser(), updatedTodo)
				.then(data => {
					store.removeTodo(id);
					store.addTodo(updatedTodo);
					router.navigate('/todos');
				})
				.catch(jqXHR => util.updateViewField('error', 'Updating todo failed!'))
		});

		return $view;
	}
}


function getFormData() {
	const form = document.forms[0];
	return {
		title: form.title.value,
		category: form.category.value,
		dueDate: form.date.value
	};
}
