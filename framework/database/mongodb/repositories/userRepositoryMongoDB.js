const userModel = require('../models/user');

function omit(obj, ...props) {
	const result = { ...obj };
	props.forEach((prop) => delete result[prop]);
	return result;
}

class UserRepositoryMongoDB {
	findByProperty = (params) =>
		userModel
			.find(omit(params, 'page', 'perPage'))
			.skip(params.perPage * params.page - params.perPage || 0)
			.limit(params.perPage);

	add = (userEntity) => {
		const newUser = new userModel({
			username: userEntity.getUsername(),
			password: userEntity.getPassword(),
			profile: userEntity.getProfile(),
		});

		return newUser.save();
	};
}

module.exports = UserRepositoryMongoDB;
