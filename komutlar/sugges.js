const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var blacklist = ['']

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;

  message.delete()
  
  if (message.author.id == blacklist) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`**You have abused this feature before and as such have been put on a blacklist.**`)
    return message.channel.send(embed)
    
  }
  
  let sug = args.join(" ")
  
  if (!sug) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Please state what the suggestion is.`)
    return message.channel.send(embed)
    
  }
  
  var channel = client.channels.cache.get("849584036309106690")
  
  const bugreport = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .addField("User", message.author.username + "#" + message.author.discriminator, true)
  .addField("User ID", message.author.id, true)
  .addField("Server ID", message.guild.id, true)
  .addField("Suggestion", sug)
  channel.send(bugreport).then(mesaj => {
    
    mesaj.react("✅").then(mesaj.react("❎"))
    
  })
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`The suggestion has been successfully sent to the support server.`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sug", "suggest", "suggestion"],
  permLevel: 0
};

exports.help = {
  name: "sug",
  description: "",
  usage: "sug"
};