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
  
  if (!args[0]) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`${ayarlar.prefix}notif [on/off]\``)
    return message.channel.send(embed)
    
  }
  
  if (args[0] !== "on" && args[0] !== "off") {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`${ayarlar.prefix}notif [on/off]\``)
    return message.channel.send(embed)
    
  }
  
  if (args[0] == "on") {
    
    var x = db.get(`profile_${message.guild.id}_${message.author.id}_notif`) || "off"
    
    if (x == "on") {
      
      const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.embedColor)
      .setDescription(`Notifications are already active.`)
      return message.channel.send(embed)
      
    }
    
    db.set(`profile_${message.guild.id}_${message.author.id}_notif`, "on")
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You will be notified when:\n**—** When someone following you\n**—** When someone unfollowing you`)
    return message.channel.send(embed)
    
  }
  
  if (args[0] == "off") {
    
    var x = db.get(`profile_${message.guild.id}_${message.author.id}_notif`) || "off"
    
    if (x == "off") {
      
      const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.embedColor)
      .setDescription(`Notifications are already off.`)
      return message.channel.send(embed)
      
    }
    
    db.set(`profile_${message.guild.id}_${message.author.id}_notif`, "off")
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Notifications have been successfully turned off.`)
    return message.channel.send(embed)
    
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["notif"],
  permLevel: 0
};

exports.help = {
  name: "notif",
  description: "",
  usage: "notif"
};