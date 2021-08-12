const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
 let days = Math.floor(client.uptime / 86400000);
 let hours = Math.floor(client.uptime / 3600000) % 24;
 let minutes = Math.floor(client.uptime / 60000) % 60;
 let seconds = Math.floor(client.uptime / 1000) % 60; 

  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`**Uptime:**\n\`\`\`fix\n${days}d ${hours}h ${minutes}m ${seconds}s\n\`\`\``)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["up", "online"],
  permLevel: 0
};

exports.help = {
  name: "uptime",
  description: "",
  usage: "uptime"
};