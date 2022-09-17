import store from '../store.js';

const TEMPLATE =
	`<div>
		<h2>My Todos</h2>
		<ul></ul>
		<p><a href="#/add-todo">&raquo; Add Todo</a></p>
	</div>`;


export default {
	requiresAuth: true,

	getTitle: function() {
		return "Todos";
	},

	render: function() {
		const $view = $(TEMPLATE);

		store.getTodos().forEach(todo =>
			$('ul', $view).append(`<li>${todo.id} <b>${todo.title}</b> ${todo.dueDate} <a href="#/edit-todo/${todo.id}">Edit</a></li>`))

		return $view;
	}

}

