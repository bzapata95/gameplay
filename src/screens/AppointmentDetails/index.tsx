import React, { useState } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";

import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Alert,
  Share,
  Platform,
} from "react-native";

import Background from "../../components/Background";
import Header from "../../components/Header";
import ListHeader from "../../components/ListHeader";
import Member, { MemberProps } from "../../components/Member";
import DividerList from "../../components/DividerList";
import { ButtonIcon } from "../../components/ButtonIcon";

import bannerImg from "../../assets/banner.png";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { AppointmentProps } from "../../components/Appointment";
import discordApi from "../../services/discordApi";
import { useEffect } from "react";
import Load from "../../components/Load";

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};

interface AppointmentDetailsProps {}

function AppointmentDetails({}: AppointmentDetailsProps) {
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);

  async function fetGuildWidgetInfo() {
    try {
      const response = await discordApi.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        "Verifique las configuraciones del servidor, Active el widget del servidor"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetGuildWidgetInfo();
  }, []);

  function handleShareInvitation() {
    const message =
      Platform.OS === "ios"
        ? `Juntese a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  return (
    <Background>
      <Header
        title="Detalles"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContainer}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jugadores"
            subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <DividerList isCentered />}
            style={styles.members}
          />

          {guildSelected.guild.owner && (
            <View style={styles.footer}>
              <ButtonIcon
                onPress={handleOpenGuild}
                title="Entrar en la partida"
              />
            </View>
          )}
        </>
      )}
    </Background>
  );
}

export default AppointmentDetails;
