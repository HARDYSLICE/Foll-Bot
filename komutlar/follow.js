const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  if (!db.has(`fallchannel_${message.guild.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Channel is not set for **FOLL**.\nPlease contact the administrator.`)
    return message.channel.send(embed)
    
  }
  
  if (!db.has(`profile_${message.guild.id}_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You don't have a profile.\nPlease create a profile first with \`${ayarlar.prefix}createprofile\``)
    return message.channel.send(embed)
    
  }
  
  if (message.mentions.users.size < 1) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`${ayarlar.prefix}follow [MEMBER MENTION]\``)
    return message.channel.send(embed)
    
  }
  
  if (message.mentions.users.first().id == message.author.id) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`${ayarlar.prefix}follow [MEMBER MENTION]\``)
    return message.channel.send(embed)
    
  }
  
  if (!db.has(`profile_${message.guild.id}_${message.mentions.users.first().id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Profile not found.`)
    return message.channel.send(embed)
    
  }
  
  if (db.has(`profile_${message.guild.id}_${message.mentions.users.first().id}_followersme_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You are already following.`)
    return message.channel.send(embed)
    
  }
  
  var followuser = message.mentions.users.first()
  
  db.add(`profile_${message.guild.id}_${followuser.id}_followers`, 1)
  db.add(`profile_${message.guild.id}_${message.author.id}_following`, 1)
  db.set(`profile_${message.guild.id}_${message.mentions.users.first().id}_followersme_${message.author.id}`, "yes")
  
  var xx = db.get(`profile_${message.guild.id}_${followuser.id}_notif`) || "off"
  
  if (xx == "on") {
    
    followuser.send(`<@${message.author.id}> followed you.`)
    
  }
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`You have successfully followed.`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["follow"],
  permLevel: 0
};

exports.help = {
  name: "follow",
  description: "",
  usage: "follow"
};