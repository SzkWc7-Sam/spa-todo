import router from '../router.js';
import service from '../service.js';
import store from '../store.js';

export default {
	requiresAuth: true,

	getTitle: function() {
		return "Add Todo";
	},

	render: function() {
		const $view = $($('#tpl-add-todo').html());

		$('[data-action=cancel]', $view).click(e => {
			e.preventDefault();
			router.navigate('/todos');
		});

		$('[data-action=add]', $view).click(e => {
			e.preventDefault();
			service.postTodo(store.getUser(), getFormData())
				.then(todo => {
					store.addTodo(todo);
					router.navigate('/todos')
				})
				.catch(jqXHR => {
					$('[data-field=error]', $view).html("Adding todo failed!");
					console.log(jqXHR);
				});
		});

		return $view;
	}
}


function getFormData() {
	const form = document.forms[0];
	return {
		title: form.title.value,
		category: form.category.value,
		dueDate: form.date.value,
		important: true,
		completed: false
	};

}
