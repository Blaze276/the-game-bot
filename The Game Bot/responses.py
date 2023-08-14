def handle_response(msg):
    p_message = msg.lower()

    if p_message == "saveargument":
        print("Saving messages")
        return "Successfully saved the last 100 messages in the channel."

    if p_message == "mute":
        print("Muted a user")
        return "{member.mention} has been muted for reason: {reason}"

    return ""
