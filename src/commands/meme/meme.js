const Discord = require('discord.js');
const random_meme = require("./random_meme")

module.exports = {
	validate(client, message) {
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			throw new Error('no_permission');
		}
    },
    /**
	 * @param  {Discord.Client} client
	 * @param  {Discord.Message} message
	 * @param  {} args
	 */
	run: async (client, message, args) => {
        random_meme.getRandomMeme()
        .then(data=>{
            const meme_embed = new Discord.MessageEmbed()
			.setTitle('Hm, que tal um meme?')
			.setDescription(data.text)
            .setColor('#8146DC')
            .setImage(data.url)
			.setFooter(
				`${(data.source).toLocaleUpperCase()} - ${data.author.screen_name}`,
				'https://i.imgur.com/PAYbEgv.png'
            )
            .setTimestamp();
            
            return message.channel.send(meme_embed);
        })
        .catch(error=>{
            console.log(error)
            return message.channel.send("Alguma coisa deu errado...");
		})
		
	},

	get command() {
		return {
			name: 'meme',
			description: 'Usuário irá receber um meme.',
			usage: 'meme',
		};
	},
};