module.exports = function userRepository(repository) {
	return {
		findByProperty: (params) => repository.findByProperty(params),
		add: (user) => repository.add(user),
	};
};
