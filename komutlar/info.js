const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
 let days = Math.floor(client.uptime / 86400000);
 let hours = Math.floor(client.uptime / 3600000) % 24;
 let minutes = Math.floor(client.uptime / 60000) % 60;
 let seconds = Math.floor(client.uptime / 1000) % 60;
  
  
  const embed = new Discord.MessageEmbed()
  .setDescription("Hello, my name is **" + client.user.username + "!**")
  .addField("Nodejs version", `${process.version}`, true)
  .addField("Discordjs version", `${Discord.version}`, true)
  .addField("Bot version:", "1.2.0", true)
  .addField("Ping", `${client.ws.ping}`, true)
  .addField("Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`, true)
  .addField("Number of Servers", client.guilds.cache.size, true)
  .addField("Number of Members", client.users.cache.size, true)
  .addField("Support Server", "[Click to Join](https://discord.gg/vGgKHjVr7P)", true)
  .addField("Owner", "eyuq#0118, HARDY_SLICE#3345", true)
  .addField("Developer", "eyuq#0118", true)
  .addField("Bot manager", "HARDY_SLICE#3345", true)
  .addField("Prefix", "`.`", true)
  .setColor(ayarlar.embedColor)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["info", "bot"],
  permLevel: 0
};

exports.help = {
  name: "info",
  description: "",
  usage: "info"
};