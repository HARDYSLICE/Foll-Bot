const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  //`post_${message.guild.id}_${mesaj.id}_author`
  
  if (!args[0]) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.removepost [POST ID]\``)
    return message.channel.send(embed)
    
  }
  
  if (isNaN(args[0])) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.removepost [POST ID]\``)
    return message.channel.send(embed)
    
  }
  
  var x1 = args[0]
  var x2 = db.get(`post_${message.guild.id}_${x1}_author`)
  
  if (x2 !== message.author.id) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You are not the author of this post.`)
    return message.channel.send(embed)
    
  }
  
  client.channels.cache.get(db.get(`fallchannel_${message.guild.id}`)).messages.fetch(x1).then(message => message.delete())
  db.delete(`post_${message.guild.id}_${x1}_author`)
  db.delete(`post_${message.guild.id}_${x1}_like`)
  db.add(`profile_${message.guild.id}_${message.author.id}_posts`, -1)
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("Post has been deleted.")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["removepost"],
  permLevel: 0
};

exports.help = {
  name: "removepost",
  description: "",
  usage: "removepost"
};