require("dotenv").config();

const DiscordJS = require("discord.js");
const Axios = require("axios").default;

var options = {
	method: "GET",
	url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
	params: { term: "wat" },
	headers: {
		"x-rapidapi-key": process.env.URBAN_API_KEY,
		"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
	},
};

module.exports.call = (client, args, interaction) => {
	return new Promise((resolve, reject) => {
		options.params.term = args["term"];
		Axios.request(options)
			.then(function (response) {
				const embed = new DiscordJS.MessageEmbed()
					.setTitle("Urban dictionary")
					.setColor("#144fe6")
					.setURL("https://www.urbandictionary.com/")
					.setThumbnail("https://i.imgur.com/ZZBjSh6.png");

				let count = args["count"] ? args["count"] : 3;
				if (count > response.data.list.length)
					count = response.data.list.length;
				else if (count > 8) count = 8;

				if (count === 0) {
					embed.addField(
						"Failed",
						"Failed to find any definition for your term"
					);
					embed.setColor("#ff0000");
				} else {
					for (let i = 0; i < count; i++) {
						embed.addField(
							`${response.data.list[i].author}(${response.data.list[i].permalink}):`,
							response.data.list[i].definition
						);
					}
				}
				return resolve(embed);
			})
			.catch(function (error) {
				return reject(error);
			});
	});
};
