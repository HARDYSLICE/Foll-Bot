const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  if (!db.has(`profile_${message.guild.id}_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You don't have a profile.\nPlease create a profile first with \`${ayarlar.prefix}createprofile\``)
    return message.channel.send(embed)
    
  }
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("Your ID has been sent as a private message.")
  message.channel.send(embed)
  
  var x = db.get(`profile_${message.guild.id}_${message.author.id}_id`)
  
  const embed2 = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`Your User ID: ${x}\n**Do not share your ID with anyone.**`)
  message.author.send(embed2)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["userid"],
  permLevel: 0
};

exports.help = {
  name: "userid",
  description: "",
  usage: "userid"
};