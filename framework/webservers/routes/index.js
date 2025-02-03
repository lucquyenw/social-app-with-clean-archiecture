const { userRouter } = require('./user');

module.exports = {
	routes(app, express, redisClient) {
		app.use('/api/v1/users', userRouter(express));
	},
};
