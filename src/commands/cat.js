const { MessageEmbed } = require("discord.js");

const Axios = require("axios").default;
const Reply = require('../reply.js');
const ColorScheme = require('../ColorScheme.json');

module.exports.call = (client, args, interaction) => {
	Axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
		const embed = new MessageEmbed()
			.setImage(res.data[0].url)
			.setColor(ColorScheme.normal);
			
		Reply.editIResponse(interaction, embed);
	})
}