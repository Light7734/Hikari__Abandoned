const { MessageEmbed } = require("discord.js");

const Reply = require('../reply.js');
const ColorScheme = require('../ColorScheme.json');

module.exports.call = (client, args, interaction) => {
	const embed = new MessageEmbed().setTitle('🏓 pong!').setColor(ColorScheme.normal);
	Reply.editIResponse(interaction, embed);
};
