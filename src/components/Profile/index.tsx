import React from "react";

import { View, Text } from "react-native";
import { useAuth } from "../../hooks/auth";

import Avatar from "../Avatar";

import { styles } from "./styles";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Avatar urlImage={user.avatar} />
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
