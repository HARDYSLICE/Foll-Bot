const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;

  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`\nServers: ${client.guilds.cache.size} \nUsers: ${client.users.cache.size} \nChannels: ${client.channels.cache.size}`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["status"],
  permLevel: 0
};

exports.help = {
  name: "stats",
  description: "",
  usage: "stats"
};