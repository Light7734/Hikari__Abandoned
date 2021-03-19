/*

.then(async (resolve, reject) => {
		message = await Reply.fetchMessage(client, resolve.data);

		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === interaction.member.user.id;
		};

		Reply.addReactions(message, ['👍', '👎']);

		message.awaitReactions(filter, { max: 1, time: 5000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					message.reply('you reacted with a thumbs up.');
				} else {
					message.reply('you reacted with a thumbs down.');
				}
			})
			.catch(collected => {
				message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
			});
	})



	//return resolve(`**${interaction.member.user.username}** gives **${client.users.cache.get(args["target"])}** a warm hug ^^` + "\n" + selectedURl
    

*/