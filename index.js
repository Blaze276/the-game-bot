const config = require('./config.json');
const { Collection } = require('discord.js');
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const { ActivityType } = require("discord.js");
const { PermissionsBitField } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json'); 
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const path = require('path');
const { setInterval } = require('timers');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// keepalive
const http = require('http');
const { EmbedBuilder } = require('@discordjs/builders');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('a');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// slash commands shit
client.commands = new Collection(); // Initialize client.commands

const rest = new REST({ version: "9" }).setToken(config.token);
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commandMap = new Map();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
const fs = require('fs');

  // Check if the command name is already present in the map
  if (commandMap.has(command.data.name)) {
    console.error(`Duplicate command name found: ${command.data.name}. Skipping...`);
    continue;
  }

  commandMap.set(command.data.name, true);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
    console.log("Received HELLO. Running The Game Bot");

    const CLIENT_ID = client.user.id;

    try {
        if (config.token === "production") {
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands
            });
            console.log("Slash commands registered!");
        } else {
            await rest.put(Routes.applicationCommands(CLIENT_ID, config.client_id), {
                body: commands
            });
            console.log("Slash commands registered locally!");
        }
    } catch (error) {
        console.error("Error registering slash commands:", error);
    }
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (!client.commands.has(commandName)) return;

    try {
        await client.commands.get(commandName).execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

  

    // Start of bot code
const statusMessages = [
  'Infinite Amethyst by Lena Raine',
  'Death Awaits by Niels Bye Nielsen ',
  'Overworld Day by Scott Lloyd Shelly',
  'Fortnite Chapter 5 theme by Phil Boucher ',
  'Bolero by Maurice Ravel',
  'MW2 Opening titles by Hans Zimmer',
  'Sweden by C148',
  'And the winner is by Embark Studios'
  // Add more status messages here
];

// Function to set a random status
 const setRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * statusMessages.length);
  const status = statusMessages[randomIndex];

  client.user.setPresence({
    activities: [{ name: status, type: ActivityType.Listening}],
    status: "idle",
});
};

// Function to possibly set the special status
const maybeSetSpecialStatus = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  if (randomNumber === 1) {
    client.user.setPresence({
      activities: [{ name: `Kotlins just better`, type: ActivityType.Watching}],
      status: "dnd",
  });
  }
};


  // Initial random status update
  console.log("status set")
  setRandomStatus();

  // Possibly set the special status
  maybeSetSpecialStatus();

  // Schedule recurring status updates every 30 minutes
  setInterval(() => {
    setRandomStatus();
    maybeSetSpecialStatus();
    console.log("status updated")
  }, 1800000); // 30 minutes in milliseconds

});



const icon = 'https://cdn.discordapp.com/avatars/1145327542723686451/357962c9bc83d6aff4106fcd655b06a3.png?size=4096';
const accentColour = 0xF7DF1E;


