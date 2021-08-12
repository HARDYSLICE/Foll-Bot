const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  if (message.author.id !== ayarlar.sahip || message.author.id !== "549270535490502656") return;
  
  let mesaj = args.join(" ").slice(18);

  message.guild.members.cache.get(args[0]).send(mesaj)
  message.channel.send("Message sended.")
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bugconn"],
  permLevel: 0
};

exports.help = {
  name: "bugconn",
  description: "",
  usage: "bugconn"
};