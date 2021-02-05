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

  const barPercent: number = (props.learnedWords / props.totalWords) * 100;
  const percent: string = barPercent.toString() + "%";
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
          padding: 20,
        }}
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ color: "#fff", fontSize: 21, marginBottom: 10 }}>
            {props.title}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 3,
          }}
        >
          <Text style={{ color: "#fff" }}>{percent}</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "#9c9c9c",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              width: percent,
              height: 5,
              backgroundColor: "#fff",
              borderRadius: 5,
            }}
          ></View>
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
