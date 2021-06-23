import React from "react";

import { View, TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

interface TextAreaProps extends TextInputProps {}

function TextArea({ ...rest }: TextAreaProps) {
  return <TextInput style={styles.container} {...rest} />;
}

export default TextArea;
