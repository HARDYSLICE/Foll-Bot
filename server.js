const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const ccanvacord = require("canvacord");
const fs = require("fs");
const moment = require("moment");
const ayarlar = require("./ayarlar.json");
require('./util/eventLoader')(client);
const PREFIX = ayarlar.prefix
const figlet = require("figlet");

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`Total commands to load: ${files.length} \n\n`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Attempting to load: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

client.on("ready", () => {
 client.user.setActivity(`Social Medias`, { type: "LISTENING",});
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
  console.log(`with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`)
})



client.on('guildCreate', guild => {
channel = client.channels.cache.get('849598367180128256');
channel.send(`\`\`\` Joined a new guild '${guild.name}' id: ${guild.id}. This guild has ${guild.memberCount} members \nNow currently in ${client.guilds.cache.size} servers!\`\`\``)
})

client.on('guildDelete', guild => {
  channel = client.channels.cache.get('849598416774234112');
  channel.send(`\`\`\`I have been removed from '${guild.name}' id: ${guild.id} \nNow currently in ${client.guilds.cache.size} servers\`\`\` `)
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    
    if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("#080707").setAuthor(`${message.author.username} My Prefix is ${PREFIX} to get started type ${PREFIX}help`, message.author.displayAvatarURL({dynamic:true})));
  }
})

////////////////////////////////////////////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token)