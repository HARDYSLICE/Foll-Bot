const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  
  message.delete()
  
  if (!db.has(`fallchannel_${message.guild.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Channel is not set for **FOLL**.\nPlease contact the server owner.`)
    return message.channel.send(embed)
    
  }
  
  if (!db.has(`profile_${message.guild.id}_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You don't have a profile.\nPlease create a profile first with \`${ayarlar.prefix}createprofile\``)
    return message.channel.send(embed)
    
  }
  
  var icerik = args.join(" ")
  
  if (!icerik) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Please add a content.`)
    return message.channel.send(embed)
    
  }
  
  if (icerik.length >= 70) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Content can not exceed 70 characters.`)
    return message.channel.send(embed)
    
  }
  
  if (message.author.id == ayarlar.sahip || message.author.id == "745237219144499312" || message.author.id == "706562804898988072") {
  
    var rozetler = "❤️"
    
  } else {
    
    /*if (message.author.id == "706562804898988072") {
      
      var rozetler = "<:staff:839244933268242432> <:erlbtusr:839248391627603998> <:bghnt:838932494417657916> <:dvlp:839247408403447869>"
      
    } else {*/
      
      if (message.author.id == "563742782070587404") {
        
        var rozetler = "❤️"
        
      } else {
        
        var rozetler = ""
        
      }
      
    
  }
  
  if (message.attachments.size > 0) {
    console.log("1")
    var x = message.attachments.array()[0].url
    var x2 = x.split('.').pop();
    console.log(x2)
    if (x2 !== "jpeg" && x2 !== "jpg" && x2 !== "jif" && x2 !== "jff" && x2 !== "jfif" && x2 !== "png") {
        
      const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.embedColor)
      .setDescription("Images can only be in the following extensions:\n```jpeg jpg jif jff jfif png```")
      return message.channel.send(embed)
      
    }
  }
  
 
    
  var channnnnel = db.get(`fallchannel_${message.guild.id}`)
  var channnnnel2 = message.guild.channels.cache.get(channnnnel)
  var user = db.get(`profile_${message.guild.id}_${message.author.id}_name`) + ` ${rozetler}`
  var username = "@" + db.get(`profile_${message.guild.id}_${message.author.id}_username`)
  db.add(`profile_${message.guild.id}_${message.author.id}_posts`, 1)
  var posts = db.get(`profile_${message.guild.id}_${message.author.id}_posts`) || 0
  
      console.log("Posted a message")
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`Post has been successfully shared in <#${channnnnel}>\nAnd you have ${posts} posts!`)
  .setFooter(`If you don't see the post, then the post channel has been deleted and thus you need to set a new channel, use .setChannel `)
  message.channel.send(`${message.author}`, embed)
  
  const dateCreated = moment(message.createdAt)
  
  if (message.attachments.size > 0) {
    
    const embed2 = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setImage(x)
    .setDescription(`**${user}** ${username}\n\n${icerik}`)
    .setFooter(`${dateCreated.format("LT")} (UTC) ● --- ● Like: 0`)
    .setTimestamp("afasf")
    
    channnnnel2.send(embed2).then(async mesaj => {
      setTimeout(function() {
        embed2.setFooter(`${dateCreated.format("LT")} (UTC) ● ${mesaj.id} ● Like: 0`)
        db.set(`post_${message.guild.id}_${mesaj.id}_author`, message.author.id)
      }, 100)
          console.log("test 3")
    mesaj.react('️❤️') 
            console.log("test 4")
    const onay = (reaction, user) => reaction.emoji.name === '️❤️';
        console.log("test 5")
    const onayladı = mesaj.createReactionCollector(onay, { time: 3600000 });
        console.log("test 6")
    onayladı.on('collect', async (reaction, user) => {
        console.log("7")
      if (db.has(`post_${message.guild.id}_${mesaj.id}_likeme_${message.author}`)) return;
        console.log("8")
      db.add(`post_${message.guild.id}_${mesaj.id}_like`, 1)
        console.log("9")
      db.set(`post_${message.guild.id}_${mesaj.id}_likeme_${message.author}`, "evet")
        console.log("10")
      var likes = db.get(`post_${message.guild.id}_${mesaj.id}_like`) || 0
      console.log("11")
      embed2.setColor(ayarlar.embedColor)
        console.log("12")
      embed2.setFooter(`${dateCreated.format("LT")} (UTC) ● ${mesaj.id} ● Like: ` + likes)
        console.log("13")
      mesaj.edit(embed2)
        console.log("14")
    })});
    return;
  } else {
    
    const embed2 = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`**${user}**\n${username}\n\n${icerik}`)
    .setThumbnail(message.author.avatarURL())
    .setFooter(`${dateCreated.format("LT")} (UTC) ● Like: 0`)
    .setTimestamp("afasf")
    
    channnnnel2.send(embed2).then(async mesaj => {   
      
      setTimeout(function() {
        embed2.setFooter(`${dateCreated.format("LT")} (UTC) ● ${mesaj.id} ● Like: 0`)
        mesaj.edit(embed2)
        db.set(`post_${message.guild.id}_${mesaj.id}_author`, message.author.id)
      }, 100)
      
    await mesaj.react("❤️")
    const onay = (reaction, user) => reaction.emoji.name === "❤️";
    const onayladı = mesaj.createReactionCollector(onay, { time: 3600000 });
    onayladı.on('collect', async (reaction, user) => {
      console.log(`${message.guild.id} - ${mesaj.id} - ${user.id}`)
      if (db.has(`post_${message.guild.id}_${mesaj.id}_likeme_${user.id}`)) return;
      db.add(`post_${message.guild.id}_${mesaj.id}_like`, 1)
      db.set(`post_${message.guild.id}_${mesaj.id}_likeme_${user.id}`, "evet")
      var likes = db.get(`post_${message.guild.id}_${mesaj.id}_like`) || 0
      embed2.setColor(ayarlar.embedColor)
      embed2.setFooter(`${dateCreated.format("LT")} (UTC) ● ${mesaj.id} ● Like: ` + likes)
      mesaj.edit(embed2)
    })
      
      
    onayladı.on('uncollect', async codefun => {
      console.log("ok")
    })});
  
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["createpost"],
  permLevel: 0
};

exports.help = {
  name: "createpost",
  description: "",
  usage: "createpost"
};