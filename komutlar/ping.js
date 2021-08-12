const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;

  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`🏓 ${client.ws.ping}ms.`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "",
  usage: "ping"
};