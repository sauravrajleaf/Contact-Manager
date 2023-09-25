const mongoose = require('mongoose');
// const config = require('config');

require('dotenv').config({ path: '../.env' });

// console.log(db);
console.log(process.env.mongoURI);
//MONGOOSE RETURNS PROMISES
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected');
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
