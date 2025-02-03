const { addUser } = require('../../application/use_cases/user/user.service');

class UserController {
	constructor(
		userDbRepository,
		userDbRepositoryImpl,
		authServiceInterface,
		authServiceImpl
	) {
		this.dbRepository = userDbRepository(new userDbRepositoryImpl());
		this.authService = authServiceInterface(authServiceImpl);
	}

	addNewUser = async (req, res, next) => {
		const { username, password, profile } = req.body;
		return res.status(200).json({
			message: 'create new user',
			metadata: await addUser(
				{ username, password, profile },
				this.dbRepository,
				this.authService
			),
		});
	};
}

module.exports = UserController;
