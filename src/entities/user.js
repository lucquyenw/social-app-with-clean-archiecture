module.exports = {
	user(username, password, profile) {
		return {
			getUsername: () => username,
			getPassword: () => password,
			getProfile: () => profile,
		};
	},
};
