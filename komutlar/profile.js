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
  
  var user, x11
  
  if (message.mentions.users.size < 1) {
    
    user = message.author
    x11 = `You don't have a profile.\nPlease create a profile first with \`${ayarlar.prefix}createprofile\``
    
  } else {
    
    user = message.mentions.users.first() || client.guild.members.cache.get(args[0])
    x11 = `This user has no profile.`
    
  }
  
  if (!db.has(`profile_${message.guild.id}_${user.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(x11)
    return message.channel.send(embed)
    
  }
  
  var posts = db.get(`profile_${message.guild.id}_${user.id}_posts`) || 0
  var followers = db.get(`profile_${message.guild.id}_${user.id}_followers`) || 0
  var following = db.get(`profile_${message.guild.id}_${user.id}_following`) || 0
  var bio = db.get(`profile_${message.guild.id}_${user.id}_bio`) || "No information was given."

  if (message.mentions.members.size > 0) {
    
    if (message.mentions.members.first().id == ayarlar.sahip || message.mentions.members.first().id == "745237219144499312" || message.mentions.members.first().id == "706562804898988072") {
      
      var rozetler = "<:staff:839244933268242432>"
      
    } else {
      
      /*if (message.mentions.members.first().id == "706562804898988072") {
        
        var rozetler = "<:staff:839244933268242432> <:bghnt:838932494417657916> <:dvlp:839247408403447869> <:erlbtusr:839248391627603998>"
        
      } else {*/
        
        if (message.mentions.members.first().id == "563742782070587404") {
          
          var rozetler = "<:bghnt:838932494417657916> <:dvlp:839247408403447869>"
          
        } else {
          
            var rozetler = ""

        
      }
      
    }
    
  } else {
    
    if (message.author.id == ayarlar.sahip || message.author.id == "745237219144499312" || message.author.id == "706562804898988072") {

      var rozetler = "<:catto:849585291392188436>"

    } else {

        /*if (message.author.id == "706562804898988072") {

        var rozetler = "<:bghnt:838932494417657916> <:dvlp:839247408403447869> <:erlbtusr:839248391627603998>"

      } else {*/

        if (message.author.id == "563742782070587404") {

          var rozetler = "<:bghnt:838932494417657916> <:dvlp:839247408403447869>"

        } else {

          var rozetler = ""

        }

    }
    
  }
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setThumbnail(user.avatarURL())
  .setDescription(`**${db.get(`profile_${message.guild.id}_${user.id}_name`)} ${rozetler}**\n@${db.get(`profile_${message.guild.id}_${user.id}_username`)}\n\n${bio}\n\n**${posts}** Posts, **${followers}** Followers, **${following}** Following`)
  .setTimestamp("asfasf")
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["profile"],
  permLevel: 0
};

exports.help = {
  name: "profile",
  description: "",
  usage: "profile"
};