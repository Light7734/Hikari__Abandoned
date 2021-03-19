const { MessageEmbed } = require("discord.js");

const Axios = require("axios").default;
const Reply = require('../reply.js');
const ColorScheme = require('../ColorScheme.json');

module.exports.call = (client, args, interaction, colorScheme) => {

	var options = {
		method: 'GET',
		url: 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + args['word'],
	}

	args['word'] = args['word'][0].toUpperCase() + args['word'].slice(1).toLowerCase();

	Axios.request(options).then(results => {
		const meanings = results.data[0].meanings;
		const phonetic = results.data[0].phonetics[0];

		const embed = new MessageEmbed()
			.setTitle(args['word'][0].toUpperCase() + args['word'].slice(1) + ' definition')
			.setDescription('[' + phonetic.text + '](' + phonetic.audio + ')')
			.setColor('#4969ef')

		for (let i = 0; i < meanings.length; i++) {
			for (let j = 0; j < meanings[i].definitions.length; j++) {
				let field = `\n**Definition:\n**${meanings[i].definitions[j].definition}`;

				if (meanings[i].definitions[j].example)
					field += `\n\n**Example:\n**${meanings[i].definitions[j].example}`;

				let synonyms;
				if (meanings[i].definitions[j].synonyms) {
					synonyms = '\n\n**Synonyms:\n**';
					for (let k = 0; k < meanings[i].definitions[j].synonyms.length; k++) {
						synonyms += meanings[i].definitions[j].synonyms[k];
						synonyms += k === meanings[i].definitions[j].synonyms.length - 1 ? '' : ', ';
					}
					field += synonyms;
				}

				if (i === 0 && j === 0)
					embed.addField('╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n' + meanings[i].partOfSpeech.toUpperCase(), field);
				else
					embed.addField('╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n\n╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n' + meanings[i].partOfSpeech.toUpperCase(), field);
			}
		}
		embed.addField('╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯', '.');

		Reply.editIResponse(interaction, embed);
	})
}