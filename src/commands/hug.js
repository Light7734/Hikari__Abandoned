const { MessageEmbed } = require("discord.js");

const Reply = require('../reply.js');
const ColorScheme = require('../ColorScheme.json');

const urls = [
	"https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif",
	"https://media.tenor.com/images/8f44c083c55620c02f59c6bea378dca4/tenor.gif",
	"https://media.tenor.com/images/15c39a7d6b03267941a87b24483ab696/tenor.gif",
	"https://media.tenor.com/images/49ba5d02d945bd7752b646a704df93b7/tenor.gif",
	"https://media.tenor.com/images/49ba5d02d945bd7752b646a704df93b7/tenor.gif",
	"https://media.tenor.com/images/8bf44194ffd76a08acf5a1cf1e7ac0a0/tenor.gif",
	"https://media.tenor.com/images/eed8d1a51f647b4be696879a0ad6f1f1/tenor.gif",
	"https://media.tenor.com/images/643f02b9f574057e546b4555c1783900/tenor.gif",
	"https://media.tenor.com/images/cee298437607d7b123bc9664c9ce844b/tenor.gif",
	"https://media.tenor.com/images/8af10396744e87b9f3f87d6e1e3a2617/tenor.gif"
];

const faces = [
	'(✿◠‿◠)', '≧◡≦', '(▰˘◡˘▰)', '(●´ω｀●)', '(ﾉ◕ヮ◕)ﾉ', '(づ｡◕‿‿◕｡)づ', '◎[▪‿▪]◎',
	';3', 'AwA', '^_^', 'uwu', ':>', 'c:'
]

module.exports.call = (client, args, interaction) => {

	const hugger = interaction.member.user.username;
	const hugged = client.users.cache.get(args['target']);
	console.log('clientUser: ', client.users.cache.get(args['target']).username);

	const responses = [
		`**${hugger}** gives **${hugged}** a warm hug`,
		`**${hugger}**: nuuuu, I'll hug you **${hugged}**`,
		`**${hugged}** just got hugged very tightly by **${hugger}**`,
		`**${hugger}** hugs the hell outta **${hugged}**`,
	]

	const title = responses[Math.floor(Math.random() * responses.length)]

	const embed = new MessageEmbed()
		.addField(faces[Math.floor(Math.random() * faces.length)], title)
		.setColor(ColorScheme.hug)
		.setImage(urls[Math.floor(Math.random() * urls.length)]);

	Reply.editIResponse(interaction, embed);
};