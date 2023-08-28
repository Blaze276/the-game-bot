import discord
from discord.ext import commands
from discord import app_commands

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
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
    try:
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(f'nah, no app cmds for you bitch')

# save arguement command that save the last 250 messages when run into the file "argument.txt"
@bot.command()
async def saveargument(ctx):
    MESSAGE_LIMIT = 250
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
    await ctx.send("The IP is;\nJava: gttporigins.my.pebble.host\nBedrock: 54.39.13.158 port: 8048")
    print(f'Someone ran The command ?ip')

# same as the one above but with a different IP
@bot.command()
async def ipalt(ctx):
    await ctx.send("The IP is;\nJava: GamingTTppl.minehut.gg\nBedrock: GamingTTppl.bedrock.minehut.gg")
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
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")
    
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?credits')

# NOTICE add new commands to this!
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
    embed.add_field(name="?saveargument", value="Saves The last 250 messages to a txt file", inline=False)
    embed.add_field(name="?modapply", value="Gets the link for the Mod application Form", inline=False)
    embed.add_field(name="?subscribe", value="Subscribe to Us on patreon!", inline=False)
    embed.add_field(name="?ping", value="returns the ping of the bot", inline=False)
    embed.add_field(name="?origins", value="Gets a list of all the core origins in the GenisisMC Plugin", inline=False)
    embed.add_field(name="?gttpcredits", value="Gets the credits for Gaming To The People", inline=False)
    embed.add_field(name="?origin", value="Gets Information on a certain Core Origin", inline=False)
    embed.add_field(name="?invite", value="Gets the invite link for the Game bot", inline=False)
    embed.add_field(name="?mute/?unmute", value="Mutes/Unmutes a user", inline=False)
    embed.add_field(name="?kick", value="Kicks a user from the guild", inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await ctx.send(embed=embed)
    print(f'Someone ran the commands ?commands')

@bot.command()
async def dmmess(ctx, user: discord.User, *, message: str):
    try:
        await user.send(message)
        await ctx.send(f"Sent '{message}' to {user.name}'s DM.")
    except discord.Forbidden:
        await ctx.send("I don't have permission to send a DM to that user.")
        print(f'Someone ran the command ?dmmess')

@bot.command()
async def modapply(ctx):
    embed = discord.Embed(
        title="Mod Form",
        description="Thanks for applying. Please allow at most 48hrs for your mod application to be looked at.",
        color=discord.Color.dark_green()
    )
    embed.url = "https://forms.gle/euSvwrb6JyoW8cPr8"

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?modapply')

@bot.command()
async def patreon(ctx):
    embed=discord.Embed(
        title="Subscribe to us on Patreon!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(url="https://cdn.discordapp.com/attachments/1138942994683269261/1141135170628485120/asset-preview.png")
    embed.url = "https://patreon.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await ctx.send(embed=embed)
    print(f'Someone ran the command ?patreon')

@bot.command()
async def kofi(ctx):
    embed=discord.Embed(
        title="Subscribe to us on Ko-Fi!",
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
async def origins(ctx):
    embed = discord.Embed(
        title="Core Origins",
        description="The Core Origins Included in GTTP Origins",
        color=discord.Color.pink()
    )
    embed.add_field(name="Human", value="Nothing special here.", inline=False)
    embed.add_field(name="Avian", value="Not quite a bird", inline=False)
    embed.add_field(name="Arachnid", value="You were tired of being thrown out by humans. Then one day you fell into some radiation...", inline=False)
    embed.add_field(name="Elytrian", value="Is it a bird? Is it a plane?? Oh, it is a bird.", inline=False)
    embed.add_field(name="Shulk", value="**BOX.**", inline=False)
    embed.add_field(name="Feline", value="You got 9 lives. ish", inline=False)
    embed.add_field(name="Enderian", value="Escaping the end you roam the overworld, teleporting from horizon to horizon.", inline=False)
    embed.add_field(name="Merling", value="Blub.", inline=False)
    embed.add_field(name="Blazeborn", value="When you forget to put a door on your nether portal...",inline=False)
    embed.add_field(name="Phantom", value="I could swear I saw a player pop out of the ground?? - Probably Powershot300.", inline=False)
    embed.add_field(name="Starborne", value="Star2080's origin (real)", inline=False)
    embed.add_field(name="Allay", value="A bit less annoying than a flying rat (and much more cute)", inline=False)
    embed.add_field(name="Rabbit", value="WHO'S BEEN EATING MY CARROTS - FrozyCube.")
    embed.add_field(name="Bumblebee", value="Buzzy Boi.", inline=False)
    embed.add_field(name="Sculkling", value="Not the wardens best friend, but they'll do.", inline=False)
    embed.add_field(name="Creep", value="Hisssssss, BOOM! TazerFaceLord Was blown up by Blaze276.", inline=False)
    embed.add_field(name="Slimeling", value="Boing... Boing.. Boing. Boing! BOING! **BOING!**", inline=False)
    embed.add_field(name="Piglin", value="If you don't have any gold on you stay faarrr away, like another dimension far away.", inline=False)
    embed.url = "http://genesismc.duckdns.org/origins.html"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?origins')

@bot.command()
async def gttpcredits(ctx):
    embed = discord.Embed(
        title="GTTP Credits",
        description="Main contributors to Gaming To The People",
        color=discord.Color.pink()
    )
    embed.add_field(name="Blaze276", value="Creating GTTP and organizing the events",inline=False)
    embed.add_field(name="Dork7", value="Helped to test Geyser functionaltity and test the Minecraft servers, one of the Five Musketeers", inline=False)
    embed.add_field(name="RACSpeedster", value="Developing plugins and the arsenal remake for GTTP",inline=False)
    embed.add_field(name="Orangatan banana", value="Helping create the future GTTP roadmap and helping around in lots of little ways", inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")
    await ctx.send(embed=embed)
    print(f'Someone ran the command ?gttpcredits')

@bot.command()
async def say(ctx, *, content: str):
    await ctx.send(content)
    print(f'Someone ran the command ?say')

@bot.command()
async def origin(ctx, option: str):
    if option == 'Human':
        embed = discord.Embed(title="Human", description="Nothing special here.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="Nothing: Enough said.", inline=False)
        embed.add_field(name="Negative Powers:", value="Still nothing: Still enough said.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Avian':
        embed = discord.Embed(title="Avian", description="Not quite a bird", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="Featherweight: You fall as gently to the ground as a feather would, unless you shift.\n Tailwind: You are a little quicker on foot than others.\n Oviparous: Whenever you wake up in the morning, you lay an egg.", inline=False)
        embed.add_field(name="Negative Powers:", value="Vegetarian: You can't digest any meat.\n Fresh Air: When sleeping, your bed needs to be at an altitude of at least 100 blocks.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Arachnid':
        embed = discord.Embed(title="Arachnid", description="You were tired of being thrown out by humans. Then one day you fell into some radiation...", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="SpiderMan: You can climb up walls, but not when its raining (hold shift).\n Weaver: You hinder your foes with cobwebs upon attacking them.", inline=False)
        embed.add_field(name="Negative Powers:", value="Fragile: You have 3 less hearts.\n Tiny Carnivore: You can only eat meat.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Elytrian':
        embed = discord.Embed(title="Elytrian", description="Is it a bird? Is it a plane?? Oh, it is a bird.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="Winged: You have Elytra wings without needing to equip any (tap shift when in air).\n Gift of the Winds: Every 30 seconds, you can launch yourself 20 blocks in the air.\n Aerial Combatant: You deal substantially more damage while in Elytra flight.", inline=False)
        embed.add_field(name="Negative Powers:", value="Claustrophobia: Being somewhere with a low ceiling for too long will weaken you.\n Need for Mobility: You cannot wear any heavy armour with protection values higher than chainmail.\n Brittle Bones: You take more damage from falling and flying into blocks.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Shulk':
        embed = discord.Embed(title="Shulk", description="**BOX.**", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="Hoarder: You have 9 extra inventory slots that you keep upon death.\n Sturdy Skin: Your skin has natural protection.\n Strong Arms: You can break natural stones without a pickaxe.", inline=False)
        embed.add_field(name="Negative Powers:", value="Unwieldy: You cannot hold a shield.\n Large Appetite: You exhaust much quicker than others.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Feline':
        embed = discord.Embed(title="Feline", description="You got 9 lives. ish", color=discord.Color.pink())
        embed.add_field(name="Positive Powers:", value="Good jumper: You can jump higher while sprinting.\n Nocturnal: You have natural night vision.\n Catlike Appearance: Creepers are scared of you.\n Velvet Paws: Your footsteps don't cause any vibrations.", inline=False)
        embed.add_field(name="Negative Powers:", value="9 Lives: You have 9 hearts of health.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Enderian':
        embed = discord.Embed(title="Enderian", description="Escaping the end you roam the overworld, teleporting from horizon to horizon.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Teleportation: You have an infinite ender pearl that deals no damage.\n Delicate Touch: You have silk touch hands.\n Slender Body: You can reach farther than everyone due to your long arms.\n Bearer of Pearls: You always drop 0-2 ender pearls upon death.", inline=False)
        embed.add_field(name="Negative Powers", value="Hydrophobia: You take damage while in contact with water.\n Scared of Gourds: You are afraid of pumpkins. For a good reason.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Merling':
        embed = discord.Embed(title="Merling", description="Blub.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Wet Eyes: Your vision underwater is nearly perfect.\n Fins: Your underwater speed is increased.\n Aqua Affinity: You may break blocks underwater as other do on land.\n Like Water: When underwater, you do not sink to the ground unless you want to.", inline=False)
        embed.add_field(name="Negative Powers", value="Gills: You can ONLY breathe underwater, when raining, you can breathe on land for a short time.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Blazeborn':
        embed = discord.Embed(title="Blazeborn", description="When you forget to put a door on your nether portal...", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Burning Wrath: When on fire, you deal additional damage.\n Fire Immunity: You are immune to all types of fire damage.\n Hot-blooded: Due to your hot body, venom burns up, making you immune to poison and hunger status effects.\n Flames of the Nether: Upon hitting someone, they are set on fire.", inline=False)
        embed.add_field(name="Negative Powers", value="Born from Flames: Your natural spawn is in the Nether.\n To Hot for.. Uh.. Ya.. Water: You get damaged while in water.\n Opposite Forces: You are much weaker in colder biomes and at high altitudes.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Phantom':
        embed = discord.Embed(title="Phantom", description="I could swear I saw a player pop out of the ground?? - Probably Powershot300.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Translucent: Your skin is translucent.\n Phasing: You can switch between human and phantom form at will, but only while you are saturated enough to sprint.\n Invisibility: While phantomized, you become fully invisible.", inline=False)
        embed.add_field(name="Negative Powers", value="Not Really a Vampire: You take damage from sunlight.\n Fast Metabolism: While in Phantom Form, you loose twice as much hunger.\n Fragile Creature: You have 3 less hearts.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Starborne':
        embed = discord.Embed(title="Starborne", description="Star2080's origin (real)", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Starbeam: You can blast a star beam every 30 seconds, dealing 10 damage.\n Shooting Star: You can fling yourself into the air after a 5 second cooldown.\n Stargazer: When exposed to the stars, you gain speed and regeneration.\n", inline=False)
        embed.add_field(name="Negative Powers", value="Supernova: All the collected star energy that you have accumulated through your time in the stars needs to go somewhere, So whenever you happen to meet your demise you will explode in a great Supernova.\n Cold Vacuum: You are used to the coldness of space, so you take double damage from fire.\n Nonviolent: In the great abyss of space, violence is uncommon if you even come across someone in the first place, this results in you having a small chance to be immobilized upon taking damage.\n Starwatcher: When not exposed to the stars, you get a little sad and will move a bit slower.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Allay':
        embed = discord.Embed(title="Allay", description="A bit less annoying than a flying rat (and much more cute)", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Little Fairy: You have small wings, you can fly and float.\n Blue Spirit: You are semi-translucent, and glow in dark places.\n Sounds of Music: You enjoy the sounds of music, you can use a jukebox as a respawn anchor.\n COOKIES: Cookies give the same saturation as steak.\n Treasure Finder: You have increased chances of getting treasure loot, and villagers will lower their prices for you.", inline=False)
        embed.add_field(name="Negative Powers", value="Kinda Flammable: You burn easily, you take extra fire damage, and you have half health.\n Friendly Angel: You don't like to harm animals, you get nauseous when eating meat.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Rabbit':
        embed = discord.Embed(title="Rabbit", description="WHO'S BEEN EATING MY CARROTS - FrozyCube.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Leap: You can leap in the direction you are looking to.\n Strong Hopper: You can jump significantly higher.\n Shock Absorption: You take less fall damage.\n Delicious: You may drop a rabbit's foot when hit.", inline=False)
        embed.add_field(name="Negative Powers", value="Picky Eater: You can only eat carrots and golden carrots.\n Fragile: You have 3 less hearts.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Bumblebee':
        embed = discord.Embed(title="Bumblebee", description="Buzzy Boi.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Featherweight: You fall as gently to the ground as a feather would unless you shift.\n Poisonous: Hitting someone gives them poison for 2 seconds.\n Bloom: You gain regeneration when near flowers.\n Flight: You can fly, just like a bee!(WHATT).", inline=False)
        embed.add_field(name="Negative Powers", value="Nighttime: You are sleepy at night, so you walk and fly slower.\n Lifespan: You have 3 less hearts.\n Rain: You cannot fly when in the rain and are weaker while wet.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Sculkling':
        embed = discord.Embed(title="Sculkling", description="Not the wardens best friend, but they'll do.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Amongst Your People: You get buffs while near sculk blocks.\n Best Friends Forever: The Warden wont attack you, and you don't trigger Sculk Shriekers.\n It Grows: Upon dying, a small patch of sculk will grow around you, you gain some saturation.\n Echo Pulse: You can see all entities around you, you gain some saturation.\n Carrier of Echos: You emmit a sonic boom upon Shift-Clicking your Boom keybind, or your Boom item(30 second cooldown).", inline=False)
        embed.add_field(name="Negative Powers", value="One of Them: You spawn in the Deep Dark.\n Afraid of the Light: You are weaker while in sunlight.\n Decaying Essence: All armour you wear will slowly deteriorate.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Creep':
        embed = discord.Embed(title="Creep", description="Hisssssss, BOOM! TazerFaceLord Was blown up by Blaze276.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="BOOOOM: You can explode at will, but you take 5 hearts of damage.\n Charged: During thunderstorms, you are significantly stronger.\n You got a Friend in Me: Other creepers will not attack you.", inline=False)
        embed.add_field(name="Negative Powers", value="Felinephobia: You are scared of cats and you will take damage when near one.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Slimeling':
        embed = discord.Embed(title="Slimeling", description="Boing... Boing.. Boing. Boing! BOING! **BOING!**", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="Bouncy: You bounce on any block as if it were a slime block.\n Not Very Solid: Upon being hit, you have a chance to split and create small slimes.\n Improved Leap: You have an improved leap at the cost of movement speed.\n Great Leap: Upon shifting for 4 seconds(nothing in hand), you leap in the direction you are looking.\n Slimy Skin: You have the green translucent skin of a slime.", inline=False)
        embed.add_field(name="Negative Powers", value="Burnable: You burn when in hotter biomes.", inline=False)
        await ctx.send(embed=embed)
    elif option == 'Piglin':
        embed = discord.Embed(title="Piglin", description="If you don't have any gold on you stay faarrr away, like another dimension far away.", color=discord.Color.pink())
        embed.add_field(name="Positive Powers", value="I like to be SHINY: Golden tools deal extra damage and gold armour has more protection.\n Friendly Frenemies: Piglins won't attack you unless provoked, Brutes will still attack on sight.", inline=False)
        embed.add_field(name="Negative Powers", value="Nether Dweller: Your natural spawn is in the Nether and you can only eat meat.\n Colder Realms: When outside of the Nether, you zombify and become immune to fire and slower.\n BLUE FIRE SPOOKY: You are afraid of soul fire, becoming weak when near it.", inline=False)
        await ctx.send(embed=embed)
    else:
        embed = discord.Embed(title="Invalid Option", description="Please use '?origins for a list of valid args.", color=discord.Color.red())
        await ctx.send(embed=embed)
        print(f'Someone ran the command ?origin')

@bot.command()
async def invite(ctx):
    await ctx.send("You can invite the Game bot with this link! https://discord.com/api/oauth2/authorize?client_id=1145327542723686451&permissions=8&scope=bot")
    print(f'Someone ran the command ?invite')

@bot.command()
async def mute(ctx, member: discord.Member):
    # Check if the command invoker has the required role
    allowed_roles = ["Moderation Team", "Founder"]
    invoker_roles = [role.name for role in ctx.author.roles]
    
    if any(role in allowed_roles for role in invoker_roles):
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
        await ctx.send("You don't have the required role to use this command.")
        print(f'Someone ran the command ?mute')

@bot.command()
async def unmute(ctx, member: discord.Member):
    # Check if the command invoker has the required role
    allowed_roles = ["Moderation Team", "Founder"]
    invoker_roles = [role.name for role in ctx.author.roles]
    
    if any(role in allowed_roles for role in invoker_roles):
        # Check if the muted role exists in the server
        muted_role = discord.utils.get(ctx.guild.roles, name="Muted")
        
        if muted_role:
            # Remove the muted role from the specified user
            await member.remove_roles(muted_role)
            await ctx.send(f"{member.mention} has been unmuted.")
        else:
            await ctx.send("The Muted role doesn't exist.")
    else:
        await ctx.send("You don't have the required role to use this command.")
        print(f'Someone ran the command ?unmute')

@bot.command()
async def kick(ctx, member: discord.Member):
    # Check if the command sender has the necessary permissions to kick members
    if ctx.author.guild_permissions.kick_members:
        await member.kick()
        await ctx.send(f'Kicked {member.display_name} from the server.')
    else:
        await ctx.send("You don't have permission to kick members.")

@bot.tree.command(name="help", description="Gets the help menu")
async def help(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Bot Commands",
        description="",
        color=discord.Color.pink()
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
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /help')

@bot.tree.command(name="patreon", description="Subscribe to us on Patreon!")
async def patreon(interaction: discord.Interaction):
    embed=discord.Embed(
        title="Subscribe to us on Patreon!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(url="https://cdn.discordapp.com/attachments/1138942994683269261/1141135170628485120/asset-preview.png")
    embed.url = "https://patreon.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /subscribe')

@bot.command()
async def promote(ctx, member: discord.Member):
    founder_role = discord.utils.get(ctx.guild.roles, name="Founder")
    moderation_role = discord.utils.get(ctx.guild.roles, name="Moderation Team")

    if founder_role in ctx.author.roles:
        await member.add_roles(moderation_role)
        await ctx.send(f"{member.mention} has been added to the Moderation Team.")
    else:
        await ctx.send("You do not have permission to use this command.")

@bot.command()
async def demote(ctx, member: discord.Member):
    founder_role = discord.utils.get(ctx.guild.roles, name="Founder")
    moderation_role = discord.utils.get(ctx.guild.roles, name="Moderation Team")

    if founder_role in ctx.author.roles:
        await member.remove_roles(moderation_role)
        await ctx.send(f"Removed {member.mention} from the Moderation Team.")
    else:
        await ctx.send("You do not have permission to use this command.")

@bot.tree.command(name="credits", description="Gets the credits for the bot")
async def credits(interaction: discord.Interaction):
    embed = discord.Embed(
        title="The Game Bot Credits",
        description="These are cool people!",
        color=discord.Color.pink()
    )
    embed.add_field(name="@Blaze276", value="For Creating and maintaining the bot", inline=False)
    embed.add_field(name="@RACSpeedster", value="For Providing a basic bot that the game bot was built off of", inline=False)
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")
    
    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /credits')

@bot.tree.command(name="ping", description="Gets the bot's Ping")
async def ping(interaction: discord.Interaction):
    latency = round(bot.latency * 1000)  # Convert to milliseconds and round
    await interaction.response.send_message(f'Pong! Bot latency is {latency}ms')
    print(f'Someone ran the app command /ping')

@bot.tree.command(name="prefix", description="Gets the bot's prefix for commands")
async def prefix(interaction: discord.Interaction):
    await interaction.response.send_message(f"The Bot Prefix is ?", ephemeral=True)
    print(f'Someone ran the app command /prefix')

@bot.tree.command(name="kofi", description="Subscribe to us on Ko-Fi!")
async def kofi(interaction: discord.Interaction):
    embed=discord.Embed(
        title="Subscribe to us on Ko-Fi!",
        description="Thank You so much for considering to subscribe to us! It really means the world to our team!",
    )
    embed.set_image(url="https://cdn.discordapp.com/attachments/1138942994683269261/1145809835556864091/ko-fi.png")
    embed.url = "https://ko-fi.com/GamingToThePeople"
    embed.set_footer(text="Subsribe on patreon or ko-fi pls i need money.")

    await interaction.response.send_message(embed=embed)
    print(f'Someone ran the app command /kofi')

# Bot token. DO NOT TOUCH!
TOKEN = 'MTE0NTMyNzU0MjcyMzY4NjQ1MQ.Gf2yMI.BsRN-ru8GalrXl3eHMmvWCgBIrshGoi7xgTnbI'
bot.run(TOKEN)
