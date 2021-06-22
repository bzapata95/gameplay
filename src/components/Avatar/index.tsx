import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

interface AvatarProps {
  urlImage: string;
}

function Avatar({ urlImage }: AvatarProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar} />
    </LinearGradient>
  );
}

export default Avatar;
