import React, { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Background from "../../components/Background";
import Header from "../../components/Header";
import CategorySelect from "../../components/CategorySelect";
import GuildIcon from "../../components/GuildIcon";
import SmallInput from "../../components/SmallInput";
import TextArea from "../../components/TextArea";
import { Button } from "../../components/Button";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

interface AppointmentCreateProps {}

function AppointmentCreate({}: AppointmentCreateProps) {
  const [category, setCategory] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        {/* <Background> */}
        <Header title="Registrar partida" />

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
          <RectButton>
            <View style={styles.select}>
              <View style={styles.image} />

              {/* <GuildIcon /> */}
              <View style={styles.selectBody}>
                <Text style={styles.label}>Seleccione un servidor</Text>
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
              <Text style={styles.label}>Día y mes</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Hora y minuto</Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.characterLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea multiline maxLength={100} numberOfLines={5} autoCorrect />

          <View style={styles.footer}>
            <Button title="Registrar" />
          </View>
        </View>

        {/* </Background> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;
