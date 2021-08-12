const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  //if (message.author.id !== ayarlar.sahip) return message.channel.send("I am on beta and you are not my owner. So you can not use this command.")
  
  if (message.author.id !== message.guild.owner.id) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`This command can only be used by the server owner.`)
    return message.channel.send(embed)
    
  }
  
  if (message.mentions.channels.size < 1) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.setchannel [CHANNEL MENTION]\``)
    return message.channel.send(embed)
    
  }
  
  db.set(`fallchannel_${message.guild.id}`, message.mentions.channels.first().id)
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`Channel has been succesfully changed to <#${message.mentions.channels.first().id}>`)
  return message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setchannel"],
  permLevel: 0
};

exports.help = {
  name: "setchannel",
  description: "",
  usage: "setchannel"
};