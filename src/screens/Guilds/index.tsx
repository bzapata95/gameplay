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
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={DividerList}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}

export default Guilds;