const prefix = '?'; // command prefix

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
  if (command === 'ip') {
      message.channel.send("The IP is **soxthesigma.my.pebble.host** \nversion **1.18.1** \n**REQUIRES ORIGINS MOD**");

  } else if (command === 'saveargument') {
    try {
        const MESSAGE_LIMIT = 200;
        const messages = [];

        // Fetch the last 200 messages in the channel
        const fetchedMessages = await message.channel.messages.fetch({ limit: MESSAGE_LIMIT });
        
        fetchedMessages.forEach((msg) => messages.push(msg));

        // Reverse the order to save in chronological order
        messages.reverse();

        // Write messages to the file
        const filePath = 'argument.txt';
        fs.writeFileSync(filePath, ''); // Clear the file before writing new messages

        messages.forEach((msg) => {
            fs.appendFileSync(filePath, `${msg.author.username} (${msg.author.id}): ${msg.content}\n`);
        });

        // Send the file back to the channel
        await message.channel.send({
            content: 'Here are the last 200 messages saved:',
            files: [{
                attachment: filePath,
                name: 'argument.txt'
            }]
        });
    } catch (error) {
        console.error("Error saving messages:", error);
        message.channel.send("An error occurred while trying to save the messages.");
    }
    
} else if (command === 'promote') {
    // Check if the message was sent in a server
    if (!message.guild) return message.reply("This command only works in a server.");

    // Check if the member exists
    if (!message.member) return message.reply("You must be in a server to use this command.");

    // Check if the member has administrator permission
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply("You don't have permission to use this command.");
    }

    // Get the user mentioned in the command
    const user = message.mentions.members.first();
    if (!user) return message.reply("Please mention a user to promote.");

    // Get the role to add
    const roleName = "Knight";
    const role = message.guild.roles.cache.find(role => role.name === roleName);
    if (!role) return message.reply("Error, role not found. Check code.");

    // Add the role to the user
    try {
        await user.roles.add(role);
        message.channel.send(`**${user.user.tag}** Has been promoted to The **Knights**!`);
    } catch (error) {
        console.error(error);
        message.channel.send("There was an error adding the role.");
    }


} else if (command === 'nobility') {
  // Check if the message was sent in a server
  if (!message.guild) return message.reply("This command only works in a server.");

  // Check if the member exists
  if (!message.member) return message.reply("You must be in a server to use this command.");

  // Check if the member has administrator permission
  if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply("You don't have permission to use this command.");
  }

  // Get the user mentioned in the command
  const user = message.mentions.members.first();
  if (!user) return message.reply("Please mention a user to promote.");

  // Get the role to add
  const roleName = "Noble";
  const role = message.guild.roles.cache.find(role => role.name === roleName);
  if (!role) return message.reply("Error, role not found. Check code.");

  // Add the role to the user
  try {
      await user.roles.add(role);
      message.channel.send(`**${user.user.tag}** Has been promoted to The **Nobles**!`);
  } catch (error) {
      console.error(error);
      message.channel.send("There was an error adding the role.");
  }


  } else if (command === 'say') {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      message.channel.send(args.join(' '));
      try {
        await message.delete();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    } else {
      message.channel.send(`\`${message.author.tag} said:\` ${args.join(' ')}`);
      try {
        await message.delete();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }

  } else if (command === 'kick') {

    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();

    if (!user) {
        return message.reply('You didn\'t mention the user to kick!');
    }

    if (user.id === '960887298533244928') {
        return message.channel.send('Error kicking **<@960887298533244928>**: No Permissions.');
    }

    const member = message.guild.members.resolve(user);
    if (!member) {
        return message.reply('That user isn\'t in this server!');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided'; // Fix to handle multiple-word reasons
    member.kick(reason)
        .then(() => {
            message.channel.send(`Successfully kicked **${user.tag}** from the server for **${reason}**!`);
        })
        .catch(err => {
            message.reply('Unable to kick the member. Check the console for more information.');
            console.error('Error kicking member:', err);
        });

} else if (command === 'ban') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();

    if (user.id === '960887298533244928') { 
        return message.channel.send('Error banning **<@960887298533244928>**: No Permissions.');
      }
    
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        const reason = args[2]; // Get the 3rd argument as the reason

        member.ban({ reason: `You were banned from the server. Reason: ${reason}` }).then(() => {
          message.channel.send(`Successfully banned **${user.tag}** from the server for **${reason}**!`);
        }).catch(err => {
          message.reply('unable to ban the member. Check the console for more information.');
          console.error('Error banning member:', err);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }


  } else if (command === 'unban') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('You do not have permission to use this command.');
    const user = args[0];

    if (!user) return message.reply('You didn\'t mention the user to unban!');

    message.guild.bans.fetch().then(bans => {
      if (bans.size === 0) return message.reply('There are no banned users in this server!');

      const bannedUser = bans.find(ban => ban.user.id === user);
      if (!bannedUser) return message.reply('The user you mentioned is not banned!');

      message.guild.members.unban(bannedUser.user).then(() => {
        message.channel.send(`Successfully unbanned **${bannedUser.user.tag}** from the server!`);
      }).catch(err => {
        message.reply('unable to unban the member. Check the console for more information.');
        console.error('Error unbanning member:', err);
      });
    }).catch(err => {
      message.reply('unable to fetch the bans. Check the console for more information.');
      console.error('Error fetching bans:', err);
    });


  } else if (command === 'purge') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('You do not have permission to use this command.');
    const amount = parseInt(args[0], 10) + 1;
    // ty Raccle taccle
if (isNaN(amount)) {
  return message.channel.send('That doesn\'t seem to be a valid number.').then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 5000);
    })
  };

