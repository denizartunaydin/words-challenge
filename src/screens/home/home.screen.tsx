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
import { QuizStateModel } from "../quiz/store/quiz.store";

const HomeScreen = (props: Props) => {
  useEffect(() => {
    props.createDatabase();
    props.learnLevelCount();
  }, []);

  const navigation = useNavigation();

  console.log(props.categories);

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
                //navigation.navigate("Setting");
                DbSettings.dropTable();
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
        {props.categories.map((category: any) => {
          return (
            <>
              <CategoryItem
                title={category.levelName}
                totalWords={category.totalWordCount}
                learnedWords={category.learnedCount}
                onPress={() => {
                  props.setCategory(category.level);
                  navigation.navigate("Quiz");
                }}
                style={{ backgroundColor: category.levelColor }}
              ></CategoryItem>
            </>
          );
        })}
      </View>
    </>
  );
};

const mapStateToProps = ({ quiz }: { quiz: QuizStateModel }) => ({
  categories: quiz.categories,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllWords: () => dispatch(QuizService.getAllWords()),
  getCategoryWords: (level: string) =>
    dispatch(QuizService.getCategoryWords(level)),
  setCategory: (category: string) => dispatch(setCategory(category)),
  createDatabase: () => dispatch(DbSettings.createDatabase()),
  learnLevelCount: () => dispatch(QuizService.learnLevelCount()),
});

type Props = {
  categories: any;
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
