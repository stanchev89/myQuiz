
const env = process.env.NODE_ENV || "development";

const config = {
	development: {
		port: process.env.PORT || 3000,
		// dbURL: "mongodb://localhost:27017/quiz",
		dbURL:"mongodb+srv://stanchev89:stanchev89@cluster0.qyezc.gcp.mongodb.net/quizDB-dump?retryWrites=true&w=majority",
		origin: ["https://quiz-303120.web.app","http://localhost:4200","http://localhost:5555" ]
	},
	production: {
		port: process.env.PORT || 3000,
		dbURL: process.env.DB_URL_CREDENTIALS,
		origin: []
	}
};

module.exports = config[env];