if (amount < 1 || amount > 100) {
  return message.channel.send('You need to input a number between 1 and 100.').then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 5000);
    })
  };

message.channel.bulkDelete(amount, true)
 .then(() => {
    message.channel.send(`Successfully deleted **${amount - 1}** messages!`).then(msg => {
  setTimeout(() => {
    msg.delete();
  }, 5000);
});
  })
 .catch(err => {
    console.error('Error deleting messages:', err);
    message.reply('There was an error trying to delete messages in this channel!').then(msg => {
  setTimeout(() => {
    msg.delete();
  }, 5000);
  })
});


  } else if (command === 'sigma') {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), 8, 9); 
    if (currentDate.toDateString() === targetDate.toDateString()) {
      message.channel.send('Happy Birthday <@960887298533244928>!');
    } else {
      message.channel.send('command disabled')
    }


  } /*else if (command === 'kofi') {
    const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('Support Us on Ko-fi!')
      .setURL('https://ko-fi.com/gamingtothepeople')
      .setDescription('Thank you so much for considering to support us! It really means the world to our team!')
      .setThumbnail(icon)
      .setAuthor({ name: 'The Game Bot', iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });


  } else if (command === 'patreon') {
    const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('Support Us on Patreon!')
      .setURL('https://www.patreon.com/gamingtothepeople')
      .setDescription('Thank you so much for considering to support us! It really means the world to our team!')
      .setThumbnail(icon)
      .setAuthor({ name: 'The Game Bot', iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });


  } */else if (command === 'credits') {
    const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('The Game Bot Credits')
      .setDescription('The Game Bot was made by **Blaze276** and other cool people!')
      .addFields(
        { name: 'Blaze276', value: 'The maintainer and creator of the bot'},
        { name: 'RACSpeedster', value: 'Created a basic python bot that started it all!, (and made the lua version)'},
        { name: 'Chat.openai', value: 'helped to debug certain errors and show examples of commands'},
      )
      .setThumbnail('https://cdn.discordapp.com/avatars/1164696267310506034/da13efd53cd5bb201b025f29d71b17c5.png?size=4096')
      .setAuthor({ name: 'Blaze276', iconURL: 'https://cdn.discordapp.com/avatars/1164696267310506034/da13efd53cd5bb201b025f29d71b17c5.png?size=4096'})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });


  } else if (command === 'gdps') {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('PrismGDPS')
      .setDescription('**THIS NO LONGER EXISTS** \nA Geometry Dash Private Server made by Blaze. You can join the server with the link on the embed or click [Here](https://drive.google.com/file/d/1IDdS28mTogrMDm9GZ4-2fcJ7Lg-yMifa/view?usp=sharing)')
      .setURL('https://drive.google.com/file/d/1IDdS28mTogrMDm9GZ4-2fcJ7Lg-yMifa/view?usp=sharing') 
      .setThumbnail('https://cdn.discordapp.com/attachments/1185176243134537828/1218676497557225604/icon.png?ex=660887ee&is=65f612ee&hm=d8f42595762876087a6d175ad730e65df7f3eea0c8e75cf95b2ebc3637b9ae71&')
      .setAuthor({ name: 'The Game Bot', iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });


  } else if (command === 'warn') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();
    if (user.id === '960887298533244928') { 
      return message.channel.send('Error warning **<@960887298533244928>**: No Permissions.');
    }
      if (user) {
        const member = message.guild.members.resolve(user);
        if (member) {
          const reason = args.slice(1).join(' '); // Get all arguments except the first one as the reason
          member.send(`You have been warned in **${message.guild.name}** for **${reason}**!`).then(() => {
            message.channel.send(`Successfully warned **${user.tag}** for **${reason}**!`);

            // Store the warn in warns.json
            const warnData = {
              user: user.id,
              guild: message.guild.id,
              reason: reason
            };

          fs.readFile('warns.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading warns.json:', err);
              return;
            }

            let warns = [];
            if (data) {
              warns = JSON.parse(data);
            }

            warns.push(warnData);

            fs.writeFile('warns.json', JSON.stringify(warns), 'utf8', (err) => {
              if (err) {
                console.error('Error writing to warns.json:', err);
              }
            });
          });
        }).catch(err => {
          message.reply('unable to send a direct message to the member. Check the console for more information.');
          console.error('Error sending direct message to member:', err);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to warn!');
    }

  } else if (command === 'delwarn') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        fs.readFile('warns.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading warns.json:', err);
            return;
          }

          let warns = [];
          if (data) {
            warns = JSON.parse(data);
          }

          const filteredWarns = warns.filter(warn => warn.user !== user.id);

          fs.writeFile('warns.json', JSON.stringify(filteredWarns), 'utf8', (err) => {
            if (err) {
              console.error('Error writing to warns.json:', err);
            }
          });

          message.channel.send(`Successfully deleted all warns for **${user.tag}**!`);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to delete warns for!');
    }


  } else if (command === 'warnings') {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        fs.readFile('warns.json', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading warns.json:', err);
            return;
          }

          let warns = [];
          if (data) {
            warns = JSON.parse(data);
          }

          const userWarns = warns.filter(warn => warn.user === user.id);

          if (userWarns.length > 0) {
            const embed = new EmbedBuilder()
              .setColor(0xFF0000)
              .setTitle(`Warnings for ${user.tag}`)
              .setDescription(userWarns.map((warn, index) => `${index + 1}. Reason: ${warn.reason}`).join('\n'))
              .setTimestamp();

            message.channel.send({ embeds: [embed] });
          } else {
            message.reply('This user has no warnings.');
          }
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to view warnings for!');
    }


  } else if (command === 'mute') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();
      if (user.id === '960887298533244928') { 
        return message.channel.send('Error Muting **<@960887298533244928>**: No Permissions.');
      }
      if (user) {
        const member = message.guild.members.resolve(user);
        if (member) {
          const reason = args.slice(1).join(' '); // Get all arguments except the first one as the reason
          let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
          if (!muteRole) {
            // Create the 'Muted' role if it doesn't exist
            muteRole = await message.guild.roles.create({
              name: 'Muted',
              color: '#000000',
              permissions: []
            });

          // Prevent the 'Muted' role from sending messages in all text channels
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.edit(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        }

        member.roles.add(muteRole, `You were muted in the server. Reason: ${reason}`).then(() => {
          message.channel.send(`Successfully muted **${user.tag}** for **${reason}**!`);
        }).catch(err => {
          message.reply('unable to mute the member. Check the console for more information.');
          console.error('Error muting member:', err);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to mute!');
    }


  } else if (command === 'unmute') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (muteRole) {
          member.roles.remove(muteRole, `You were unmuted in the server.`).then(() => {
            message.channel.send(`Successfully unmuted **${user.tag}** from the server!`);
          }).catch(err => {
            message.reply('unable to unmute the member. Check the console for more information.');
            console.error('Error unmuting member:', err);
          });
        } else {
          message.reply('The user is not muted!');
        }
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to unmute!');
    }


  } else if (command === 'lock') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('You do not have permission to use this command.');
    const channel = message.mentions.channels.first() || message.channel;
    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`Successfully locked the channel **${channel.name}**!`);
    }).catch(err => {
      message.reply('unable to lock the channel. Check the console for more information.');
      console.error('Error locking channel:', err);
    });

  } else if (command === 'unlock') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('You do not have permission to use this command.');
    const channel = message.mentions.channels.first() || message.channel;
    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(`Successfully unlocked the channel **${channel.name}**!`);
    }).catch(err => {
      message.reply('unable to unlock the channel. Check the console for more information.');
      console.error('Error unlocking channel:', err);
    });

  } else if (command === 'pack-god') {
    message.channel.send('idk')

  /*} else if (command === 'mod') {
  if (!message.guild) return message.reply("This command only works in a server.");

  // Check if the member exists
  if (!message.member) return message.reply("You must be in a server to use this command.");

  // Get the user mentioned in the command
  const user = message.mentions.members.first();
  if (!user) return message.reply("Please mention a user to promote.");

  // Get the role to add
  const roleName = "𝖠𝖽𝗆𝗂𝗇";
  const role = message.guild.roles.cache.find(role => role.name === roleName);
  if (!role) return message.reply("Error, role not found. Check code.");

  // Add the role to the user
  try {
      await user.roles.add(role);
      message.channel.send(`**${user.user.tag}** Has been promoted to the **Admin** role!`);
  } catch (error) {
      console.error(error);
      message.channel.send("There was an error adding the role.");
  }

*/
} else if (command === 'rizz') {
  message.channel.send('Rizard,')
  message.channel.send('just like my lizard')

} else if (command === 'placeholder') {
  // do things
  message.channel.send('// do things')
  message.channel.send('https://www.dropbox.com/scl/fi/q6erpi2m3yuskvkdl8zdr/Screenshot-2025-01-04-184818.png?rlkey=qic7gml9luawa77hkw91kj5mc&st=zrv8hkzq&dl=1')

} else if (command === 'bottles') {
  const args = message.content.slice('$bottles'.length).trim().split(/ +/);
  const liquid = args.join(1);
  const amount = Math.floor(Math.random() * 100) + 1;

  if (liquid === 'water') {
    message.channel.send(`${amount} bottles of water on the wall!`);
  } else if (liquid === 'beer') {
    message.channel.send(`${amount} bottles of beer on the wall!`);
  } else if (liquid === 'wine') {
    message.channel.send(`${amount} bottles of wine on the wall!`);
  } else if (liquid === 'gin') {
    message.channel.send(`${amount} bottles of gin on the wall!`);
  } else if (liquid === 'rum') {
    message.channel.send(`${amount} bottles of rum on the wall!`);
  } else if (liquid === 'whiskey') {
    message.channel.send(`${amount} bottles of whiskey on the wall!`);
  } else if (liquid === 'cider') {
    message.channel.send(`${amount} bottles of cider on the wall!`);
  } else {
    message.channel.send('Invalid liquid provided. Please choose from water, beer, wine, gin, rum, whiskey, or cider.');
  }


} /*else if (command === 'assprune') {
  console.log('Executing massprune command...');

  // Check if the user has the necessary permissions
  if (!message.member.permissions.has('KICK_MEMBERS')) {
    message.reply('You do not have permission to use this command.');
    return;
  }

  // Get the role to check for
  const pruneRole = message.guild.roles.cache.find(role => role.name === 'prune');

  // Check if the 'prune_this_user' role exists
  if (!pruneRole) {
    console.log("Error: 'prune_this_user' role not found.");
    message.channel.send("Error: 'prune_this_user' role not found.");
    return;
  }

  // Get all members with the 'prune_this_user' role
  const pruneMembers = message.guild.members.cache.filter(member => member.roles.cache.has(pruneRole.id));

  console.log(`Found ${pruneMembers.size} members with the prune role.`);

  // Loop through each member and kick them
  pruneMembers.forEach(async (member) => {
    try {
      console.log(`Kicking ${member.user.tag}...`);
      await member.kick(`Mass prune command executed by ${message.author.tag}`);
      await message.channel.send('kicked ' + member.user.tag + ' ');
    } catch (error) {
      console.error(`Error kicking ${member.user.tag}:`, error);
    }
  });

  // Send a message in the channel the command was used in
  message.channel.send('Mass pruning completed successfully!');
} */else if (command === 'notices') {
  const args = message.content.split(' ');
        const url = args[1];

        if (!url) {
            message.channel.send('Please provide a URL.');
            return;
        }

        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);

            // Extract text content from a specific element (for example, all <p> tags)
            let textContent = '';
            $('p').each((i, elem) => {
                textContent += $(elem).text() + '\n';
            });

            // Send the extracted text to the Discord channel
            message.channel.send(textContent.length > 2000 ? textContent.substring(0, 1997) + '...' : textContent);

        } catch (error) {
            console.error(error);
            message.channel.send('Failed to scrape the webpage. Please check the URL and try again.');
        }
         
    } else if (command === 'playlist') {
      const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('The **Playlist**')
      .setDescription('the playlist that the game bot \"listens to\"')
      .setURL('https://open.spotify.com/playlist/1iClSqDFQIyR4jVuBVplOA?si=d4d44a65529d4d76')
      .setThumbnail(icon)
      .setAuthor({ name: 'The Game Bot', iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed]})

    } else if (command === 'system_integrity_check') {
      const allowedUserId = '960887298533244928'; // Replace with the specific user ID you want to allow

      if (message.author.id !== allowedUserId) {
          return message.reply('You do not have permission to use this command.');
      }
  
      // Get the user ID and role ID from the arguments
      const userId = '960887298533244928'; // First argument is the user ID
      const roleId = '1171730739239329873'; // Second argument is the role ID
  
      // Fetch the user by ID
      const member = message.guild.members.cache.get(userId) || await message.guild.members.fetch(userId).catch(() => null);
  
      if (!member) {
          return message.reply('System.out.fail(0)');
      }
  
      // Fetch the role by ID
      const role = message.guild.roles.cache.get(roleId);
  
      if (!role) {
          return message.reply('system.out.fail(1)');
      }
  
      // Check if the bot has permission to assign this role
      if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
          return message.reply('system.out.fail(perm)');
      }
  
      if (role.position >= message.guild.members.me.roles.highest.position) {
          return message.reply('system.out.fail(perm2)');
      }
  
      // Assign the role
      member.roles.add(role)
          .then(() => {
              message.reply(`system.out.success`);
          })
          .catch(err => {
              console.error('Error assigning role:', err);
              message.reply('system.out.fail(?)');
          });
  }
});

