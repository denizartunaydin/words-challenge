import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";
import CategoryItem from "../../components/wg.category.component";
import { advanced } from "../../words/advanced";
import { beginner } from "../../words/beginner";
import { elementary } from "../../words/elementary";
import { intermediate } from "../../words/intermediate";
import { preIntermediate } from "../../words/pre-intermediate";
import { upperIntermediate } from "../../words/upper-intermediate";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DbSettings } from "../core/db";
import { QuizService } from "../quiz/store/quiz.service";
import { setCategory } from "../quiz/store/quiz.action";

const HomeScreen = (props: Props) => {
  useEffect(() => {
    props.createDatabase();
  }, []);

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
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text style={{ color: "#fff", fontSize: 30 }}>Words Challenge</Text>
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.learnLevelCount();
                //navigation.navigate("Setting");
              }}
              style={{
                borderRadius: 10,
                padding: 10,
              }}
            >
              <MaterialCommunityIcons name="cog" color={"#fff"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <CategoryItem
          title="Beginner"
          totalWords={beginner.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("A1");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#AFA2F9" }}
        ></CategoryItem>
        <CategoryItem
          title="Elementary"
          totalWords={elementary.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("A2");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#17B8DA" }}
        ></CategoryItem>
        <CategoryItem
          title="Pre-Intermediate"
          totalWords={preIntermediate.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("B1");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#BBCD2B" }}
        ></CategoryItem>
        <CategoryItem
          title="Intermediate"
          totalWords={intermediate.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("B2");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#f6cd61" }}
        ></CategoryItem>
        <CategoryItem
          title="Upper-Indermediate"
          totalWords={upperIntermediate.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("C1");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#fe8a71" }}
        ></CategoryItem>
        <CategoryItem
          title="Advanced"
          totalWords={advanced.length}
          learnedWords={0}
          onPress={() => {
            props.setCategory("C2");
            navigation.navigate("Quiz");
          }}
          style={{ backgroundColor: "#E770D4" }}
        ></CategoryItem>
      </View>
    </>
  );
};

const mapStateToProps = ({}: {}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  getAllWords: () => dispatch(QuizService.getAllWords()),
  getCategoryWords: (level: string) =>
    dispatch(QuizService.getCategoryWords(level)),
  setCategory: (category: string) => dispatch(setCategory(category)),
  createDatabase: () => dispatch(DbSettings.createDatabase()),
  learnLevelCount: () => dispatch(QuizService.learnLevelCount()),
});

type Props = {
  getAllWords: () => any;
  getCategoryWords: (level: string) => any;
  setCategory: (category: string) => any;
  createDatabase: () => any;
  learnLevelCount: () => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
