require("dotenv").config();

const { Client } = require("discord.js");
const DiscordJS = require('discord.js');
const client = new Client();
const PREFIX = "$";

const guildId = "780285744534519860";

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

const reply = async (interaction, response) => {
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

client.on("ready", async () => {
  console.log("Okay Master! - let's kill da hoe!!");
  const commands = await getApp(guildId).commands.get();

  await getApp(guildId).commands.post({
    data: {
      name: "ping",
      description: "A simple ping pong command",
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: "embed",
      description: "Displays an embed",
      options: [
        {
          name: "Name",
          description: "Your name",
          required: "true",
          type: 3, // string
        },
        {
          name: "Age",
          description: "Your age",
          required: false,
          type: 4, // integer
        },
      ],
    },
  });

  console.log(commands);

  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const { name, options } = interaction.data;
    const command = name.toLowerCase();
    const args = {};

    if (options) {
      for (const option of options) {
        const { name, value } = option;
        args[name] = value;
      }
    }

    console.log(args);
    console.log(command);

    if (command === "ping") {
      reply(interaction, "pong");
    }

    if(command === 'embed'){
        const embed = new DiscordJS.MessageEmbed().setTitle('example embed')
        for(const arg in args){
            const value = args[arg]
            embed.addField(arg, value);
        }
        reply(interaction, embed)
    }
  }); 
});

const createAPIMessage = async(interaction, content) => {
    const { data, files } = await DiscordJS.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    )
    .resolveData()
    .resolveFiles()
    
    return { ...data, files }
}

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX)) return;

  const [CMD_NAME, ...args] = message.content.trim().substring(1).split("/s+/");
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
