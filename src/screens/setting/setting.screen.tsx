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

const SettingScreen = (props: Props) => {
  const navigation = useNavigation();

  var iosBar: ViewStyle = {};
  if (Platform.OS === "ios") {
    iosBar = { marginTop: 30 };
  }

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
              <TouchableOpacity style={{ ...styles.todayWordButton }}>
                <Text style={{ color: "#fff", fontSize: 16 }}> 5 Kelime</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.todayWordButton }}>
                <Text style={{ color: "#fff", fontSize: 16 }}> 10 Kelime</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.todayWordButton }}>
                <Text style={{ color: "#fff", fontSize: 16 }}> 15 Kelime</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Level Sıfırla */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Seviyeleri Sıfırla
            </Text>
          </View>

          {/* Words Challenge Hakkında */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Words Challenge Hakkında
            </Text>
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 10 }}>
              10 Kelime
            </Text>
          </View>

          {/* Destek ve Yardım */}
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Destek ve Yardım
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

const mapStateToProps = ({}: {}) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

type Props = {};

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
