module.exports = {
	connection: (mongoose, config, options) => {
		function connectToMongo() {
			mongoose
				.connect(config.mongo.uri, options)
				.then(
					() => {},
					(err) => {
						console.info('Mongodb error', err);
					}
				)
				.catch((err) => {
					console.log('ERROR:', err);
				});
		}

		mongoose.connection.on('connected', () => {
			console.info('connected to MongoDB');
		});

		mongoose.connection.on('reconnected', () => {
			console.info('MongoDB connected');
		});

		mongoose.connection.on('error', (error) => {
			console.error(`Error in MongoDB connection: ${error}`);
			mongoose.disconnect();
		});

		mongoose.connection.on('disconnected', () => {
			console.error(`MongoDB disconnected: Reconnecting...`);

			setTimeout(() => connectToMongo(), options.reconnectInterval);
		});

		return {
			connectToMongo,
		};
	},
};
