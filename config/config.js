require('dotenv').config();

module.exports = {
	port: process.env.PORT || 1234,
	ip: process.env.HOST || '0.0.0.0',
	mongo: {
		uri: process.env.MONGO_URL || 'mongodb://localhost:27017/social-app',
	},
	redis: {
		uri: process.env.REDIS_URL || 'redis://localhost:6379',
	},
	jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237',
};
