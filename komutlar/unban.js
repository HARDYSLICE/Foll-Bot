const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  if (message.author.id !== "549270535490502656" && message.author.id !== "738375105876590632") return message.channel.send("Error: You are not my owner.")
  
  var x = args[0]
  
  db.delete(`ban_${x}`)
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("User has been unbanned successfully.")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban"],
  permLevel: 0
};

exports.help = {
  name: "unban",
  description: "",
  usage: "unban"
};