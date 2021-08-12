const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription("**— What is FOLL?**\nFOLL is a social media bot. You can share a posts and receive notifications.\n\n**— How to use?**\n`.ping` : You can check the bot's ping.\n`.uptime` : You can the bot's uptime.\n`.info` : You can see bot's information.\n`.invite` : Get the bot's invite link.\n`.setchannel` : You can set channel for commands.\n`.createprofile` : You can create a server profile.\n`.bugreport` : You can report any bug.\n`.suggest` : You can suggest ideas.\n`.bio` : You can change your biography.\n`.createpost` : You can create a post.\n`.follow` : You can follow any user.\n`.unfollow` : You can unfollow a user.\n`.profile` : You can look at your profile.\n`.removepost` : You can remove your post.\n`.userid` : You can see user id.\n`.notif` : You can change your notification settings.\n\n[Support Server](https://discord.gg/b6vJNmP4uk) ● [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=849592731226341387&permissions=3490577617&scope=bot)")
  .setFooter("Pls note that you can't use the same account in all servers, thus you need to make new account in new server")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "help",
  description: "",
  usage: "help"
};