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
            icon_url = 'https://cdn.discordapp.com/avatars/1145327542723686451/aa8e209b03194832e7b3704eef3fd297.png?size=4096'
        },
        url = nil,
        author = {
            name = nil,
            url = nil,
            icon_url = nil
        },
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
                if guild then
                    local member = guild:getMember(mentionedUserID)
                    local mutedRole = guild.roles:find(function(role)
                        return role.name == 'Muted'
                    end)
                    if member.id == "960887298533244928" then
                        sendMessage("Error muting "..args[1]..": no permissions",channel)
                        return
                    end
                    member:addRole(mutedRole)
                    sendMessage("Muted "..args[1],channel)
                end
            end
            if ActualMessage == "unmute" then
                local mentionedUserID = string.sub(args[1],3,#args[1]-1)
                if guild then
                    local member = guild:getMember(mentionedUserID)
                    local mutedRole = guild.roles:find(function(role)
                        return role.name == 'Muted'
                    end)
                    member:removeRole(mutedRole)
                    -- member:addPermission(discordia.enums.permission.sendMessages)
                    sendMessage("Unmuted "..args[1],channel)
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
            if ActualMessage == "getonline" then
                local member = guild:getMember(string.sub(args[1],3,#args[1]-1))
                local status = member.status
                print(status,"Balls",member.username)
                -- Check the member's status and reply accordingly
                message:reply("The user is currently "..status..".")
            end
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
                bawls.field[#bawls.field] = {name="The Game Bot Python", value="The Game bot coded in python and the first gamebot to not be coded in blocks", inline=false}
                bawls.field[#bawls.field] = {name="The Game Bot Lua", value="The Game bot coded in lua. second gamebot to be made and not complete just yet. main option for gamebot once it is completed", inline=false}
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
                sendMessage("[_Check out Brandist!_](https://www.youknowthetype.com)")
            end
            if ActualMessage =="freedom" then
                sendMessage("https://youtu.be/mQ5khClAFIo?si=LYPdSJL-vomEISf3")

            end
            if ActualMessage == "warn" then
                local author = message.guild:getMember(message.author.id)
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
                sendMessage("Warned user "..args[1].." for "..fullReason,channel)
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