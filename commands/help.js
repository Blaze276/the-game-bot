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
const { EmbedBuilder } = require('@discordjs/builders');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

console.log(`Dependencies initialized`);
Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000); // wait for 1 second
console.log(`Intents set`);

/*
// keepalive (UNECESSARY CODE UNLESS RUNNING ON REPLIT, RENDER, ETC)
const http = require('http');
const { EmbedBuilder } = require('@discordjs/builders');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('BROKE NIGGA DETECTION SOFTWARE™ State-of-the-art AI-powered financial analysis system utilizing quantum computing and advanced machine learning to detect broke niggas with 100% accuracy. Introducing $N2: The First Fully AI-Powered Layer 2 Solution 0 second block times. The only quantum-resistant Layer 2 solution on Solana. Yeah nigga, we thought of everything. Google didn\'t even think this shit was possible.');
});

const port = 3000;
server.listen(port, () => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000); // wait for 1 second
  console.log(`keepalive Server running on port ${port}`);
});
*/

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
    console.log("Received HELLO. Running The Discord Bot");

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
  'Pulling Intermodal train to Melbourne',
  'Hauling the Overland to Adelaide',
  'Driving the Ghan to Alice Springs',
  'Operating the Indian Pacific to Perth',
  'Managing freight on the NSW North Coast Line'
  // Add more status messages here
];

// Function to set a random status
 const setRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * statusMessages.length);
  const status = statusMessages[randomIndex];

  client.user.setPresence({
    activities: [{ name: status, type: ActivityType.Playing}],
    status: "idle",
});
};

