import React from "react";

import { View, TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

interface SmallInputProps extends TextInputProps {}

function SmallInput({ ...rest }: SmallInputProps) {
  return (
    <TextInput style={styles.container} keyboardType="numeric" {...rest} />
  );
}

export default SmallInput;
