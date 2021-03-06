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
			let text = args.join(" ").slice(0,218)
			text = text.replace(/\n/gi, ' ')
			if(args.length <= 0 ){
				text = await (await message.channel.messages.fetch({ limit: 2 })).last()["content"]
			}
	
			if(text == ""){
				return message.channel.send(
					Utils.createSimpleEmbed("❌ Erro ao digitar comando:", `Use  **${process.env.COMMAND_PREFIX}monarktweet <frase que você quiser>** ou somente **${process.env.COMMAND_PREFIX}monarktweet** que eu pego a ultima mensagem mandada! 🤗`, client.user.username, client.user.avatarURL())
				);
			}
	
			message.channel.startTyping()
			var img_code = 3;
			if(text.length <= 74) img_code=1;
			if(text.length > 74 && text.length <= 151) img_code=2;
	
			ImageProcessor(text, img_code)
			.then((image)=>{
				const embed = new Discord.MessageEmbed()
				.setColor('#9d65c9')
				.setTitle("O que o presidente tweetou?")
				.setAuthor("Bolaro")
				.setDescription(`Mensagem de: ${message.author.username}\n\n*Esta imagem não é verdadeira.*`)
				.attachFiles(image)
				.setImage("attachment://image.png")
				message.channel.stopTyping()
				resolve(message.channel.send(embed))
			})
			.catch((err)=>{
				message.channel.stopTyping()
				reject(err)
			})
		})
	},

	get command() {
		return {
			name: 'bolsonarotweet',
			aliases: [
				"bolsonarotwt",
				"bolsotwt"
			]
		};
	},
};