local discordia = require('discordia')
local client = discordia.Client()

local botUsername
local botdiscrim
local botfullname

local config = require("token")

local StartupTime = os.time()

local globaldata = {}

function sendMessage(msg,channel)
    local MESSAGE = channel:send(msg)
    return MESSAGE
end

local guild

local Quotas = {
    "The Minecraft OST",
    "The Roblox OST",
    "The Terraria OST",
    "The Among us OST",
    "The Fall Guys OST",
    "The Geometry Dash OST",
    "The Fortnite OST",
}

client:on('ready', function()
    botUsername = client.user.username
    botdiscrim = client.user.discriminator
    botfullname = botUsername..botdiscrim
    print('Logged in as '.. botUsername)
    client:setStatus("idle")
    client:setActivity{
        name = Quotas[math.random(1,#Quotas)],
        type = 2
    }
    if math.random(1,100) == 1 then
        client:setStatus("dnd")
        client:setActivity{
            name = "Kotlin's just better",
            type = 3
        }
    end
end)



function CreateEmbed(fields, title, description)
    local embed = {
        title = title,
        description = description,
        fields = fields,
        color = discordia.Color.fromRGB(0,0,0).value,
        timestamp = discordia.Date():toISO('T', 'Z'),
        image = {
            url = nil
        },
        footer = {
            text = 'The Game Bot',
            icon_url = 'https://cdn.discordapp.com/avatars/1145327542723686451/b7d10e6d9a87ab39e1e2f2ca6a8bc663.png?size=4096'
        },
        url = nil,
        author = {
            name = nil,
            url = nil,
            icon_url = nil
        },
        thumbnail = {
            url = "",
        }
    }
    return embed
end

function wait(seconds)
    local start = os.time()
    repeat until os.time() > start + seconds
end

function GetCmdName(str)
    local s = ""
    for i = 1,#str do
        local subbed = string.sub(str,i,i)
        if subbed == " " then
            break
        else
            s = s..subbed
        end
    end
    return s
end

function GetArgs(str)
    local s = ""
    local l = {}
    for i = 1,#str do
        local subbed = string.sub(str,i,i)
        if subbed == " " then
            l[#l+1] = s
            s = ""
        else
            s = s..subbed
        end
    end
    l[#l+1] = s
    table.remove(l,1)
    return l
end

function applyRole(member, roleId)
    local role = member.guild:getRole(roleId)
    if role then
        member:addRole(role)
        return true -- Role applied successfully
    else
        return false -- Role not found
    end
end

function processCMD(msg,channel,message)
    if #msg > 1 then
        guild = message.guild
        local ActualMessage = GetCmdName(string.sub(msg,2,#msg))
        local args = GetArgs(string.sub(msg,2,#msg))
        local msgprefix = string.sub(msg,1,1)

        if msgprefix == "?" then
            if ActualMessage == "ip" then
                sendMessage("The IP is gttpmc.my.pebble.host \nversion 1.16.5",channel)
            end
            if ActualMessage == "flip" then
                local flip = math.random(1,2)
                local choice = "math.random(1,2)"
                if flip == 1 then
                    choice = "Tails"
                else
                    choice = "Heads"
                end
                sendMessage("The coin landed on "..choice.."!",channel)
            end
            if ActualMessage == "credits" then
                local emb = CreateEmbed({},"The Game Bot Credits","These are cool people!")
                emb.fields[#emb.fields+1] =
                {name = "@Blaze276", value = "for helping making the completed The Game Bot in lua, and creating the OG Game bot", inline = false}
                emb.fields[#emb.fields+1] =
                {name = "@RACSpeedster", value = "for rewriting the bot in Lua originally and being cool", inline = false}
                channel:send{embed = emb}
            end
            if ActualMessage == "kick" then
                local reason = ""
                for i = 2,#args do
                    reason = reason .. args[i].." "
                end
                reason = string.sub(reason,1,#reason-1)

                local author = message.guild:getMember(message.author.id)
                local targetMember = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                local username = targetMember.username
                local uid = string.sub(args[1],3,#args[1]-1)

                if author:hasPermission("kickMembers") then
                    local targetUser = client:getUser(uid)
                    targetUser:send("You have been _**kicked**_ from the server **"..[["]]..message.guild.name..[["]].."** _for_ **"..[["]]..reason..[["]].."**"..".")
                    targetMember:kick(reason)
                    sendMessage("Successfully kicked the user ".."**"..username.."** for **"..[["]]..reason..[["]].."**",channel)
                else
                    sendMessage("You do not have the required perms to use this command.", channel)
                end
            end
            if ActualMessage == "mute" then
                local mentionedUserID = string.sub(args[1],3,#args[1]-1)
                local user = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                local username = user.username
                if guild then
                    local member = guild:getMember(mentionedUserID)
                    local mutedRole = guild.roles:find(function(role)
                        return role.name == 'Muted'
                    end)
                    if member.id == "960887298533244928" then
                        sendMessage("Error muting ".."**"..username.."**".." : no permissions",channel)
                        return
                    end
                    member:addRole(mutedRole)
                    sendMessage("Muted ".."**"..username.."**",channel)
                end
            end
            if ActualMessage == "unmute" then
                local mentionedUserID = string.sub(args[1],3,#args[1]-1)
                local targetMember = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                local username = targetMember.username
                if guild then
                    local member = guild:getMember(mentionedUserID)
                    local mutedRole = guild.roles:find(function(role)
                        return role.name == 'Muted'
                    end)
                    member:removeRole(mutedRole)
                    -- member:addPermission(discordia.enums.permission.sendMessages)
                    sendMessage("Unmuted ".."**"..username.."**",channel)
                end
            end
            if ActualMessage == "ban" then
                local reason = ""
                for i = 2,#args do
                    reason = reason .. args[i].." "
                end
                reason = string.sub(reason,1,#reason-1)

                local author = message.guild:getMember(message.author.id)
                local targetMember = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                local username = targetMember.username
                local uid = string.sub(args[1],3,#args[1]-1)

                if author:hasPermission("banMembers") then
                    local targetUser = client:getUser(uid)
                    targetUser:send("You have been _**banned**_ from the server **"..[["]]..message.guild.name..[["]].."** _for_ **"..[["]]..reason..[["]].."**"..".")
                    targetMember:ban(reason)
                    sendMessage("Successfully banned the user ".."**"..username.."** for **"..[["]]..reason..[["]].."**",channel)
                else
                    sendMessage("You do not have the required perms to use this command.", channel)
                end
            end
            if ActualMessage == "sigma" then
                local currentDate = os.date('*t')
                if currentDate.month == 9 and currentDate.day == 9 then
                    sendMessage("Happy birthday, <@".."960887298533244928"..">",channel)

                else
                    sendMessage("Command disabled",channel)

                end
            end
            if ActualMessage == "purge" then
                local member = message.member -- Get the member who sent the message

                -- Check if the member has the required permission
                if member:hasPermission(discordia.enums.permission.manageMessages) then
                    local it = 0
                    message.channel:getMessages(tonumber(args[1])+1):forEach(function(msg)
                        it = it + 1
                        msg:delete()
                    end)
                    local msg = sendMessage("Success, purged "..args[1].." messages",channel)
                    os.execute('powershell -Command "Start-Sleep -Seconds 3"')
                    msg:delete()
                else
                    message.channel:send('You do not have the required permission.')
                end
            end
            if ActualMessage == "uptime" then
                sendMessage("uptime:`"..os.time()-StartupTime.."`",channel)
            end
            if ActualMessage == "kofi" then
                local emb = CreateEmbed({},"Subscribe to us on Ko-fi!","Thank you so much for considering to subscribe to us! It really means the world to our team!")
                emb.image.url = "https://cdn.discordapp.com/attachments/1138942994683269261/1145809835556864091/ko-fi.png"
                emb.url = "https://ko-fi.com/gamingtothepeople"
                channel:send{embed = emb}
            end
            if ActualMessage == "patreon" then
                local emb = CreateEmbed({},"Subscribe to us on Patreon!","Thank you so much for considering to subscribe to us! It really means the world to our team!")
                emb.image.url = "https://cdn.discordapp.com/attachments/1138942994683269261/1141135170628485120/asset-preview.png"
                emb.url = "https://www.patreon.com/GamingToThePeople"
                channel:send{embed = emb}
            end
            if ActualMessage == "rizz" then
                sendMessage("rizzard",channel)
                sendMessage("just like my lizard",channel)
            end
            -- if ActualMessage == "getonline" then
            --  local member = guild:getMember(string.sub(args[1],3,#args[1]-1))
            --  local status = member.status
            --  print(status,"Balls",member.username)
                -- Check the member's status and reply accordingly
            --  message:reply("The user is currently "..status..".")
            --end
            if ActualMessage == "modapply" then
                local emb = CreateEmbed({},"Mod Form","Thanks for applying. Please allow at most 48hrs for your mod application to be looked at.")
                emb.url = "https://forms.gle/euSvwrb6JyoW8cPr8"
                channel:send{embed = emb}
            end
            if ActualMessage == "ping" then
                local latency = math.floor(client:getGatewayPing() * 1000) -- Convert to milliseconds and round down
                channel:send(string.format('Pong! Bot latency is %dms', latency))
                print('Someone ran the command ?ping')

            end
            if ActualMessage == "say" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasPermission(message.channel, 'administrator') then
                    message:delete()
                    local s = ""
                    for _,i in pairs(args) do
                        s = s..i.." "
                    end
                    sendMessage(s,channel)
                else
                    message:delete()
                    local s = ""
                    for _,i in pairs(args) do
                        s = s..i.." "
                    end
                    sendMessage(""..author.username.." said: "..[["]]..s..[["]],channel)

                end
            end
            if ActualMessage == "dmmess" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasPermission(message.channel, 'administrator') then
                    local mentionedUserID = string.sub(args[1],3,#args[1]-1)
                    local targetUser = client:getUser(mentionedUserID)
                    local s = ""
                    table.remove(args,1)
                    for _,i in pairs(args) do
                        s = s..i.." "

                    end
                else
                    sendMessage("You dont have permission to use this command!", channel)
                end
                targetUser:send(s)
                message:delete()
            end
            if ActualMessage == "dm" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasRole(message.channel, 'Founder') then
                    local mentionedUserID = string.sub(args[1],3,#args[1]-1)
                    local targetUser = client:getUser(mentionedUserID)
                    local MESS = "Hello "..targetUser.username..". I am here to let you know that your Gaming To The People Premium subscription is about to expire. If you would like to support GTTP again you can head to either https://patreon.com/GamingToThePeople or https://ko-fi.com/gamingtothepeople or run ?patreon, ?kofi in the discord server. We hope you'll choose to support us again!"
                    targetUser:send(MESS)
                    message:delete()
                else
                    sendMessage("You dont have permission to use this command!", channel)
                end
            end
            if ActualMessage == "STATUS" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasPermission(message.channel, 'administrator') then
                    client:setStatus("idle")
                    local s = ""
                    for _,i in pairs(args) do
                        s = s..i.." "
                    end

                    client:setActivity{
                        name = s,
                        type = 2
                    }
                else
                    sendMessage("You dont have permission to use this command!",channel)
                end
            end
            if ActualMessage == "uwu" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasPermission(message.channel, 'administrator') then
                    -- sendMessage("Happy birthday, <@".."960887298533244928"..">",channel)
                    for i = 1,25 do
                        sendMessage("uwu @everyone",channel)
                    end
                else sendMessage("You dont have permission to use this command!", channel)
                end
                --message:delete()
            end
            if ActualMessage == "rac_getonline" then
                local author = message.guild:getMember(message.author.id)
                if message.guild and author:hasPermission(message.channel, 'administrator') then
                    for i = 1,25 do
                        sendMessage("<@973292238618636369>",channel)
                    end
                else sendMessage("You dont have permission to use this command")
                end
            end
            if ActualMessage == "forks" then
                local bawls = CreateEmbed({}, "The Game Bot Forks", "Forks of the game bot to different languages")
                bawls.fields[#bawls.fields+1] = {name="The Game Bot Python", value="The Game bot coded in python and the first gamebot to not be coded in blocks", inline=false}
                bawls.fields[#bawls.fields+1] = {name="The Game Bot Lua", value="The Game bot coded in lua. second gamebot to be made and not complete just yet. main option for gamebot once it is completed", inline=false}
                channel: send{embed=bawls}

            end
            if ActualMessage == "help" then
                local bawls = CreateEmbed({}, "The Game Bot commands", "a list of all Game bot commands")
                bawls.fields[#bawls.fields+1] = {name="?ip", value="Gets the minecraft server IP", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?flip", value="flips a coin and lands on either heads or tails", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?credits", value="gets the credits for this bot", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?kick", value="kicks a user from the guild", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?mute/unmute", value="mutes/unmutes a user", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?ban", value="bans a user from the guild", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?sigma", value="command disabled. unless its 09/09", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?purge", value="deletes messages in the channel", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?uptime", value="gets the bot uptime", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?kofi", value="Subscribe to us on Ko-fi!", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?patreon", value="Subscribe to us on Patreon", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?rizz", value="rizz", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?getonline (NOT WORKING)", value="gets someones status", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?modapply", value="Apply for moderator", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?ping", value="gets the ping", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?say", value="makes the bot say stuff", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?forks", value="gets the list of forks of this bot", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?say", value="make the bot say something", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?warn", value="warns a user", inline=false}
                bawls.fields[#bawls.fields+1] = {name="?warnings", value="Shows warnings for a user", inline=false}
                channel: send{embed=bawls}

            end
            if ActualMessage == "sponsored" then
                sendMessage("**You Know The Type**",channel)
                sendMessage("https://cdn.discordapp.com/attachments/1119586233161621525/1167639789693042788/IMG_6849.jpg?ex=654edc4b&is=653c674b&hm=7bbe4374d3ad94cb216f617c15621e8ecfd4d5d3b3be622977934f242215ac56&", channel)
                sendMessage("[_Check out Brandist!_](https://www.youknowthetype.com)", channel)
            end
            if ActualMessage =="freedom" then
                sendMessage("https://youtu.be/mQ5khClAFIo?si=LYPdSJL-vomEISf3", channel)

            end
            if ActualMessage == "warn" then
                local author = message.guild:getMember(message.author.id)
                local targetMember = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                local username = targetMember.username
                if not author:hasPermission("kickMembers") then
                    sendMessage("You do not have the required perms to use this command.", channel)
                    return
                end
                local fullReason = ""
                for _, i in pairs(args) do
                    if _ > 1 then
                        fullReason = fullReason .. i .. " "
                    end
                end
                fullReason = string.sub(fullReason,1,#fullReason-1)

                local Warns = io.open("warns.txt","a")
                sendMessage("Warned user ".."**"..username.."**".." for "..fullReason,channel)
                Warns:write(string.sub(args[1],3,#args[1]-1)..":"..fullReason)
                Warns:write("\n")
                Warns:close()
            end
            if ActualMessage == "warnings" then
                if not args[1] then
                    sendMessage("Please provide a target",channel)
                end
                local AllWarns = {}
                local warnings = ""

                local Warns = io.open("warns.txt","r")
                warnings = Warns:read("*a")
                Warns:close()

                local fulstr = ""
                for i = 1,#warnings do
                    local char = string.sub(warnings,i,i)
                    if char == "\n" then
                        AllWarns[#AllWarns+1] = fulstr
                        fulstr = ""
                    else
                        fulstr = fulstr .. char
                    end
                end

                local found = {}

                for _,i in pairs(AllWarns) do
                    local id = ""
                    local mode = false
                    local reason = ""
                    for x = 1,#i do
                        local char = string.sub(i,x,x)
                        if char == ":" then
                            mode = true
                        else
                            if mode then
                                reason = reason .. char
                            else
                                id = id .. char
                            end
                        end
                    end
                    if id == string.sub(args[1],3,#args[1]-1) then
                        found[#found+1] = reason
                    end
                end

                local author = message.guild:getMember(message.author.id)
                local targetMember = message.guild:getMember(string.sub(args[1],3,#args[1]-1))
                if not targetMember then
                    targetMember = message.guild:getRole(string.sub(args[1],4,#args[1]-1))
                end
                local embed = CreateEmbed({},"Warnings","Warnings for user "..targetMember.name)
                if string.sub(string.sub(args[1],3,#args[1]-1),1,1) == "&" then
                    embed = CreateEmbed({},"Warnings","Warnings for role "..targetMember.name)
                end
                for _,i in pairs(found) do
                    embed.fields[#embed.fields+1] =
                    {name = "Warning ".._, value = i, inline = false}
                end
                channel:send{embed = embed}
            end
            if ActualMessage == "invite" then
                sendMessage("You can invite The Game Bot with this link:",channel)
                sendMessage("**[Invite The Game Bot](https://discord.com/api/oauth2/authorize?client_id=1145327542723686451&permissions=8&scope=bot%20applications.commands)**",channel)
            end
            if ActualMessage == "fandom" then
                local pages = {
                    ["blaze"] = {
                        pfp = "https://cdn.discordapp.com/avatars/960887298533244928/62ab0cb4062aa3dee62f77618eb0c6a7.png?size=4096",
                        title = "Blaze",
                        desc = "Blaze276, also known as Taavi Nehemia is the creator and owner of GTTP. he is described as \"subonpatreon\", \"Bald\", and \"Handsome\", Blaze has also cheated in a Minecraft survival by mining resources with baritone, he is from australia and has lived there for all his life up until the tail end of 2019, he then left Unison to go to Australia for 2 months as a vacation and has stated that \"Im going to Australia for 2 months and when i get back to america ill probably move to a different state.\". He currently resides in Perth, WA, (formerly Brooklyn, NY). He is decently skilled at coding with lua and has made this bot right here. He is good at Geometry dash and has beat Stereo Madness, Back on track, Polargeist, Dry out, Base after base, Can't let go, Jumper, Time Machine, Cycles, and Theory of everything. He is very good at minecraft (except for building).",
                        quote = "\"Continuity is pretty bloodthirsty, i will admit.\" -Blaze276 talking to almond about Continuity (netherite axe)",
                        age = "13",
                        school = "Urban Assembly Unison School, (formerly)",
                    },
                    ["racspeedster"] = {
                        pfp = "https://images-ext-1.discordapp.net/external/pg0SB4GaovN9ToIMMhBGq5rRjMXaYrimBgqMmIMFW_Y/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/973292238618636369/59bd864a40948444219206c9634db92b.png?width=468&height=468",
                        title = "RACSpeedster",
                        desc = "RACSpeedster, also known as Kaleb Prince, is a notable member of GTTP and a co-Developer to The Game Bot and the sole developer of the arsenal remake. he is described as \"Funny\",\"Good\", and \"a coding genius -Blaze276\". He describes himself as the Literal definition of a computer nerd. Got a programming problem? Ask him.",
                        quote = "\"OH NOES!! Line 1730 of A2Client.lua is giving me an error! Oh.. I missed a single character. BLAZE! LOOK AT THIS!!! LOOK AT MY MISTAKE!!!!\" -RACSpeedster telling Blaze about an error in his code",
                        age = "13",
                        school = "Urban Assembly Unison School",
                    },
                    ["tbd_entity_bl8ze_badguys_movie_white_cracker_loser_bad_at_life_and_minecraft_baby_rippel_guy_male_large_older_13"] = {
                        pfp = "https://cdn.discordapp.com/attachments/1118509756492021802/1162735257074794536/7583a56c23b85a3f32d91e89e17c5838.png?ex=653d0497&is=652a8f97&hm=5702135695dd02d07f185386782af9251c96fe5bb5f2e167fca9053afee0e6ce&",
                        title = "Bl8ze",
                        desc = "Bl8ze is a notable member of gttp. He was an original member of the five musketeers (suceeded by dork7), and played in the original Gttp (now ALT) Survival server. He is one of the few members to get their own custom role in the discord server (later removed after testing Blaze276). Bl8ze left Gttp in july of 2023 and rejoined in september on the grounds of \"I just want to use the voice channels and play the minecraft server\", since that statement he has done much more than that, he then left again on the 13 of october and preceded to get his minecraft server playerdata deleted and his discord and minecraft accounts banned from the respective servers, Due to bullying users and verbally abusing members. He is \"Spiteful\", \"Jealous\", and \"a psychologically messed up person\". He and his shenanegans have caused a new rule to be added to gttp stating \"no messages or forwarded messages from a user called Bl8ze360, will result in warn\"- rule no. 9. Due to him being an [insert-topic] topic we dont talk about him.",
                        quote = "\"yeah..., cuz im just so cool.\" -Bl8ze talking to Blaze about him \"being cool\".",
                        age = "13",
                        school = "Urban Assembly Unison School",
                    },
                    ["orangutanbanana"] = {
                        pfp = "https://cdn.discordapp.com/avatars/700515277904805989/630859fe042250736e9fe8c5f4541c29.png?size=4096",
                        title = "Orangutang Banana",
                        desc = "Orangutang Banana, also known as Jaxx Marquez is a notable member of GTTP. He is described as \"uplifting\",\"Playful\",\"legend -dork7\". He is the first ever moderator on GTTP history, (succeded by Star2080) and the first ever administrator in GTTP history, and the fifth member of the current Musketeers. He helped to create the future GTTP roadmap.",
                        quote = "\"quote\" -quote by Orangutang Banana",
                        age = "13",
                        school = "removed at request",
                    },
                    ["almond"] = {
                        pfp = "https://cdn.discordapp.com/avatars/1044740815743897730/7f4cea419723b26d0de0f68d268fea72.png?size=4096",
                        title = "Almond",
                        desc = "almond, also known as [removed] is a member of GTTP. He is described as \"adventurous\",\"annoying\",\"a btd6 pro -dork7\". He is siblings with Bl8ze and is the only Rippel left in GTTP. He was part of the original origins server and is an original musketeer. He had a tantrum about Bl8zes page to the fandom page and threatened to report Blaze276 for having a page about Bl8ze. He is the most banned user in GTTP history having being banned over 5 times!",
                        quote = "\"Loser alert... fr tho\" -almond telling live_laugh_leave_me_alone that he was a loser",
                        age = "11",
                        school = "Urban Assembly Unison School",
                    }
                }
                local page = pages[string.lower(args[1])]
                local embed = CreateEmbed({},page.title,page.desc)
                embed.thumbnail.url = page.pfp
                embed.fields[#embed.fields+1] = {name = "Quote:", value = page.quote, inline = false}
                embed.fields[#embed.fields+1] = {name = "Age:", value = page.age, inline = false}
                embed.fields[#embed.fields+1] = {name = "School:", value = page.school, inline = false}
                channel:send{embed = embed}
            end
            if ActualMessage == "fire" then
                sendMessage("https://youtu.be/vj8ZW0jr83I?si=oCZKkpKXX3VRGzmi", channel)
            end
            if ActualMessage == "drake" then
                sendMessage("https://cdn.discordapp.com/attachments/1124807018662867065/1180307593898491965/IMG_7799.jpg?ex=657cf21b&is=656a7d1b&hm=3206af476b6e00a33f4ac2c81870831f2c0784cd541a350bfe4c4176e41cd870&", channel)
            end
        end
    end
end

client:on('messageCreate', function(message)
    local username = message.author.username
    local discriminator = message.author.discriminator
    if username..discriminator ~= botfullname then
        processCMD(message.content,message.channel,message)
    end
end)

client:run('Bot '..config[1])
