import React, { useState } from "react";

import { View, FlatList } from "react-native";

import Profile from "../../components/Profile";
import ButtonAdd from "../../components/ButtonAdd";
import CategorySelect from "../../components/CategorySelect";
import ListHeader from "../../components/ListHeader";
import Appointment from "../../components/Appointment";
import DividerList from "../../components/DividerList";

import Background from "../../components/Background";

import { styles } from "./styles";

interface HomeProps {}

function Home({}: HomeProps) {
  const [category, setCategory] = useState("");

  const appointments = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendários",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 a las 20h",
      description: "An any description",
    },
    {
      id: "2",
      guild: {
        id: "1",
        name: "Lendários",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 a las 20h",
      description: "An any description",
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      <View style={styles.content}>
        <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <DividerList />}
        />
      </View>
    </Background>
  );
}

export default Home;
