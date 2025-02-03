const { user } = require('../../../src/entities/user');

class UserService {
	static async addUser(
		{ username, password, profile },
		userRepository,
		authService
	) {
		if (!username || !password) {
			throw new Error('username, password field cannot be empty');
		}

		const newUser = user(
			username,
			authService.encryptPassword(password),
			profile
		);

		let existedUser = await userRepository.findByProperty({ username });
		if (existedUser.length) {
			throw new Error(`User with username: ${username} already existed`);
		}

		return await userRepository.add(newUser);
	}
}

module.exports = UserService;
