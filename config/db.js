const mongoose = require("mongoose");
require("dotenv").config();

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
		console.log("MongoDB connected");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
