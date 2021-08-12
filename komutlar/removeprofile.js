const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  if (message.author.id !== ayarlar.sahip) return;
  if (!args[0]) return;
  
  db.delete(`profile_${message.guild.id}_${args[0]}`)
  db.delete(`profile_${message.guild.id}_${args[0]}_name`)
  db.delete(`profile_${message.guild.id}_${args[0]}_username`)
  db.delete(`profile_${message.guild.id}_${args[0]}_id`)
  db.delete(`profile_${message.guild.id}_${args[0]}_followers`)
  db.delete(`profile_${message.guild.id}_${args[0]}_following`)
  db.delete(`profile_${message.guild.id}_${args[0]}_posts`)
  db.delete(`profile_${message.guild.id}_${args[0]}_bio`)
  
  var x1 = db.get(`profile_${message.guild.id}_${args[0]}`)
  var x2 = db.get(`profile_${message.guild.id}_${args[0]}_name`)
  var x3 = db.get(`profile_${message.guild.id}_${args[0]}_username`)
  var x4 = db.get(`profile_${message.guild.id}_${args[0]}_id`)
  var x5 = db.get(`profile_${message.guild.id}_${args[0]}_followers`)
  var x6 = db.get(`profile_${message.guild.id}_${args[0]}_following`)
  var x7 = db.get(`profile_${message.guild.id}_${args[0]}_posts`)
  var x8 = db.get(`profile_${message.guild.id}_${args[0]}_bio`)
  
  message.channel.send("Has been removed.")
  message.channel.send(`${x1} ${x2} ${x3} ${x4} ${x5} ${x6} ${x7} ${x8}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["removeprofile"],
  permLevel: 0
};

exports.help = {
  name: "removeprofile",
  description: "",
  usage: "removeprofile"
};