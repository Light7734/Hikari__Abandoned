module.exports.call = (client, args, interaction) => {
	return new Promise((resolve, reject) => {
		const axios = require("axios");

		axios
			.get("https://api.thecatapi.com/v1/images/search")
			.then((res) => {
				return resolve(res.data[0].url);
			})
			.catch((err) => {
				console.log("ERR:", err);
				return reject(err);
			});
	});
}