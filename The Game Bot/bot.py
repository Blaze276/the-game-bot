import discord
from discord.ext import commands
import asyncio
import datetime
import time
import random
from config import UWU

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
bot = commands.Bot(command_prefix="?", intents=intents)
start_time = time.time()


# register commands
@bot.event
async def on_message(message):
    await bot.process_commands(message)  # You need this line to process commands


# set bot status
@bot.event
async def on_ready():
    await bot.change_presence(status=discord.Status.idle,
                              activity=discord.Activity(type=discord.ActivityType.listening, name='The Minecraft OST'))
    print(f'Logged in as {bot.user.name} successfully!')
    try:
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(f'nah, no app cmds for you bitch')


# save arguement command that save the last 250 messages when run into the file "argument.txt"
@bot.command()
async def saveargument(ctx):
    message_limit = 250
    try:
        messages = []
        async for msg in ctx.channel.history(limit=message_limit):
            messages.append(msg)

        messages.reverse()  # Reverse the list to print the messages in chronological order

        with open("argument.txt", "w") as file:
            for msg in messages:
                file.write(f"{msg.author.name} ({msg.author.id}): {msg.content}\n")

        file_path = 'argument.txt'
        with open(file_path, 'rb') as file:
            await ctx.send(file=discord.File(file, filename='argument.txt'))

    except Exception as e:
        print(f"An error occurred: {e}")


# sends the Minecraft Server ip in the channel the command was run in
@bot.command()
async def ip(ctx):
    await ctx.send("The IP is; gttpmc.my.pebble.host, JAVA Only!")
    print(f'Someone ran The command ?ip')


# credits command
@bot.command()
async def credits(ctx):
    embed = discord.Embed(
        title="The Game Bot Credits",
        description="These are cool people!",
        color=discord.Color.default()
    )
    embed.add_field(name="@Blaze276", value="For Creating and maintaining the bot", inline=False)
    embed.add_field(name="@RACSpeedster", value="For Providing a basic bot that the game bot was built off of",
                    inline=False)
    embed.set_footer(text="Subscribe on patreon or ko-fi pls i need money.")

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?credits')


@bot.command()
async def dmmess(ctx, user: discord.User, *, message: str):
    founder_role = discord.utils.get(ctx.guild.roles, name="Founder")
    if founder_role in ctx.author.roles:
        try:
            await user.send(message)
            await ctx.send(f"Sent '{message}' to {user.name}'s DM.")
        except discord.Forbidden:
            await ctx.send("I don't have permission to send a DM to that user.")
            print(f'Someone ran the command ?dmmess')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def modapply(ctx):
    embed = discord.Embed(
        title="Mod Form",
        description="Thanks for applying. Please allow at most 48hrs for your mod application to be looked at.",
        color=discord.Color.dark_blue()
    )
    embed.url = "https://forms.gle/euSvwrb6JyoW8cPr8"

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?modapply')


@bot.command()
async def patreon(ctx):
    embed = discord.Embed(
        title="Subscribe to us on Patreon!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(
        url="https://cdn.discordapp.com/attachments/1138942994683269261/1141135170628485120/asset-preview.png")
    embed.url = "https://patreon.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?patreon')


