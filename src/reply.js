require('discord.js');

module.exports = async (interaction, response) => {
    let data = {
        content: response
    }

    // embed
    if(typeof response === 'object'){
        data = await createAPIMessage(interaction, response)
    }

  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data,
      },
    },);
};