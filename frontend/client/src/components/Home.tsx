import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ImagePickerComponent from "../components/ImagePicker";
import { StyleSheet } from "react-native";
import { API } from "../api";
import CommentSection from "./CommentSection";

interface HomeScreenProps {
  navigation: any;
  coords: {
    lat: number;
    lng: number;
  };
}

export function HomeScreen({ coords, navigation }: HomeScreenProps) {
  const [image, setImage] = useState<string>();
  const [comment, setComment] = useState<string>("qhdsjshd");
  const [modalVisible, setModalVisible] = useState(false);

  const accept = () => {
    setModalVisible(true);
  };

  const close = () => {
    setModalVisible(false);
  };

  const sendReport = () => {
    console.log(image);
    // console.log(comment);
    API.getInstance()
      .send_report({
        img: image!,
        text: comment,
        geo: `${coords.lat} ${coords.lng}`,
        user_id: "1",
      })
      .then(() => {
        console.log("Amogus");
      })
      .catch((e) => console.log(e.request));
    return;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ImagePickerComponent image={image} set={setImage} />
      <CommentSection set={setComment} message={comment} />
      <Button
        mode="outlined"
        style={styles.containerCoords}
        onPress={() => navigation.navigate("MapPicker")}
      >
        <View style={styles.view}>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Текущее местоположение:
          </Text>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {coords.lat}
          </Text>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {coords.lng}
          </Text>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            (нажмите, чтобы сменить)
          </Text>
        </View>
      </Button>

      {image != undefined && comment != "" ? (
        <View style={{ padding: 20 }}>
          <Button
            mode="outlined"
            onPress={() => accept()}
            style={styles.button}
          >
            Отправить
          </Button>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Уверены что хотите отправить данные?
              </Text>
              <View style={styles.confirm_view}>
                <Button
                  style={styles.button_confirm}
                  mode="contained"
                  onPress={() => {
                    sendReport();
                    setModalVisible(!modalVisible);
                  }}
                >
                  Подтвердить
                </Button>
                <Button
                  style={styles.button_confirm}
                  mode="contained"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  Отменить
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    gap: 5,
    padding: 20,
  },
  containerCoords: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },

  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  text: {
    color: "#006400",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  confirm_view: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 60,
  },
  button_confirm: {
    maxHeight: 50,
    margin: 3,
  },
});
