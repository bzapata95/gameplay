import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { View, Text } from "react-native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

interface HeaderProps {
  title: string;
  action?: React.ReactNode;
}

function Header({ title, action }: HeaderProps) {
  const navigation = useNavigation();

  const { secondary100, secondary40, heading } = theme.colors;
  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </LinearGradient>
  );
}

export default Header;