@bot.command()
async def kofi(ctx):
    embed = discord.Embed(
        title="Subscribe to us on Ko-fi!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(url="https://cdn.discordapp.com/attachments/1138942994683269261/1145809835556864091/ko-fi.png")
    embed.url = "https://ko-fi.com/gamingtothepeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?subscribe')


@bot.command()
async def ping(ctx):
    latency = round(bot.latency * 1000)  # Convert to milliseconds and round
    await ctx.send(f'Pong! Bot latency is {latency}ms')
    print(f'Someone ran the command ?ping')


@bot.command()
async def gttpcredits(ctx):
    embed = discord.Embed(
        title="GTTP Credits",
        description="Main contributors to Gaming To The People",
        color=discord.Color.default()
    )
    embed.add_field(name="Blaze276", value="Creating GTTP and organizing the events", inline=False)
    embed.add_field(name="Dork7",
                    value="Helped to test Geyser functionaltity and test the Minecraft servers, one of the Five Musketeers",
                    inline=False)
    embed.add_field(name="RACSpeedster", value="Developing plugins and the arsenal remake for GTTP", inline=False)
    embed.add_field(name="Orangatan banana", value="Helping create the future GTTP roadmap, one of the Five Musketeers",
                    inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?gttpcredits')


@bot.command()
async def say(ctx, *, content: str):
    if ctx.author.guild_permissions.administrator:
        await ctx.send(content)
        print(f'Someone ran the command ?say')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def invite(ctx):
    embed = discord.Embed(
        title="The Game Bot",
        description="You can invite the Game bot here!",
    )
    embed.set_thumbnail(
        url="https://cdn.discordapp.com/avatars/1145327542723686451/aa8e209b03194832e7b3704eef3fd297.png?size=4096")
    embed.url = "https://discord.com/api/oauth2/authorize?client_id=1145327542723686451&permissions=8&scope=bot"
    embed.set_footer(text="The Game Bot by Blaze276.")
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?invite')


@bot.command()
async def mute(ctx, member: discord.Member):
    invoker_roles = [role.name for role in ctx.author.roles]

    if ctx.author.guild_permissions.kick_members:
        # Check if the muted role already exists in the server
        muted_role = discord.utils.get(ctx.guild.roles, name="Muted")

        if not muted_role:
            # If the muted role doesn't exist, create it
            muted_role = await ctx.guild.create_role(name="Muted")
            for channel in ctx.guild.channels:
                await channel.set_permissions(muted_role, send_messages=False)

        # Add the muted role to the specified user
        await member.add_roles(muted_role)
        await ctx.send(f"{member.mention} has been muted.")
    else:
        await ctx.send("You don't have permission to use this command.")
        print(f'Someone ran the command ?mute')


@bot.command()
async def unmute(ctx, member: discord.Member):
    if ctx.author.guild_permissions.kick_members:
        # Check if the muted role exists in the server
        muted_role = discord.utils.get(ctx.guild.roles, name="Muted")

        if muted_role:
            # Remove the muted role from the specified user
            await member.remove_roles(muted_role)
            await ctx.send(f"{member.mention} has been unmuted.")
        else:
            await ctx.send("The Muted role doesn't exist.")
    else:
        await ctx.send("You don't have permission to use this command.")
        print(f'Someone ran the command ?unmute')


@bot.command()
async def kick(ctx, member: discord.Member):
    # Check if the command sender has the necessary permissions to kick members
    if ctx.author.guild_permissions.kick_members:
        await member.kick()
        await ctx.send(f'Kicked {member.display_name} from the server.')
    else:
        await ctx.send("You don't have permission to kick members.")
        print(f'Someone ran the command ?kick')


# NOTICE add new commands to this!
@bot.tree.command(name="help", description="Gets the help menu")
async def help(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Bot Commands",
        description="",
        color=discord.Color.default()
    )
    embed.add_field(name="?ip", value="Gets The Origins Minecraft server IP", inline=False)
    embed.add_field(name="?ipalt", value="Gets The Alternative Minecraft server IP", inline=False)
    embed.add_field(name="?credits", value="Gets the credits for the bot", inline=False)
    embed.add_field(name="?saveargument", value="Saves The last 250 messages to a txt file", inline=False)
    embed.add_field(name="?modapply", value="Gets the link for the Mod application Form", inline=False)
    embed.add_field(name="?patreon", value="Subscribe to Us on Patreon!", inline=False)
    embed.add_field(name="?ping", value="returns the ping of the bot", inline=False)
    embed.add_field(name="?origins", value="Gets a list of all the core origins in the GenisisMC Plugin", inline=False)
    embed.add_field(name="?gttpcredits", value="Gets the credits for Gaming To The People", inline=False)
    embed.add_field(name="?origin", value="Gets Information on a certain Core Origin", inline=False)
    embed.add_field(name="?invite", value="Gets the invite link for the Game bot", inline=False)
    embed.add_field(name="?mute/?unmute", value="Mutes/Unmutes a user", inline=False)
    embed.add_field(name="?kick", value="Kicks a user from the guild", inline=False)
    embed.add_field(name="?kofi", value="Subscribe to Us on Ko-Fi.", inline=False)
    embed.add_field(name="?purge", value="deletes an amount of messages", inline=False)
    embed.add_field(name="?promote/?demote", value="Promotes/Demotes a user to/from the Moderation Team", inline=False)
    embed.add_field(name="?uptime", value="Gets the bots uptime", inline=False)
    embed.add_field(name="?addrole/removerole", value="add/removes a role from a user", inline=False)
    embed.add_field(name="?flip", value="Flip a coin and send the result.", inline=False)
    embed.add_field(name="?roll", value="Roll a dice with optional size parameter.", inline=False)
    embed.add_field(name="?fandom", value="Gets information of specific users", inline=False)
    embed.add_field(name="?github", value="Gets a link to the Game Bot's Github repository", inline=False)
    embed.add_field(name="?forks", value="Gets The Game Bot's Forks to other languages", inline=False)
    embed.add_field(name="?reset", value="sends a message to a user warning them to not break rules", inline=False)
    embed.add_field(name="?shrimp", value="???????", inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /help')


@bot.tree.command(name="patreon", description="Subscribe to us on Patreon!")
async def patreon(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Subscribe to us on Patreon!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(
        url="https://cdn.discordapp.com/attachments/1138942994683269261/1141135170628485120/asset-preview.png")
    embed.url = "https://patreon.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /subscribe')


@bot.command()
async def promote(ctx, member: discord.Member):
    moderation_role = discord.utils.get(ctx.guild.roles, name="Moderation Team")

    if ctx.author.guild_permissions.administrator:
        await member.add_roles(moderation_role)
        await ctx.send(f"{member.mention} has been added to the Moderation Team.")
        print(f'Someone ran the command ?promote')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def demote(ctx, member: discord.Member):
    moderation_role = discord.utils.get(ctx.guild.roles, name="Moderation Team")

    if ctx.author.guild_permissions.administrator:
        await member.remove_roles(moderation_role)
        await ctx.send(f"Removed {member.mention} from the Moderation Team.")
        print(f'Someone ran the command ?demote')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.tree.command(name="credits", description="Gets the credits for the bot")
async def credits(interaction: discord.Interaction):
    embed = discord.Embed(
        title="The Game Bot Credits",
        description="These are cool people!",
        color=discord.Color.default()
    )
    embed.add_field(name="@Blaze276", value="For Creating and maintaining the bot", inline=False)
    embed.add_field(name="@RACSpeedster", value="For Providing a basic bot that the game bot was built off of",
                    inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /credits')


@bot.tree.command(name="ping", description="Gets the bot's Ping")
async def ping(interaction: discord.Interaction):
    latency = round(bot.latency * 1000)  # Convert to milliseconds and round
    await interaction.response.send_message(f'Pong! Bot latency is {latency}ms', ephemeral=True)
    print(f'Someone ran the app command /ping')


@bot.tree.command(name="prefix", description="Gets the bot's prefix for commands")
async def prefix(interaction: discord.Interaction):
    await interaction.response.send_message(f"The Bot Prefix is ?", ephemeral=True)
    print(f'Someone ran the app command /prefix')


@bot.tree.command(name="kofi", description="Subscribe to us on Ko-Fi!")
async def kofi(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Subscribe to us on Ko-fi!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
        color=discord.Color.default()
    )
    embed.set_image(url="https://cdn.discordapp.com/attachments/1138942994683269261/1145809835556864091/ko-fi.png")
    embed.url = "https://ko-fi.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /kofi')


@bot.command()
async def ban(ctx, member: discord.Member, *, reason=None):
    if ctx.author.guild_permissions.ban_members:
        mod_roles = ["Moderation Team", "Founder"]
        for role in member.roles:
            if role.name in mod_roles:
                await ctx.send(f"You can't ban a member with the '{role.name}' role.")
                return

        if member == ctx.author:
            await ctx.send("You can't ban yourself!")
        elif member == bot.user:
            await ctx.send("You can't ban bots!")
        else:
            await member.send(f'You have been banned from {ctx.guild.name} for the following reason: {reason}')
            await member.ban(reason=reason)
            await ctx.send(f'{member.display_name} has been banned for {reason}')
            print(f'Someone ran the command ?ban')
    else:
        await ctx.send("You don't have the necessary permissions to use this command.")


@bot.command()
async def purge(ctx, amt):
    if ctx.author.guild_permissions.administrator:
        await ctx.channel.purge(limit=int(amt) + 1)
        msg = await ctx.send(f"Purged {amt} messages")
        await asyncio.sleep(1)
        await msg.delete()
        print(f'Someone ran the command ?purge')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def uptime(ctx):
    current_time = time.time()
    uptime_seconds = int(current_time - start_time)
    uptime_str = str(datetime.timedelta(seconds=uptime_seconds))
    await ctx.send(f'Uptime: `{uptime_str}`')


@bot.command()
async def addrole(ctx, member: discord.Member, role_name: str):
    role = discord.utils.get(ctx.guild.roles, name=role_name)

    if ctx.author.guild_permissions.administrator:
        if role:
            await member.add_roles(role)
            await ctx.send(f'Added role {role_name} to {member.display_name}')
        else:
            await ctx.send(f'Role {role_name} not found')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def removerole(ctx, member: discord.Member, role_name: str):
    role = discord.utils.get(ctx.guild.roles, name=role_name)

    if ctx.author.guild_permissions.administrator:
        if role and role in member.roles:
            await member.remove_roles(role)
            await ctx.send(f'Removed role {role_name} from {member.display_name}')
        else:
            await ctx.send(f'Role {role_name} not found on {member.display_name}')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def flip(ctx):
    """Flip a coin and send the result."""
    # me when the bobot goes ffffffff
    result = random.choice(["Heads", "Tails"])

    await ctx.send(f"The coin landed on {result}!")
    print(f'Someone ran the command ?flip')


@bot.command()
async def roll(ctx, size: str = "d4"):
    """Roll a dice with optional size parameter."""
    # Parse the size parameter
    if size.lower() in ["d4", "d6", "d8", "d10", "d12", "d20", "d100"]:
        dice_size = int(size[1:])
    else:
        await ctx.send("Invalid dice size. Available sizes: d4, d6, d8, d10, d12, d20, d100")
        return

    # Roll the dice
    result = random.randint(1, dice_size)

    # Send the result to the channel where the command was invoked
    await ctx.send(f"You rolled a {dice_size}-sided dice and got: {result}")


@bot.command()
async def fandom(ctx, option: str):
    if option == 'Blaze276':
        embed = discord.Embed(title="Blaze276",
                              description=f"Blaze276, also known as Taavi Nehemia is the creator and owner of GTTP. he is described as \"Annoying\", \"Bald\", and \"Handsome\", Blaze has also cheated in a Minecraft survival by mining resources with baritone, he is from australia and has lived there for all his life up until the tail end of 2019. He currently resides in Brooklyn, NY. He is decently skilled at coding with python and has made this bot right here.",
                              color=discord.Color.dark_blue())
        embed.add_field(name="Quote:",
                        value="\"Continuity is pretty bloodthirsty, i will admit.\" -Blaze276 talking to almond man about Continuity (netherite axe)",
                        inline=False)
        embed.add_field(name="Age:", value="13, born september 9 2010", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 8th Grade, class of 2024", inline=False)
        embed.add_field(name="Join Date:", value="june 14th 2023", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/avatars/960887298533244928/4da595b6b17eefed26d1c8111f008ed7.png?size=4096")
        await ctx.send(embed=embed)
    elif option == 'Dork7':
        embed = discord.Embed(title="Dork7",
                              description="Dork7, also known as Leevi Nehemia, is a notable member of GTTP and a member of the five musketeers, (preceded by Bl8ze) he is described as \"Funny\",\"Good\", and \"Dork\". He is Blaze276s little Brother",
                              color=discord.Color.gold())
        embed.add_field(name="Quote:",
                        value="\"If your reading this give me 10 dollars\" -dork7 asking for money to buy a minecraft Java edition account",
                        inline=False)
        embed.add_field(name="Age:", value="11, born October 16 2012", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 6th Grade, class of 2026. Formerly PS9",
                        inline=False)
        embed.add_field(name="Join Date:", value="Sometime around July/june", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/avatars/964970830377390140/a_f8de8dc517ddb7a576aed56b90e8d57e.gif?size=4096")
        await ctx.send(embed=embed)
    elif option == 'RACSpeedster':
        embed = discord.Embed(title="RACSpeedster",
                              description="RACSpeedster, also known as Kaleb Prince, is a notable member of GTTP and a co-Developer to The Game Bot and the sole developer of the arsenal remake. he is described as \"Funny\",\"Good\", and \"a coding genius -Blaze276\". He describes himself as the Literal definition of a computer nerd. Got a programming problem? Ask him.",
                              color=discord.Color.red())
        embed.add_field(name="Quote:",
                        value="\"OH NOES!! Line 1730 of A2Client.lua is giving me an error! Oh.. I missed a single character. BLAZE! LOOK AT THIS!!! LOOK AT MY MISTAKE!!!!\" -RACSpeedster telling Blaze about an error in his code",
                        inline=False)
        embed.add_field(name="Age:", value="13, born September 24 2010", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 8th Grade, class of 2024.", inline=False)
        embed.add_field(name="Join Date:", value="june 17 2023", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/avatars/973292238618636369/59bd864a40948444219206c9634db92b.png?size=4096")
        await ctx.send(embed=embed)
    elif option == 'Star':
        embed = discord.Embed(title="Star2080",
                              description="Star2080, also known as Kendall Anderson, is a notable member of GTTP and one of the original Five Musketeers, She is described as \"Playful\",\"Mean\", and \"Cheerful\". She is the best at Minecraft compared to the other users of GTTP, being able to build an amazing looking house (ref: Alt survival) and able to get lots of resources easy. She was accused of X-raying on multiple occasions, mainly by Blaze276. Her best friend is Mary Rippel who was a member of GTTP but later left after Blaze didnt care about a joke she made, then rejoined a time later. She is the second moderator to ever be appointed, (preceded by Orangutang Banana). She was falsely kicked from GTTP when a fake star joined the server",
                              color=discord.Color.og_blurple())
        embed.add_field(name="Quote:",
                        value="um.. help :peeposhorts:... i died with all the elytras -Star talking to Blaze about falling to her death while carrying all of the elytras",
                        inline=False)
        embed.add_field(name="Age:", value="13, born June 4th 2010", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 8th Grade, class of 2024", inline=False)
        embed.add_field(name="Join Date:", value="june 27 2023", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/guilds/1118509755984515092/users/697921517698416762/avatars/d228db2c1093f9eef8939500887717e0.png?size=4096")
        await ctx.send(embed=embed)
    elif option == 'Almondman':
        embed = discord.Embed(title="Almond man the wise",
                              description="almond man the wise, also known as [removed] is a member of GTTP. He is described as \"adventurous\",\"annoying\",\"a btd6 pro -dork7\". He is siblings with Bl8ze and is the only Rippel left in GTTP. He was part of the original origins server and is an original musketeer. He had a tantrum about Bl8zes page to the fandom page and threatened to report Blaze276 for having a page about Bl8ze",
                              color=discord.Color.default())
        embed.add_field(name="Quote:",
                        value="\"Loser alert... fr tho\" -almond telling live_laugh_leave_me_alone that he was a loser",
                        inline=False)
        embed.add_field(name="Age:", value="11, born unknown 2012", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 6th Grade, class of 2026.", inline=False)
        embed.add_field(name="Join Date:", value="Sometime around July/june", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/avatars/1044740815743897730/7f4cea419723b26d0de0f68d268fea72.png?size=4096")
        await ctx.send(embed=embed)
    elif option == 'OrangutanBanana':
        embed = discord.Embed(title="Orangutang Banana",
                              description="Orangutang Banana, also known as Jaxx Marquez is a notable member of GTTP. He is described as \"uplifting\",\"Playful\",\"legend -dork7\". He is the first ever moderator on GTTP history, (succeded by Star2080) and the fifth member of the current Musketeers. He helped to create the future GTTP roadmap.",
                              color=discord.Color.dark_blue())
        embed.add_field(name="Quote:",
                        value="\"it would be funny tho\" -Orangutang Banana telling Racspeedster that keeping a bug in the arsenal remkae would be funny",
                        inline=False)
        embed.add_field(name="Age:", value="14, born september 24 2009", inline=False)
        embed.add_field(name="School:", value="removed as per request", inline=False)
        embed.add_field(name="Join Date:", value="july 15 2023", inline=False)
        embed.add_field(name="leave date: N/A", value="", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/avatars/700515277904805989/630859fe042250736e9fe8c5f4541c29.png?size=4096")
        await ctx.send(embed=embed)
    elif option == 'Bl8ze360':
        embed = discord.Embed(title="Bl8ze360",
                              description="Bl8ze is a notable member of gttp. He was an original member of the five musketeers (suceeded by dork7), and played in the original Gttp (now ALT) Survival server. He is one of the few members to get their own custom role in the discord server (later removed after testing Blaze276). Bl8ze left Gttp in july of 2023 and rejoined in september on the grounds of \"I just want to use the voice channels and play the minecraft server\", since that statement he has done much more than that, he then left again on the 13 of october and preceded to get his minecraft server playerdata deleted and his discord and minecraft accounts banned from the respective servers, Due to bullying users and verbally abusing members. He is \"Spiteful\", \"Jealous\", and \"a psychologically messed up person\". He and his shenanegans have caused a new rule to be added to gttp stating \"no messages or forwarded messages from a user called Bl8ze360, will result in warn\"- rule no. 9. He is a",
                              color=discord.Color.light_grey())
        embed.add_field(name="Quote:",
                        value="\"yeah..., cuz im just so cool.\" -Bl8ze talking to Blaze about him \"being cool\".",
                        inline=False)
        embed.add_field(name="Age:", value="13, born [unknown] 2010", inline=False)
        embed.add_field(name="School:", value="Urban assembly unison school, 8th Grade, class of 2024", inline=False)
        embed.add_field(name="Join Date:", value="Sometime around september", inline=False)
        embed.add_field(name="leave date: N/A", value="left at one point but then rejoined", inline=False)
        embed.set_thumbnail(
            url="https://cdn.discordapp.com/attachments/1118509756492021802/1162735257074794536/7583a56c23b85a3f32d91e89e17c5838.png?ex=653d0497&is=652a8f97&hm=5702135695dd02d07f185386782af9251c96fe5bb5f2e167fca9053afee0e6ce&")
        await ctx.send(embed=embed)
    else:
        embed = discord.Embed(title="Invalid Option",
                              description="only certain users with a server history are listed. More will be added soon... DONT FORGET TO CAPITOLIZE THE FIRST LETTER OF EACH USER!",
                              color=discord.Color.default())
        msg = await ctx.send(embed=embed)
        await asyncio.sleep(5)
        await msg.delete()


@bot.command()
async def dmoffer(ctx, user: discord.User):
    founder_role = discord.utils.get(ctx.guild.roles, name="Founder")
    if founder_role in ctx.author.roles:
        try:
            await user.send(
                f"Hello {user.name}! I am here to offer you a FREE week of Gaming to the people Premium. To claim this, either DM Blaze276 with a screenshot of this message or go to https://patreon.com/GamingToThePeople and claim your free trial.")
            msg = await ctx.send(f"Sent offer to {user.name}'s DM.")
            await asyncio.sleep(1)
            await msg.delete()
        except discord.Forbidden:
            msg = await ctx.send("I don't have permission to send a DM to that user.")
            await asyncio.sleep(1)
            await msg.delete()
            print(f'Someone ran the command ?dmoffer')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def dm(ctx, user: discord.User):
    founder_role = discord.utils.get(ctx.guild.roles, name="Founder")
    if founder_role in ctx.author.roles:
        try:
            await user.send(
                f"Hello {user.name}. I am here to let you know that your Gaming To The People Premium subscription is about to expire. If you would like to support GTTP again you can head to either https://patreon.com/GamingToThePeople or https://ko-fi.com/gamingtothepeople or run ?patreon, ?kofi in the discord server")
            msg = await ctx.send(f"sent message to {user.name}s DM.")
            await asyncio.sleep(1)
            await msg.delete()
        except discord.Forbidden:
            msg = await ctx.send(f"I dont have permission to DM this user.")
            await asyncio.sleep(1)
            await msg.delete()
            print(f'Someone ran the command ?dm')
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def github(ctx):
    embed = discord.Embed(
        title="The Game Bot GitHub repo",
        description="The Game Bots official github page! contribute to our bot and get rewards! (python and discord.py)",
    )
    embed.url = "https://github.com/Blaze276/the-game-bot-python"
    embed.set_thumbnail(
        url="https://cdn.discordapp.com/attachments/965008664815624192/1149436544223019140/Untitled.png")
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?github')


@bot.command()
async def rizz(ctx):
    await ctx.send("wow")
    await asyncio.sleep(2)
    await ctx.send("wowie345")


@bot.command()
async def forks(ctx):
    embed = discord.Embed(
        title="The Game Bot Forks",
        description="Forks of the Game Bot in different languages"
    )
    embed.add_field(name="The Game Bot LUA", value="A fork of the game bot to lua. incomplete")
    embed.add_field(name="The Game Bot Java", value="A fork of the game bot to Java. work in progress")
    await ctx.send(embed=embed)


@bot.command()
async def reset(ctx, user: discord.User):
    if ctx.author.guild_permissions.kick_members:
        await ctx.send(f"{user} was reset")
        embed = discord.Embed(
            title="Discipline Alert",
            description="You have been reset. Please remember to uphold the guild rules and guidelines.",
            color=discord.Color.red()
        )
        embed.add_field(name="Warning Number 1",
                        value="No action will be taken, but you will be muted until you acknowledge this message. (DM your server owner or moderator with a screenshot.)")
        embed.add_field(name="Warning Number 2", value="you will be muted for 30 minutes.")

        try:
            await user.send(embed=embed)
        except discord.Forbidden:
            await ctx.send(
                "I couldn't send a direct message to the user. Make sure the user allows DMs from this server or has a common server with the bot.")
        except Exception as e:
            await ctx.send(f"An error occurred: {e}")
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def devmode(ctx):
    if ctx.author.guild_permissions.administrator:
        await bot.change_presence(status=discord.Status.do_not_disturb,
                                  activity=discord.Activity(type=discord.ActivityType.listening,
                                                            name='Developer Mode active!'))
        print(f'Logged in as {bot.user.name} in dev mode successfully!')
        await ctx.send(f"Logged in as {bot.user.name} in dev mode successfully! Reboot to change back.")
    else:
        await ctx.send("You do not have permission to use this command.")


@bot.command()
async def shrimp(ctx):
    await ctx.send(f"https://cdn.discordapp.com/emojis/1147698564575809566.webp?size=128&quality=lossless")

@bot.command()
async def sponsored(ctx):
    await ctx.send("**You know the type**")
    await ctx.send("https://cdn.discordapp.com/attachments/1119586233161621525/1167639789693042788/IMG_6849.jpg?ex=654edc4b&is=653c674b&hm=7bbe4374d3ad94cb216f617c15621e8ecfd4d5d3b3be622977934f242215ac56&")
    await asyncio.sleep(1)
    await ctx.send("[_Check out Brandist!_](https://www.youknowthetype.com)")


# Bot token.
bot.run(UWU)
