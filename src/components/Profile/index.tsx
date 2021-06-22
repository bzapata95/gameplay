import React from "react";

import { View, Text } from "react-native";

import Avatar from "../Avatar";

import { styles } from "./styles";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Avatar urlImage="https://github.com/bzapata95.png" />
      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Hola,</Text>

          <Text style={styles.username}>Bryan</Text>
        </View>

        <Text style={styles.message}>Es un día de victoria </Text>
      </View>
    </View>
  );
}

export default Profile;
