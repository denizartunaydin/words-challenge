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
import { beginner } from "../words/beginner";

const CategoryItem = (props: Props) => {
  const window = Dimensions.get("window");
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
        style={{
          ...props.style,
          width: window.width - 80,
          height: 100,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ color: "#fff", fontSize: 25, marginBottom: 10 }}>
            {props.title}
          </Text>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            Toplam Kelime: {props.totalWords}
          </Text>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            Öğrenilen Kelime: {props.learnedWords}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

type Props = {
  title: string;
  style?: ViewStyle;
  totalWords: number;
  learnedWords: number;
  onPress: () => void;
};

export default CategoryItem;
