import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import { getItem, setItem, STORAGE_KEYS } from "../../storage/storage.service";
import { setDayWord } from "../quiz/store/quiz.action";
import { QuizStateModel } from "../quiz/store/quiz.store";

const SettingScreen = (props: Props) => {
  const navigation = useNavigation();

  var iosBar: ViewStyle = {};
  var five: ViewStyle = {};
  var ten: ViewStyle = {};
  var fifteen: ViewStyle = {};

  if (Platform.OS === "ios") {
    iosBar = { marginTop: 30 };
  }

  function setDayWord(count: string) {
    setItem(STORAGE_KEYS.DAY_WORD, count).then((res: any) => {
      getItem(STORAGE_KEYS.DAY_WORD).then((res) => {
        console.log(res);
        if (res !== null) {
          props.setDayWord(Number(res));
          navigation.goBack();
        }
      });
    });
  }

  switch (props.dayWords) {
    case 5:
      five = { backgroundColor: "#29A19C" };
      break;

    case 10:
      ten = { backgroundColor: "#29A19C" };
      break;
    case 15:
      fifteen = { backgroundColor: "#29A19C" };
      break;

    default:
      break;
  }

  console.log(props.dayWords);

  return (
    <>
      <View
        style={{
          padding: 30,
          backgroundColor: "#222831",
          height: "100%",
        }}
      >
        <View style={{ ...iosBar }}>
          <Text style={{ color: "#fff", fontSize: 25 }}>Ayarlar</Text>

          {/* Günlük Kelime Hedefi */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Günlük Kelime Hedefi
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setDayWord("5")}
                style={{ ...styles.todayWordButton, ...five }}
              >
                <Text style={{ color: "#fff", fontSize: 16, ...five }}>
                  {" "}
                  5 Kelime
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDayWord("10")}
                style={{ ...styles.todayWordButton, ...ten }}
              >
                <Text style={{ color: "#fff", fontSize: 16, ...ten }}>
                  {" "}
                  10 Kelime
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDayWord("15")}
                style={{ ...styles.todayWordButton, ...fifteen }}
              >
                <Text style={{ color: "#fff", fontSize: 16, ...fifteen }}>
                  {" "}
                  15 Kelime
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Level Sıfırla */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Seviyeleri Sıfırla
            </Text>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              Seviye sıfırlama işleminde öğrendiğiniz tüm kelimeleri öğrenmemiş
              durumuna gelinmektedir. Bu işlemi yapınca geri dönüşü
              bulunmamaktadır o yüzden dikkat edilmelidir.
            </Text>
          </View>

          {/* Words Challenge Hakkında */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Words Challenge Hakkında
            </Text>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              Günlük hedeflerinizi kendiniz belirleyerek kelimeleri öğrenmekte
              ve tekrar etmenize yardımcı olmaktadır. Günlük tanımlanan
              kelimeler kadar yeni kelime öğrenmenizi sağlarken hedefe
              ulaştıktan sonra öğrendiğiniz kelimeleri size tekrardan sorarak
              kelimleri hafınazınızda tutmanıza yardımcı olur.
            </Text>
          </View>

          {/* Destek ve Yardım */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Destek ve Yardım
            </Text>

            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              Proje Yöneticisi: Deniz Artun Aydın
            </Text>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              E-Posta: denizartunaydin@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = ({ quiz }: { quiz: QuizStateModel }) => ({
  dayWords: quiz.dayWords,
});

const mapDispatchToProps = (dispatch: any) => ({
  setDayWord: (payload: number) => dispatch(setDayWord(payload)),
});

type Props = {
  dayWords: number;
  setDayWord: (payload: number) => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  todayWordButton: {
    marginRight: 15,
    marginTop: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
