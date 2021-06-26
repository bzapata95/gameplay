import React from "react";

import { View, ActivityIndicator } from "react-native";
import { theme } from "../../global/styles/theme";

import { styles } from "./styles";

interface LoadProps {}

function Load({}: LoadProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export default Load;
