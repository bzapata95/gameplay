import React, { useState } from "react";
import uuid from "react-native-uuid";
import { RectButton } from "react-native-gesture-handler";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ModalView from "../../components/ModalView";
import Guilds from "../Guilds";
import Header from "../../components/Header";
import CategorySelect from "../../components/CategorySelect";
import GuildIcon from "../../components/GuildIcon";
import SmallInput from "../../components/SmallInput";
import TextArea from "../../components/TextArea";
import { Button } from "../../components/Button";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { GuildProps } from "../../components/Guild";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENT } from "../../config/storage";
import { useNavigation } from "@react-navigation/native";

interface AppointmentCreateProps {}

function AppointmentCreate({}: AppointmentCreateProps) {
  const navigate = useNavigation();
  const [openGuildModal, setOpenGuildModal] = useState(false);

  const [category, setCategory] = useState("");
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  function handleOpenGuildModal() {
    setOpenGuildModal(true);
  }
  function handleCloseGuildModal() {
    setOpenGuildModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} a las ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENT,
      JSON.stringify([...appointments, newAppointment])
    );

    navigate.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* <Background> */}
      <Header title="Registrar partida" />
      <ScrollView>
        <Text
          style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 },
          ]}
        >
          Categoría
        </Text>

        <CategorySelect
          hasCheckBox
          setCategory={setCategory}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuildModal}>
            <View style={styles.select}>
              {guild.icon ? (
                <GuildIcon guildId={guild.id} iconId={guild.icon} />
              ) : (
                <View style={styles.image} />
              )}

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name ? guild.name : "Seleccione un servidor"}
                </Text>
              </View>

              <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Día y mes
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} onChangeText={setDay} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} onChangeText={setMonth} />
              </View>
            </View>

            <View>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Hora y minuto
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} onChangeText={setHour} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} onChangeText={setMinute} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.characterLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect
            onChangeText={setDescription}
          />

          <View style={styles.footer}>
            <Button title="Registrar" onPress={handleSave} />
          </View>
        </View>

        {/* </Background> */}
      </ScrollView>

      <ModalView visible={openGuildModal} closeModal={handleCloseGuildModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;
