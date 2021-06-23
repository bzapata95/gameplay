import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { View, Text } from "react-native";

import { theme } from "../../global/styles/theme";

import { styles } from "./styles";

interface CategoryProps extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckBox?: boolean;
  checked?: boolean;
}

function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}: CategoryProps) {
  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50, theme.colors.secondary70]}
      >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[
            checked ? theme.colors.secondary85 : theme.colors.secondary50,
            theme.colors.secondary40,
          ]}
        >
          {hasCheckBox && (
            <View style={checked ? styles.checked : styles.check} />
          )}
          <Icon width={48} height={48} />

          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}

export default Category;
