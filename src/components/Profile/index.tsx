import React from "react";
import { RectButton } from "react-native-gesture-handler";

import { View, Text, Alert } from "react-native";
import { useAuth } from "../../hooks/auth";

import Avatar from "../Avatar";

import { styles } from "./styles";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  const { user, signOut } = useAuth();

  function handleSignOut() {
    Alert.alert("Logout", "Desea salir de Gameplay?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Si",
        onPress: () => signOut(),
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Hola,</Text>

          <Text style={styles.username}>{user.firstName}</Text>
        </View>

        <Text style={styles.message}>Es un día de victoria </Text>
      </View>
    </View>
  );
}

export default Profile;
