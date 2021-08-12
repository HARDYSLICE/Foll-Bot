const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  //if (message.author.id !== ayarlar.sahip) return message.channel.send("I am on beta and you are not my owner. So you can not use this command.")
  
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
    .setDescription(`Wrong usage, use like this:\n\`${ayarlar.prefix}bio [New Biography]\``)
    return message.channel.send(embed)
    
  }
  
  if (args[0].length >= "30") {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Biography can not exceed 30 characters.")
    return message.channel.send(embed)
    
  }
  
  if (args[0].includes("\\") || args[0].includes("\n") || args[0].includes("*") || args[0].includes("**") || args[0].includes("***") || args[0].includes("\"") || args[0].includes("`") || args[0].includes("<") || args[0].includes(">")) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Biography can not include:\n```\` \\n * ** *** \" < > @ ```")
    return message.channel.send(embed)
    
  }
  
  if (args[0].includes("http://") || args[0].includes("https://") || args[0].includes(".com") || args[0].includes(".net") || args[0].includes(".org") || args[0].includes(".gg") || args[0].includes("discord.gg")) {
    
    message.delete()
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Biography can not include advertisements.")
    return message.channel.send(embed)
    
  }
  
  var bio = args.join(" ")
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`Your biography has been edited.\n\`${bio}\``)
  message.channel.send(embed)
  
  db.set(`profile_${message.guild.id}_${message.author.id}_bio`, bio)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bio"],
  permLevel: 0
};

exports.help = {
  name: "bio",
  description: "",
  usage: "bio"
};