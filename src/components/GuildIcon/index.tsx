import React from "react";

import { View, Image } from "react-native";
import { DISCORD_APP } from "../../config/discordAuth";
import DiscordSVG from "../../assets/discord.svg";

import { styles } from "./styles";

interface GuildIconProps {
  guildId: string;
  iconId: string | null;
}

function GuildIcon({ guildId, iconId }: GuildIconProps) {
  const uri = `${DISCORD_APP.CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  return (
    <View style={styles.container}>
      {iconId ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <DiscordSVG width={40} height={40} />
      )}
    </View>
  );
}

export default GuildIcon;
