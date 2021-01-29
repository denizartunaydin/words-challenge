import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";
import CategoryItem from "../../components/wg.category.component";
import { advenced } from "../../words/advenced";
import { beginner } from "../../words/beginner";
import { elementary } from "../../words/elementary";
import { intermediate } from "../../words/intermediate";
import { preIntermediate } from "../../words/pre-intermediate";
import { upperIntermediate } from "../../words/upper-intermediate";

const HomeScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          padding: 30,
          backgroundColor: "#222831",
          height: "100%",
          ...styles.center,
        }}
      >
        <CategoryItem
          title="Beginner"
          totalWords={beginner.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#AFA2F9" }}
        ></CategoryItem>
        <CategoryItem
          title="Elementary"
          totalWords={elementary.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#17B8DA" }}
        ></CategoryItem>
        <CategoryItem
          title="Pre-Intermediate"
          totalWords={preIntermediate.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#BBCD2B" }}
        ></CategoryItem>
        <CategoryItem
          title="Intermediate"
          totalWords={intermediate.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#f6cd61" }}
        ></CategoryItem>
        <CategoryItem
          title="Upper-Indermediate"
          totalWords={upperIntermediate.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#fe8a71" }}
        ></CategoryItem>
        <CategoryItem
          title="Advanced"
          totalWords={advenced.length}
          learnedWords={0}
          onPress={() => {
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#E770D4" }}
        ></CategoryItem>
      </View>
    </>
  );
};

const mapStateToProps = ({}: {}) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

type Props = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
