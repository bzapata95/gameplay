import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { View, Text, ImageBackground, FlatList } from "react-native";

import Background from "../../components/Background";
import Header from "../../components/Header";
import ListHeader from "../../components/ListHeader";
import Member from "../../components/Member";
import DividerList from "../../components/DividerList";
import { ButtonIcon } from "../../components/ButtonIcon";

import bannerImg from "../../assets/banner.png";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

interface AppointmentDetailsProps {}

function AppointmentDetails({}: AppointmentDetailsProps) {
  const members = [
    {
      id: "1",
      username: "Bryan",
      avatar_url: "https://github.com/bzapata95.png",
      status: "online",
    },
    {
      id: "2",
      username: "Bryan",
      avatar_url: "https://github.com/bzapata95.png",
      status: "offline",
    },
  ];
  return (
    <Background>
      <Header
        title="Detalles"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContainer}>
          <Text style={styles.title}>Legendarios</Text>
          <Text style={styles.subtitle}>
            Hoy que vamos a llegar un challenge sin perder una martida
          </Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jugadores" subtitle="Total 3" />

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <DividerList isCentered />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar en la partida" />
      </View>
    </Background>
  );
}

export default AppointmentDetails;
