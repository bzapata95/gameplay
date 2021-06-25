import React from "react";
import { View, Text, FlatList } from "react-native";

import Guild, { GuildProps } from "../../components/Guild";
import DividerList from "../../components/DividerList";

import { styles } from "./styles";

interface GuildsProps {
  handleGuildSelect: (guild: GuildProps) => void;
}

function Guilds({ handleGuildSelect }: GuildsProps) {
  const guilds = [
    {
      id: "1",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "2",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "3",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "4",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "5",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "6",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "7",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "8",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
    {
      id: "9",
      name: "Legendarios",
      icon: null,
      owner: true,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <DividerList isCentered />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        ListHeaderComponent={() => <DividerList isCentered />}
      />
    </View>
  );
}

export default Guilds;
