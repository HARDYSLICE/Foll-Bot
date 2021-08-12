const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var blacklist = ['']

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;

  if (message.author.id == blacklist) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`**You have abused this feature before and as such have been put on a blacklist.**`)
    return message.channel.send(embed)
    
  }
  
  let bug = args.join(" ")
  
  if (!bug) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Please state what the bug is.`)
    return message.channel.send(embed)
    
  }
  
  var channel = client.channels.cache.get("849596115116490823")
  
  const bugreport = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .addField("User", message.author.username + "#" + message.author.discriminator, true)
  .addField("User ID", message.author.id, true)
  .addField("Server ID", message.guild.id, true)
  .addField("Bug", bug)
  channel.send(bugreport)
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`The bug report has been successfully sent to the support server.`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bugreport"],
  permLevel: 0
};

exports.help = {
  name: "bugreport",
  description: "",
  usage: "bugreport"
};