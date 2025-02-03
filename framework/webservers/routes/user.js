const UserController = require('../../../adapters/controllers/user.controller');
const userRepositoryMongoDB = require('../../database/mongodb/repositories/userRepositoryMongoDB');
const userDbRepository = require('../../../application/respositories/user/user.repository');
const authService = require('../../../application/services/auth.service');
const authServiceImp = require('../../services/auth.service');

module.exports = {
	userRouter: (express) => {
		const router = express.Router();

		const controller = new UserController(
			userDbRepository,
			userRepositoryMongoDB,
			authService,
			authServiceImp
		);

		router.post('/', controller.addNewUser);

		return router;
	},
};
