import React, { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import { Input } from "../../Components/Input/Input";
import { convertDateToString } from "../../utils/convertDate";
import { date } from "yup";
import { Controller } from "react-hook-form/dist/controller";
import { Tarefas } from "../../Components/Tarefas/Tarefas";

interface TaskData {
  nomeTarefa: string;
  dataEntrega: Date;
  concluida: boolean;
}

export function Lista({ route }: any) {
  const listName: string = route.params.nomeLista;
  const [show, setShow] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskData[]>([
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste2",
      dataEntrega: new Date(2023, 10, 12),
      concluida: false,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
    {
      nomeTarefa: "Teste",
      dataEntrega: new Date(2023, 10, 12),
      concluida: true,
    },
  ]);
  const nav = useNavigation();

  return (
    <Background>
      <SafeAreaView style={style.view}>
        <View>
          <View>
            <View style={style.rowView}>
              <Text style={style.label}>{listName}</Text>

              <Pressable>
                <Icon
                  color="#ffffff"
                  name="pen"
                  type="material-community"
                  onPress={() => nav.navigate("configs")}
                />
              </Pressable>
            </View>
            <View style={style.hr} />
            <View style={style.rowView}>
              <View style={style.colView}>
                <Input
                  labelValue="Criado em: "
                  defaultValue={convertDateToString(new Date(2023, 8, 15))}
                />
              </View>
              <View style={style.colView}>
                <Input
                  labelValue="Entregar em: "
                  defaultValue={convertDateToString(new Date(2023, 10, 22))}
                  onPressIn={() => setShow(true)}
                />
                {/* {
                  show &&
                  <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    onChange={onChange}
                  />
                } */}
              </View>
              <View style={style.colView}>
                <Text style={style.text}>Concluido</Text>
                <CheckBox center={true}></CheckBox>
              </View>
            </View>
          </View>

          <Text style={style.label2}>Tarefas</Text>
          <View style={style.view2}>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <Tarefas
                  nomeTarefa={item.nomeTarefa}
                  dataEntrega={item.dataEntrega}
                  concluida={item.concluida}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
            <View style={style.hr} />
            <View style={style.rowView}>
              <Text style={style.text}>Excluir lista</Text>

              <Pressable style={style.button2} onPress={() => {}}>
                <Text style={style.textButton}>Excluir</Text>
              </Pressable>
            </View>

            <View style={style.rowView}>
              <Pressable style={style.button} onPress={() => {}}>
                <Text style={style.textButton}>Salvar</Text>
              </Pressable>

              <Pressable style={style.button2} onPress={() => {}}>
                <Text style={style.textButton}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ opacity: 0.5 }}>
            <PlanetImage />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}
