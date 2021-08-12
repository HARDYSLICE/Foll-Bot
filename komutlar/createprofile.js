const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild || message.author.bot) return;
  //if (message.author.id !== ayarlar.sahip) return message.channel.send("You cannot use this command.")
  
  if (!db.has(`fallchannel_${message.guild.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Channel is not set for **FOLL**.\nPlease contact the administrator.`)
    return message.channel.send(embed)
    
  }
  
  if (db.has(`ban_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You are banned from **FOLL SYSTEMS**,\nso you will never be able to create a profile on any server again.`)
    return message.channel.send(embed)
    
  }
  
  //if (message.author.id !== ayarlar.sahip) return message.channel.send("I am on beta and you are not my owner. So you can not use this command.")
  
  //const gecerliKarakter = ["ABCDEFGabcdefg"]
  //const gecerliKarakter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","V","Y","Z","Q","W","X","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","y","z","q","w","x","1","2","3","4","5","6","7","8","9","_"]
  
  if (db.has(`profile_${message.guild.id}_${message.author.id}`)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`You already have a profile.`)
    return message.channel.send(embed)
    
  }
  
  if (!args[0]) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.createprofile [Profile Name] [Username (@...) (Without @)]\``)
    return message.channel.send(embed)
    
  }
  
  if (!args[1]) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.createprofile [Profile Name] [Username (@...) (Without @)]\``)
    return message.channel.send(embed)
    
  }
  
  if (args[1].includes("@")) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`Wrong usage, use like this:\n\`.createprofile [Profile Name] [Username (@...) (Without @)]\``)
    return message.channel.send(embed)
    
  }
  
  if (args[0].includes("\\") || args[0].includes("\n") || args[0].includes("*") || args[0].includes("**") || args[0].includes("***") || args[0].includes("\"") || args[0].includes("`") || args[0].includes("<") || args[0].includes(">") || args[0].includes(":")) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Profile Name can not include:\n```\` \\n * ** *** \" < > @ : ```")
    return message.channel.send(embed)
    
  }
  
  if (args[1].includes("\\") || args[1].includes("\n") || args[1].includes("*") || args[1].includes("**") || args[1].includes("***") || args[1].includes("\"") || args[1].includes("`") || args[1].includes("<") || args[1].includes(">") || args[1].includes(":")) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Username can not include:\n```\` \\n * ** *** \" < > @ : ```")
    return message.channel.send(embed)
    
  }
  
  if (args[1].length < 4) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Your username must be greater than 4 characters.")
    return message.channel.send(embed)
    
  }
  
  if (!args[1].match( /^[A-Za-z0-9]+$/)) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription("Your username must contain only characters.")
    return message.channel.send(embed)
    
  }
  
  if (message.author.id !== ayarlar.sahip) {
    
    if (args[0] == "eyuq" || args[1] == "eyuq") {

      const embed = new Discord.MessageEmbed()
      .setColor(ayarlar.embedColor)
      .setDescription("You cannot get this username.")
      return message.channel.send(embed)

    }
  
  }
  var xxxx
  xxxx = 0
  
  message.guild.members.cache.forEach(member => {
    console.log("1")
    if (db.has(`profile_${message.guild.id}_${member.id}_username`)) {
      console.log("2")
      var xxxxxxxxx = db.get(`profile_${message.guild.id}_${member.id}_username`)
      if (args[1] == xxxxxxxxx) xxxx = xxxx + 1;
      console.log(`${xxxx} --- ${xxxxxxxxx} --- ${args[1]}`)
      return;
    }
  })
  
  if (xxxx > 0) {
    
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.embedColor)
    .setDescription(`This username is already taken.`)
    return message.channel.send(embed)
    
  }
  
  //if (db.has(`profile_${message.guild.id}_${message.author.id}_username`))
  
  const embed = new Discord.MessageEmbed()
  .setColor(ayarlar.embedColor)
  .setDescription(`Your profile has been successfully created.\n\`Profile Name: ${args[0]}\`\n\`Username: @${args[1]}\`\n\nUse the \`${ayarlar.prefix}profile\` command for more information.`)
  message.channel.send(embed)
  
  var x = Math.floor(Math.random() * 1000000000000000) + 1;
  
  db.set(`profile_${message.guild.id}_${message.author.id}`, "yes")
  db.set(`profile_${message.guild.id}_${message.author.id}_name`, args[0])
  db.set(`profile_${message.guild.id}_${message.author.id}_username`, args[1])
  db.set(`profile_${message.guild.id}_${message.author.id}_id`, x)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["createprofile"],
  permLevel: 0
};

exports.help = {
  name: "createprofile",
  description: "",
  usage: "createprofile"
};