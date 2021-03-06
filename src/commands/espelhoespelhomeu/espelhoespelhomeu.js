const Discord = require('discord.js');
const Utils = require("./../../utils/utils")
const fs = require("fs")

const ImageProcessor = require("./ImageProcessor")



module.exports = {
	validate(client, message) {
		return true;
	},
	/**
	 * @param  {Discord.Client} client
	 * @param  {Discord.Message} message
	 * @param  {Array} args
	 */
	run: (client, message, args) => {
		return new Promise(async(resolve, reject)=>{
			const metioned_user = message.mentions.users.entries().next()

			let user = message.author
			if(metioned_user.value) user=metioned_user.value[1];

			message.channel.startTyping()
			ImageProcessor(user.avatarURL({format:"png"}), user.username)
			.then((image)=>{
				const embed = new Discord.MessageEmbed()
				.setColor('#9d65c9')
				.setTitle("Espelho, espelho meu: existe alguém mais bela do que eu?")
				.setAuthor("Espelho")
				.setDescription(`O que será que disse o espelho sobre ${user}?\n\n*Mensagem de: ${message.author}*`)
				.attachFiles(image)
				.setImage("attachment://image.png")
				message.channel.stopTyping()
				resolve(message.channel.send(embed))
			})
			.catch((err)=>{
				message.channel.stopTyping()
				return reject(err)
			})
		})
	},

	get command() {
		return {
			name: 'espelhoespelhomeu',
			aliases: [
				"espelho",
				"espelhomeu"
			]
		};
	},
};