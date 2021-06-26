import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import Guild, { GuildProps } from "../../components/Guild";
import DividerList from "../../components/DividerList";

import { styles } from "./styles";
import Load from "../../components/Load";
import discordApi from "../../services/discordApi";

interface GuildsProps {
  handleGuildSelect: (guild: GuildProps) => void;
}

function Guilds({ handleGuildSelect }: GuildsProps) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchGuilds() {
    setLoading(true);
    const response = await discordApi.get(`/users/@me/guilds`);
    console.log(response.data);
    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
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
      )}
    </View>
  );
}

export default Guilds;
