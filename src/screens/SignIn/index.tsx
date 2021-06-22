import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ButtonIcon } from "../../components/ButtonIcon";

import IllustrationImg from "../../assets/illustration.png";

import { styles } from "./styles";

export function SignIn() {
  const { navigate } = useNavigation();

  function handleSignIn() {
    navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Image
        source={IllustrationImg}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conéctate {"\n"}y organice sus juegos {"\n"}
          facilmente
        </Text>

        <Text style={styles.subtitle}>
          Crea grupos para jugar sus juegos {"\n"}
          favoritos con sus amigos
        </Text>

        <ButtonIcon onPress={handleSignIn} title="Entrar con Discord" />
      </View>
    </View>
  );
}
