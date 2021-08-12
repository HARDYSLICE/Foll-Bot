const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;  
  
  message.channel.send("Nothing to try")
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["try"],
  permLevel: 0
};

exports.help = {
  name: "try",
  description: "",
  usage: "try"
};