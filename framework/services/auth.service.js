const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../config/config');

module.exports = {
	encryptPassword: (password) => {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	},

	compare: (password, hashedPassword) =>
		bcrypt.compareSync(password, hashedPassword),

	verify: (token) => jwt.verify(token, config.jwtSecret),
	generateToken: (payload) =>
		jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }),
};
