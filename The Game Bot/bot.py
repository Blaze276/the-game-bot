import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="?", intents=intents)

# register commands
@bot.event
async def on_message(message):
    await bot.process_commands(message)  # You need this line to process commands
    
# set bot status
@bot.event
async def on_ready():
    await bot.change_presence(status=discord.Status.idle, activity=discord.Activity(type=discord.ActivityType.listening, name='The Minecraft OST'))
    print(f'Logged in as {bot.user.name} successfully!')

# save arguement command that save the last 200 messages when run into the file "argument.txt"
@bot.command()
async def saveargument(ctx):
    MESSAGE_LIMIT = 200
    try:
        messages = []
        async for msg in ctx.channel.history(limit=MESSAGE_LIMIT):
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

# sends the Minecraft Origins Server ip in the channel the command was run in
@bot.command()
async def ip(ctx):
    await ctx.send("The IP is;\nJava: Gttporigins.minehut.gg\nBedrock: gttporigins.bedrock.minehut.gg")
    print(f'Someone ran The command ?ip')

# same as the one above but with a different IP
@bot.command()
async def ipalt(ctx):
    await ctx.send("The IP is;\nJava: gamingttppl.my.pebble.host\nBedrock: 54.39.13.158 port:8048")
    print(f'Someone ran the command ?ipalt')

# credits command
@bot.command()
async def credits(ctx):
    embed = discord.Embed(
        title="The Game Bot Credits",
        description="These are cool people!",
        color=discord.Color.pink()
    )
    embed.add_field(name="@Blaze276", value="For Creating and maintaining the bot", inline=False)
    embed.add_field(name="@RACSpeedster", value="For Providing a basic bot that the game bot was built off of", inline=False)
    embed.set_footer(text="Subsribe on patreon pls i need money.")
    
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?credits')

@bot.command()
async def commands(ctx):
    embed = discord.Embed(
        title="Bot Commands",
        description="",
        color=discord.Color.pink()
    )
    embed.add_field(name="?ip", value="Gets The Origins Minecraft server IP", inline=False)
    embed.add_field(name="?ipalt", value="Gets The Alternative Minecraft server IP", inline=False)
    embed.add_field(name="?credits", value="Gets the credits for the bot", inline=False)
    embed.add_field(name="?saveargument", value="Saves The last 200 messages to a txt file", inline=False)
    embed.set_footer(text="")

    await ctx.send(embed=embed)
    print(f'Someone ran the commands ?commands')

# Bot token. DO NOT TOUCH!
TOKEN = 'MTExOTU4Njg4OTU1NzYyNjk0MA.Gmf9BD.vNS2CJEL5K4M4ZfrUeKNQfFU_LoRpWi2vnorvY'
bot.run(TOKEN)
