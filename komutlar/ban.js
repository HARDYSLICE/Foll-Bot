const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  if (message.author.id !== "549270535490502656" && message.author.id !== "738375105876590632") return message.channel.send("Error: You are not my owner.")
  
  if (!args[0]) return message.channel.send("Please enter a id.")
  
  var x = args[0]
  
  db.delete(`profile_${message.guild.id}_${args[0]}`)
  db.delete(`profile_${message.guild.id}_${args[0]}_name`)
  db.delete(`profile_${message.guild.id}_${args[0]}_username`)
  db.delete(`profile_${message.guild.id}_${args[0]}_id`)
  db.delete(`profile_${message.guild.id}_${args[0]}_followers`)
  db.delete(`profile_${message.guild.id}_${args[0]}_following`)
  db.delete(`profile_${message.guild.id}_${args[0]}_posts`)
  db.delete(`profile_${message.guild.id}_${args[0]}_bio`)
  db.set(`ban_${x}`, "yes")
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("User has been banned successfully.")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban"],
  permLevel: 0
};

exports.help = {
  name: "ban",
  description: "",
  usage: "ban"
};
