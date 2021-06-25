import React from "react";

import { View } from "react-native";

import { styles } from "./styles";

type Props = {
  isCentered?: boolean;
};

function DividerList({ isCentered }: Props) {
  return (
    <View
      style={[
        styles.container,
        isCentered
          ? { marginVertical: 12 }
          : { marginTop: 2, marginBottom: 31 },
      ]}
    />
  );
}

export default DividerList;
