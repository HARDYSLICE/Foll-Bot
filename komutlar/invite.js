const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("[Support Server](https://discord.gg/vGgKHjVr7P) ● [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=849592731226341387&permissions=3490577617&scope=bot)")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["invite"],
  permLevel: 0
};

exports.help = {
  name: "invite",
  description: "",
  usage: "invite"
};