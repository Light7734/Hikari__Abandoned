require("dotenv").config();

const axios = require("axios");
const DiscordJS = require("discord.js");

const client = new DiscordJS.Client();
const guildId = "622811140367581195";

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

const reply = async (interaction, response) => {
  let data = {
    content: response,
  };

  // embed
  if (typeof response === "object") {
    data = await createAPIMessage(interaction, response);
  }

  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data,
    },
  });
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
      name: "hug",
      description: "Hug someone ^^",
      options: [
        {
          name: "target",
          description: "whom to hug",
          required: true,
          type: 6,
        },
      ],
    },
  });

  await getApp(guildId).commands.post({
    data: {
      name: "cat",
      description: "displays a cat OwO",
    },
  });

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

    runCommand(command, args, interaction);
  });
});

const runCommand = async (command, args, interaction) => {
  require("./commands/" + command + ".js")
  .call(client, args, interaction)
    .then((response) => {
      reply(interaction, response);
    })
    .catch((err) => {
      reply(interaction, err);
    });
};

const createAPIMessage = async (interaction, content) => {
  const { data, files } = await DiscordJS.APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    content
  )
    .resolveData()
    .resolveFiles();

  return { ...data, files };
};

client.login(process.env.DISCORDJS_BOT_TOKEN);