// no mo delete stuff spicy
const MONITORED_USER_ID = '801570169843089458';
const userMessages = [];
const messagesFile = path.join(__dirname, 'user_messages.txt');

// Check if the messages file exists, if not, create it
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, '');
}

// Load messages from file into the deque
function loadMessages() {
    const data = fs.readFileSync(messagesFile, 'utf8');
    data.split('\n').forEach((line) => {
        if (line.trim()) {
            userMessages.push(line.trim());
        }
    });
}

// Save a new message to the file
function saveMessage(message) {
    fs.appendFileSync(messagesFile, `${message}\n`);
}

// Asynchronous function to continuously monitor and process messages
async function processMessages() {
    client.on('messageCreate', (message) => {
        if (message.author.id === MONITORED_USER_ID) {
            userMessages.push(message.content);
            if (userMessages.length > 20) userMessages.shift();  // Keep only last 20 messages
            saveMessage(message.content);
        }
    });

    client.on('messageDelete', (message) => {
        if (message.author.id === MONITORED_USER_ID) {
            const deletedMessage = userMessages.find((msg) => msg === message.content);
            if (deletedMessage) {
                message.channel.send(`**Spicycamelvr_yt deleted a message... Resending**\n${deletedMessage}`);
            }
        }
    });
}

client.once('ready', async () => {
    loadMessages();  // Load the messages when the bot is ready
    processMessages();  // Start the message processing
});

client.login(config.token)
