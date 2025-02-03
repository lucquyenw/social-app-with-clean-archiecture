const compression = require('compression');
const { default: helmet } = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = {
	expressConfig(app) {
		app.use(helmet());

		app.use(compression());
		app.use(bodyParser.json({ limit: '50mb' }));
		app.use(
			bodyParser.urlencoded({
				limit: '50mb',
				extended: true,
				parameterLimit: 50000,
			})
		);

		app.use((req, res, next) => {
			res.setHeader(
				'Access-Control-Allow-Methods',
				'GET, POST, OPTIONS, PUT, PATCH, DELETE'
			);

			res.setHeader(
				'Access-Control-Allow-Headers',
				'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
			);

			next();
		});

		app.use(morgan('combined'));
	},
};
