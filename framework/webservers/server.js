const { createTerminus } = require('@godaddy/terminus');

module.exports = {
	serverConfig(app, mongoose, serverInit, config) {
		function healthCheck() {
			if (
				mongoose.connection.readyState === 0 ||
				mongoose.connection.readyState === 3
			) {
				return Promise.reject(new Error('Mongoose has disconnected'));
			}

			if (mongoose.connection.readyState === 2) {
				return Promise.reject(new Error('Mongoose is connecting'));
			}

			return Promise.resolve();
		}

		function onSignal() {
			console.log(`server is starting cleanup`);
			return new Promise((resolve, reject) => {
				mongoose
					.disconnect(false)
					.then(() => {
						console.info('Mongoose has disconnected');
						resolve();
					})
					.catch(reject);
			});
		}

		function beforeShutdown() {
			return new Promise((resolve) => {
				setTimeout(resolve, 15000);
			});
		}

		function onShutdown() {
			console.log('cleanup finished, server is shutting down');
		}

		function startServer() {
			createTerminus(serverInit, {
				logger: console.log,
				signal: 'SIGINT',
				healthChecks: {
					'/healthCheck': healthCheck,
				},
				onSignal,
				onShutdown,
				beforeShutdown,
			}).listen(config.port, config.ip, () => {
				console.log(
					'Express server listening on %d, in %s mode',
					config.port,
					app.get('env')
				);
			});
		}

		return {
			startServer,
		};
	},
};
