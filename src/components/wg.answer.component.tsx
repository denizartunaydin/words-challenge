import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const AnswerItem = (props: Props) => {
  const window = Dimensions.get("window");

  var answerBg: ViewStyle = {};
  var answerText: ViewStyle = {};
  if (props.isWrong === null) {
    answerBg = { backgroundColor: "#fff" };
    answerText = { color: "#000" };
  } else if (props.isWrong === true) {
    answerBg = { backgroundColor: "#e63946" };
    answerText = { color: "#fff" };
  } else {
    answerBg = { backgroundColor: "#138000" };
    answerText = { color: "#fff" };
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
        style={{
          ...answerBg,
          width: window.width - 80,
          height: 100,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ ...answerText, fontSize: 25 }}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

type Props = {
  title: string;
  isWrong: any;
  style?: ViewStyle;
  onPress: () => void;
};

export default AnswerItem;
