import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="?", intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

@bot.event
async def on_message(message):
    await bot.process_commands(message)  # You need this line to process commands
    await bot.change_presence(status=discord.Status.idle, activity=discord.Activity(type=discord.ActivityType.listening, name='The Minecraft OST'))

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

@bot.command()
async def ip(ctx):
    await ctx.send("The IP is;\nJava: Gttporigins.minehut.gg\nBedrock: gttporigins.bedrock.minehut.gg")

@bot.command()
async def ipalt(ctx):
    await ctx.send("The IP is;\nJava: gamingttppl.my.pebble.host\nBedrock: 54.39.13.158 port:8048")

TOKEN = 'MTExOTU4Njg4OTU1NzYyNjk0MA.Gmf9BD.vNS2CJEL5K4M4ZfrUeKNQfFU_LoRpWi2vnorvY'
bot.run(TOKEN)