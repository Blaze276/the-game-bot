import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

import javax.security.auth.login.LoginException;

public class Bot extends ListenerAdapter {

    public static void main(String[] args) throws LoginException {
        JDABuilder.createDefault("your_token_here")
                .addEventListeners(new Bot())
                .setActivity(Activity.listening("The Minecraft OST"))
                .build();
    }

    @Override
    public void onReady(net.dv8tion.jda.api.events.ReadyEvent event) {
        System.out.println("Logged in as " + event.getJDA().getSelfUser().getName());
    }

    @Override
    public void onGuildMessageReceived(GuildMessageReceivedEvent event) {
        String message = event.getMessage().getContentRaw();
        if (event.getAuthor().equals(event.getJDA().getSelfUser())) {
            return;
        }

        if (message.startsWith("?")) {
            message = message.substring(1);
            if (message.equalsIgnoreCase("ip")) {
                event.getChannel().sendMessage("The IP is;\nJava: Gttporigins.minehut.gg\nBedrock: gttporigins.bedrock.minehut.gg").queue();
            }
        }

        if (event.getGuild() != null) {
            Guild guild = event.getGuild();
            Member member = event.getMember();
            String[] args = message.split("\\s+");
            if (args.length >= 2 && args[0].equalsIgnoreCase("?mute")) {
                Role role = guild.getRolesByName("Muted", true).stream().findFirst().orElse(null);
                if (role != null) {
                    Member target = event.getMessage().getMentionedMembers().get(0);
                    role = guild.getRoleById(role.getIdLong());
                    if (target != null) {
                        guild.addRoleToMember(target, role).queue();
                        event.getChannel().sendMessage(target.getAsMention() + " has been muted.").queue();
                        String reason = args.length > 2 ? message.substring(message.indexOf(args[2])) : "No reason provided.";
                        target.getUser().openPrivateChannel().queue(privateChannel ->
                                privateChannel.sendMessage("You have been muted in " + guild.getName() + " for the following reason:\n" + reason).queue());
                    }
                } else {
                    event.getChannel().sendMessage("The 'Muted' role was not found. Please create the role before using the mute command.").queue();
                }
            } else if (args.length >= 2 && args[0].equalsIgnoreCase("?unmute")) {
                Role role = guild.getRolesByName("Muted", true).stream().findFirst().orElse(null);
                if (role != null) {
                    Member target = event.getMessage().getMentionedMembers().get(0);
                    role = guild.getRoleById(role.getIdLong());
                    if (target != null && target.getRoles().contains(role)) {
                        guild.removeRoleFromMember(target, role).queue();
                        event.getChannel().sendMessage(target.getAsMention() + " has been unmuted.").queue();
                    } else {
                        event.getChannel().sendMessage(target.getAsMention() + " is not muted.").queue();
                    }
                }
            }
        }
    }
}