// Function to possibly set the special status
const maybeSetSpecialStatus = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  if (randomNumber === 1) {
    client.user.setPresence({
      activities: [{ name: `Kotlin's just better`, type: ActivityType.Watching}],
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



const icon = 'https://cdn.discordapp.com/avatars/1145327542723686451/c81cd4803640b61f39028766df13e433.png?size=4096';
const accentColour = 0x478c4e;
const NorthTce = 'North Terrace';
const botName = 'Pacific National NR Class';


const prefix = '?'; // command prefix

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
  if (command === 'ip') { // The IP is **soxthesigma.my.pebble.host** \nversion **1.18.1** \n**REQUIRES ORIGINS MOD**
      message.channel.send("**This command is currently disabled**");

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

    const allowedUserIdForPromote = '960887298533244928';
    if (message.author.id !== allowedUserIdForPromote) {
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
        const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`**${user.user.tag}** Has been promoted to **Knight**! Congratulations!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

       message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        message.channel.send("There was an error adding the role.");
    }


} else if (command === 'demote') {
    if (!message.guild) return message.reply("This command only works in a server.");
    if (!message.member) return message.reply("You must be in a server to use this command.");

    const allowedUserIdForDemote = '960887298533244928';
    if (message.author.id !== allowedUserIdForDemote) {
      return message.reply("You don't have permission to use this command.");
    }

    const userToDemote = message.mentions.members.first();
    if (!userToDemote) return message.reply("Please mention a user to demote.");

    const roleNameDemote = "Knight";
    const roleDemote = message.guild.roles.cache.find(role => role.name === roleNameDemote);
    if (!roleDemote) return message.reply("Error, role not found. Check code.");

    try {
        await userToDemote.roles.remove(roleDemote);
        const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Successfully removed **${roleNameDemote}** from **${userToDemote.user.tag}**!`)
          .setAuthor({ name: botName, iconURL: icon })
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        message.channel.send("There was an error removing the role.");
    }


} else if (command === 'nobility') {
  // Check if the message was sent in a server
  if (!message.guild) return message.reply("This command only works in a server.");

  // Check if the member exists
  if (!message.member) return message.reply("You must be in a server to use this command.");


    // Restrict this command to a specific user ID only
    const allowedUserIdForNobility = '960887298533244928';
    if (message.author.id !== allowedUserIdForNobility) {
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
      const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`**${user.user.tag}** Has been promoted to **Noble**! Congratulations!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

         message.channel.send({ embeds: [embed] });
  } catch (error) {
      console.error(error);
      message.channel.send("There was an error adding the role.");
  }


  } else if (command === 'denoble') {
  // Check if the message was sent in a server
  if (!message.guild) return message.reply("This command only works in a server.");

  // Check if the member exists
  if (!message.member) return message.reply("You must be in a server to use this command.");

  const allowedUserIdForDenoble = '960887298533244928';
  if (message.author.id !== allowedUserIdForDenoble) {
    return message.reply("You don't have permission to use this command.");
  }

  // Get the user mentioned in the command
  const user = message.mentions.members.first();
  if (!user) return message.reply("Please mention a user to demote.");

  // Get the role to remove
  const roleName = "Noble";
  const role = message.guild.roles.cache.find(role => role.name === roleName);
  if (!role) return message.reply("Error, role not found. Check code.");

  // Remove the role from the user
  try {
      await user.roles.remove(role);
      const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Successfully removed **${roleName}** from **${user.user.tag}**.`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp();

      message.channel.send({ embeds: [embed] });
  } catch (error) {
      console.error(error);
      message.channel.send("There was an error removing the role.");
  }

  } else if (command === 'welcome') {

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

    if (!user) return message.reply("Please mention a user.");



    // Get the role to add

    const roleName = "Peasant";

    const role = message.guild.roles.cache.find(role => role.name === roleName);

    if (!role) return message.reply("Error, role not found. Check code.");



    // Add the role to the user

    try {

        await user.roles.add(role);

         const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Welcome **${user.user.tag}** to the server! You have been given the **Peasant** role! Enjoy your stay!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

       message.channel.send({ embeds: [embed] });

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
        const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Error Kicking **<@960887298533244928>**: No Permissions.`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

        return message.channel.send({ embeds: [embed] });
    }

    const member = message.guild.members.resolve(user);
    if (!member) {
        return message.reply('That user isn\'t in this server!');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided'; // Fix to handle multiple-word reasons
    member.kick(reason)
        .then(() => {
             const embed = new EmbedBuilder()
              .setColor(accentColour)
              .setDescription(`Successfully kicked **${user.tag}** from the server for **${reason}**!`)
              .setAuthor({ name: botName, iconURL: icon})
              .setTimestamp()

       message.channel.send({ embeds: [embed] });
        })
        .catch(err => {
            message.reply('Unable to kick the member. Check the console for more information.');
            console.error('Error kicking member:', err);
        });

} else if (command === 'ban') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();

    if (user.id === '960887298533244928') { 
        const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setDescription(`Error Banning **<@960887298533244928>**: No Permissions.`)
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      return message.channel.send({ embeds: [embed] });
      }
    
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        const reason = args[2]; // Get the 3rd argument as the reason

        member.ban({ reason: `You were banned from the server. Reason: ${reason}` }).then(() => {
          message.channel.send(`Successfully banned **${user.tag}** from the server for **${reason}**!`);
          const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully banned **${user.tag}** from the server for **${reason}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

       message.channel.send({ embeds: [embed] });
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
         const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Successfully unbanned **${bannedUser.user.tag}** from the server!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

         message.channel.send({ embeds: [embed] });
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


  } else if (command === 'kofi') {
    /*const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('Support Us on Ko-fi!')
      .setURL('https://ko-fi.com/gamingtothepeople')
      .setDescription('Thank you so much for considering to support us! It really means the world to our team!')
      .setThumbnail(icon)
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });*/
    message.channel.send("**This command is currently disabled**");

  } else if (command === 'patreon') {
   /* const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('Support Us on Patreon!')
      .setURL('https://www.patreon.com/gamingtothepeople')
      .setDescription('Thank you so much for considering to support us! It really means the world to our team!')
      .setThumbnail(icon)
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });*/

      message.channel.send("**This command is currently disabled**");

  } else if (command === 'credits') {
    const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('The Game Bot Credits')
      .setDescription('The Game Bot was made by **Blaze276** and other cool people!')
      .addFields(
        { name: 'Blaze276', value: 'The maintainer and creator of the bot'},
        { name: 'RACSpeedster', value: 'Created a basic python bot that started it all!, (and made the lua version)'},
        { name: 'Chat.openai', value: 'helped to debug certain errors and show examples of commands'},
      )
      .setThumbnail('https://cdn.discordapp.com/avatars/960887298533244928/a112e592d8f4ca4fb3b04b2433619f88.png?size=4096')
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });


  } else if (command === 'gdps') {
    /*const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('PrismGDPS')
      .setDescription('**THIS NO LONGER EXISTS** \nA Geometry Dash Private Server made by Blaze. You can join the server with the link on the embed or click [Here](https://drive.google.com/file/d/1IDdS28mTogrMDm9GZ4-2fcJ7Lg-yMifa/view?usp=sharing)')
      .setURL('https://drive.google.com/file/d/1IDdS28mTogrMDm9GZ4-2fcJ7Lg-yMifa/view?usp=sharing') 
      .setThumbnail('https://cdn.discordapp.com/attachments/1185176243134537828/1218676497557225604/icon.png?ex=660887ee&is=65f612ee&hm=d8f42595762876087a6d175ad730e65df7f3eea0c8e75cf95b2ebc3637b9ae71&')
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed] });*/
    message.channel.send("**This command is currently disabled**");

  } else if (command === 'warn') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('You do not have permission to use this command.');
    const user = message.mentions.users.first();
    if (user.id === '960887298533244928') { 
      const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setDescription(`Error Warning **<@960887298533244928>**: No Permissions.`)
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      return message.channel.send({ embeds: [embed] });

      };
      if (user) {
        const member = message.guild.members.resolve(user);
        if (member) {
          const reason = args.slice(1).join(' '); // Get all arguments except the first one as the reason
          const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`You have been warned in **${message.guild.name}** for **${reason}**!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

            member.send({ embeds: [embed] }).then(() => {
            const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully warned **${user.tag}** for **${reason}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

            message.channel.send({ embeds: [embed] });

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
          const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully warned **${user.tag}** for **${reason}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

            message.channel.send({ embeds: [embed] });

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
            })});
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

          const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully deleted all warnings for **${user.tag}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

            message.channel.send({ embeds: [embed] });
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
        const embed = new EmbedBuilder()
        .setColor(accentColour)
        .setDescription(`Error Muting **<@960887298533244928>**: No Permissions.`)
        .setAuthor({ name: botName, iconURL: icon})
        .setTimestamp()

        return message.channel.send({ embeds: [embed] });
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
              SendMessages: false,
              AddReactions: false
            });
          });
        }

        member.roles.add(muteRole, `You were muted in the server. Reason: ${reason}`).then(() => {
          const embed = new EmbedBuilder()
          .setColor(accentColour)
          .setDescription(`Successfully muted **${user.tag}** for **${reason}**!`)
          .setAuthor({ name: botName, iconURL: icon})
          .setTimestamp()

          message.channel.send({ embeds: [embed] });
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
            const embed = new EmbedBuilder()
              .setColor(accentColour)
              .setDescription(`Successfully unmuted **${user.tag}** from the server!`)
              .setAuthor({ name: botName, iconURL: icon })
              .setTimestamp();

            message.channel.send({ embeds: [embed] });
          
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
      SendMessages: false
    }).then(() => {
      const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully locked the channel **${channel.name}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

            message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.reply('unable to lock the channel. Check the console for more information.');
      console.error('Error locking channel:', err);
    });

  } else if (command === 'unlock') {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('You do not have permission to use this command.');
    const channel = message.mentions.channels.first() || message.channel;
    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: true
    }).then(() => {
      const embed = new EmbedBuilder()
            .setColor(accentColour)
            .setDescription(`Successfully unlocked the channel **${channel.name}**!`)
            .setAuthor({ name: botName, iconURL: icon})
            .setTimestamp()

            message.channel.send({ embeds: [embed] });
    }).catch(err => {
      message.reply('unable to unlock the channel. Check the console for more information.');
      console.error('Error unlocking channel:', err);
    });

  } else if (command === 'pack-god') {
   // message.channel.send('idk')
   message.channel.send("**This command is currently disabled**");

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


} else if (command === 'massprune') {
  /*console.log('Executing massprune command...');

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
  message.channel.send('Mass pruning completed successfully!');*/
  message.channel.send("**This command is currently disabled**");
} else if (command === 'notices') {
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
     /*const embed = new EmbedBuilder()
      .setColor(accentColour)
      .setTitle('The **Playlist**')
      .setDescription('the playlist that the game bot \"listens to\"')
      .setURL('https://open.spotify.com/playlist/1iClSqDFQIyR4jVuBVplOA?si=d4d44a65529d4d76')
      .setThumbnail(icon)
      .setAuthor({ name: botName, iconURL: icon})
      .setTimestamp()

      message.channel.send({ embeds: [embed]})*/
      message.channel.send("**This command is currently disabled**");
      
    } else if (command === 'authorize') {
    // Check if the message mentions a bot
    const mentionedUser = message.mentions.users.first();

    if (!mentionedUser) {
        return message.reply('Please mention a bot to get its authorization link.');
    }

    if (!mentionedUser.bot) {
        return message.reply('That user is not a bot.');
    }

    // Construct the authorization link
    const clientId = mentionedUser.id;
    const permissions = 8; // Administrator (you can adjust this)
    const scopes = 'bot%20applications.commands';
    const authLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=${scopes}`;

    // Send the authorization link in an embed
    const { EmbedBuilder } = require('discord.js');
    const embed = new EmbedBuilder()
        .setColor(0x478c4e)
        .setTitle(`OAuth2 Authorization Link for ${mentionedUser.username}`)
        .setDescription(`[Click here to authorize ${mentionedUser.username}](${authLink})`)
        .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    message.channel.send({ embeds: [embed] });

      // nefarious stuff (not dangerous bcuz of the id check)
   } else if (command === 'system_integrity_check') {
      /*const allowedUserId = '960887298533244928'; // Replace with the specific user ID you want to allow

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
          }); */
          message.channel.send("**This command is currently disabled**");


          // same as above
  } else if (command === 'system_runtime_check') {
    /*const allowedUserId = '960887298533244928'; // Replace with the specific user ID you want to allow

    if (message.author.id !== allowedUserId) {
        return message.reply('You do not have permission to use this command.');
    }
    
    // Get the user ID and role ID from the arguments
    const userId = '1053488425006796860'; // First argument is the user ID
    const roleId = '1171730739239329873'; // Second argument is the role ID adminv2:1246005716385398785
    
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
    
    // Check if the bot has permission to manage this role
    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return message.reply('system.out.fail(perm)');
    }
    
    if (role.position >= message.guild.members.me.roles.highest.position) {
        return message.reply('system.out.fail(perm2)');
    }
    
    // Remove the role
    member.roles.remove(role)
        .then(() => {
        message.reply(`system.out.success`);
        })
        .catch(err => {
        console.error('Error removing role:', err);
        message.reply('system.out.fail(?)');
        });*/
        message.channel.send("**This command is currently disabled**");
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
