import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";

import { ButtonIcon } from "../../components/ButtonIcon";
import Background from "../../components/Background";

import IllustrationImg from "../../assets/illustration.png";

import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { loading, signIn } = useAuth();
  // const { navigate } = useNavigation();

  async function handleSignIn() {
    // navigate("Home");
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
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
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon onPress={handleSignIn} title="Entrar con Discord" />
          )}
        </View>
      </View>
    </Background>
  );
}
