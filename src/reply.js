require("dotenv").config();

const DiscordJS = require("discord.js");
const Axios = require("axios").default;
const ColorScheme = require('./ColorScheme.json');

const config = { headers: { "Authorization": "Bot " + process.env.DISCORDJS_BOT_TOKEN } }

module.exports.IResponse = (interaction) => {
	const embed = new DiscordJS.MessageEmbed().setTitle(`Proccessing...`).setColor(ColorScheme.normal);
	const json = {
		"type": 4,
		"data": { "embeds": [embed] }
	}

	return Axios.post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`, json, config);
};

module.exports.failIResponse = (interaction, err) => {
	const embed = new DiscordJS.MessageEmbed().setTitle(`Failed`).setColor(ColorScheme.error).addField('Reason:', err);
	const json = { "embeds": [embed] }

	return Axios.patch(`https://discord.com/api/v8/webhooks/700362246085410879/${interaction.token}/messages/@original`, json, config);
};

module.exports.editIResponse = (interaction, embed) => {
	const json = { "embeds": [embed] }
	return Axios.patch(`https://discord.com/api/v8/webhooks/700362246085410879/${interaction.token}/messages/@original`, json, config);
};

module.exports.fetchMessage = async (client, data) => {
	console.log('FETCH MESSAGE1');
	const channel = await client.channels.fetch(data.channel_id);
	const message = await channel.messages.fetch(data.id);
	return message;
};

module.exports.addReactions = (message, reactions) => {
	for (const reaction of reactions) {
		message.react(reaction)
	}
};