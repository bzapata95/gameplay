import React from "react";

import {
  View,
  Text,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from "react-native";

import Background from "../Background";

import { styles } from "./styles";

interface ModalViewProps extends ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

function ModalView({ children, closeModal, ...rest }: ModalViewProps) {
  return (
    <Modal statusBarTranslucent transparent animationType="slide" {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ModalView;
