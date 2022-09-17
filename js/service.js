
const BASE_URL = '/api/';

export default {
	registerUser: function(user) {
		return $.ajax({
			url: BASE_URL + 'users',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(user)
		});
	},

	getTodos: function(user) {
		return $.ajax({
			url: BASE_URL + 'todos',
			type: 'GET',
			headers: {
				'Authorization': getAuthHeader(user),
				'Accept': 'application/json'
			}
		});
	},

	postTodo: function(user, todo) {
		return $.ajax({
			url: BASE_URL + 'todos',
			type: 'POST',
			headers: {
				'Authorization': getAuthHeader(user),
				'Accept': 'application/json'
			},
			data: JSON.stringify(todo),
			contentType: 'application/json'
		})
	},

	putTodo: function(user, todo) {
		return $.ajax({
			url: BASE_URL + 'todos/' + todo.id,
			type: 'PUT',
			headers: {
				'Authorization': getAuthHeader(user),
				'Accept': 'application/json'
			},
			data: JSON.stringify(todo),
			contentType: 'application/json'
		})
	}

}


function getAuthHeader(user) {
	return 'Basic ' + btoa(user.name+':'+user.password);
}
