module.exports.call = (client, args, interaction) => {
  return new Promise((resolve, reject) => {
    try {
      const hugURLList = [
        "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif",
        "https://media.tenor.com/images/8f44c083c55620c02f59c6bea378dca4/tenor.gif",
        "https://media.tenor.com/images/15c39a7d6b03267941a87b24483ab696/tenor.gif",
        "https://media.tenor.com/images/49ba5d02d945bd7752b646a704df93b7/tenor.gif",
        "https://media.tenor.com/images/49ba5d02d945bd7752b646a704df93b7/tenor.gif",
        "https://media.tenor.com/images/8bf44194ffd76a08acf5a1cf1e7ac0a0/tenor.gif",
        "https://media.tenor.com/images/eed8d1a51f647b4be696879a0ad6f1f1/tenor.gif",
        "https://media.tenor.com/images/643f02b9f574057e546b4555c1783900/tenor.gif",
        "https://media.tenor.com/images/cee298437607d7b123bc9664c9ce844b/tenor.gif",
      ];

      const selectedURl =
        hugURLList[Math.floor(Math.random() * hugURLList.length)];
      return resolve(`**${ interaction.member.user.username}** gives **${client.users.cache.get( args["target"] )}** a warm hug ^^` + "\n" + selectedURl
      );
    } catch (error) {
      console.log(error);
    }
  });
};
