import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style";

import { Background } from "../../Components/Background/Background";
import { CardsList } from "../../Components/CardsList/CardsList";
import { PlanetImage } from "../../Components/Image";
import { getData } from "../../services/getData";
import { convertDateToString } from "../../utils/convertDate";
import { Cards } from "../../Components/Card/Card";

interface Card {
  title: string;
  subtitle: string;
}

export function Home() {
  const [card, setCard] = useState<Card[] | undefined>(undefined);

  const [componentCard, setComponentCard] = useState<string>("historic");
  const nav = useNavigation(); // Temporariamente para os testes;

  useEffect(() => {
    async function handleApi() {
      const [email, token] = await Promise.all([
        getData("email"),
        getData("access_token"),
      ]);

      if (componentCard == "list") {
        const { data, status } = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/user/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status == 200) {
          const cards = data.listas.map((el: any) => {
            return {
              title: el.nomeLista,
              subtitle: `Data de entrega: ${convertDateToString(
                el.dataEntrega
              )}`,
            };
          });

          setCard(cards);
        }
      }
    }
    handleApi();
  }, []);

  return (
    <Background>
      <View style={style.view}>
        {/* onPress temporariamente para testes */}
        <View style={style.rowView}>
          <Text style={style.label}>Elara</Text>

          <Pressable>
            <Icon
              color="#851397"
              size={40}
              name="settings"
              onPress={() => nav.navigate("configs")}
            />
          </Pressable>
        </View>
        <View style={style.hr} />

        {/* <View></View> espaçamento  */}

        <View style={{ opacity: 0.5 }}>
          <PlanetImage />
        </View>

        <Pressable>
          <Icon
            color="#851397"
            size={80}
            name="microphone"
            type="material-community"
            onPress={() => {}}
          />
        </Pressable>

        <View style={style.rowView2}>
          <Pressable>
            <Icon
              color={componentCard == "historic" ? "#851397" : "#ffffff"}
              size={30}
              name="clock-time-three-outline"
              type="material-community"
              onPress={() => setComponentCard("historic")}
            />
          </Pressable>
          <Icon
            color={componentCard == "list" ? "#851397" : "#ffffff"}
            size={40}
            name="list"
            onPress={() => setComponentCard("list")}
          />
          <Pressable>
            <Icon
              color={componentCard == "help" ? "#851397" : "#ffffff"}
              size={30}
              name="help-circle-outline"
              type="material-community"
              onPress={() => setComponentCard("help")}
            />
          </Pressable>
        </View>

        <View style={style.view2}>
          {componentCard == "list" ? (
            <FlatList
              data={card}
              renderItem={({ item }) => (
                <CardsList title={item.title} subTitle={item.subtitle} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <FlatList
              data={card}
              renderItem={({ item }) => (
                <Cards title={item.title} subTitle={item.subtitle} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </Background>
  );
}
