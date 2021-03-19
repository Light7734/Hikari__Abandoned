require("dotenv").config();

const { Client } = require("discord.js");
const Axios = require("axios").default;
const Reply = require('./reply.js');

const client = new Client();

client.on("ready", async () => {

	console.log("Okey Mastar! - let's kill da hoe!!");

	client.ws.on("INTERACTION_CREATE", async (interaction) => {
		// initial response
		await Reply.IResponse(interaction);

		// sort out command name and args
		const commandName = interaction.data.name.toLowerCase();
		const args = {};

		if (interaction.data.options) {
			for (const option of interaction.data.options) {
				const { name, value } = option;
				args[name] = value;
			}
		}

		// require and call the command
		try {
			require('./commands/' + commandName + '.js').call(client, args, interaction);
		} catch (err) {
			console.log('ERR: ', err);
			Reply.failIResponse(interaction, err)
		}
	});
});

client.login(process.env.DISCORDJS_BOT_TOKEN);