module.exports = function authService(service) {
	return {
		encryptPassword: (password) => service.encryptPassword(password),
		compare: (password, hashedPassword) =>
			service.compare(password, hashedPassword),
		verify: (token) => service.verify(token),
		generateToken: (payload) => service.generateToken(payload),
	};
};
