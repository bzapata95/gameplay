import React from "react";

import { View, Text, Modal, ModalProps } from "react-native";

import Background from "../Background";

import { styles } from "./styles";

interface ModalViewProps extends ModalProps {
  children: React.ReactNode;
}

function ModalView({ children, ...rest }: ModalViewProps) {
  return (
    <Modal transparent animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Background>
            <View style={styles.bar} />
            {children}
          </Background>
        </View>
      </View>
    </Modal>
  );
}

export default ModalView;
