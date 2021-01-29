import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";
import AnswerItem from "../../components/wg.answer.component";
import CategoryItem from "../../components/wg.category.component";
import { getItem, setItem, STORAGE_KEYS } from "../../storage/storage.service";
import { beginner } from "../../words/beginner";
import { setData } from "./store/quiz.action";
import { QuizStateModel } from "./store/quiz.store";

const QuizScreen = (props: Props) => {
  const data = [
    { en: "Hello", tr: "Merhaba" },
    { en: "Mom", tr: "Anne" },
  ];

  const [wrong, setWrong] = useState({
    button1: null,
    button2: null,
  });

  function learnedWord() {
    // let words: any;
    // words.push({
    //   en: props.selectWordEng,
    //   tr: props.selectWordTr,
    // });
    // setItem(STORAGE_KEYS.WORDS, words);
    // getItem(STORAGE_KEYS.WORDS).then((res) => {
    //   console.log(res);
    // });
  }

  useEffect(() => {
    newWordGenerate();
  }, []);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function newWordGenerate() {
    const trueData = beginner[getRandomInt(beginner.length)];
    const falseData = beginner[getRandomInt(beginner.length)];

    if (getRandomInt(10) % 2 === 0) {
      props.setData({
        selectWordEng: trueData.en,
        selectWordTr: trueData.tr,
        choiceOne: trueData.tr,
        choiceTwo: falseData.tr,
      });
    } else {
      props.setData({
        selectWordEng: trueData.en,
        selectWordTr: trueData.tr,
        choiceOne: falseData.tr,
        choiceTwo: trueData.tr,
      });
    }

    setWrong({ ...wrong, button1: null, button2: null });
  }

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
        <View style={{ marginBottom: 70 }}>
          <Text style={{ color: "#fff", fontSize: 25 }}>
            {props.selectWordEng}
          </Text>
        </View>

        <AnswerItem
          onPress={() => {
            if (props.selectWordTr === props.choiceOne) {
              setWrong({ ...wrong, button1: false });
              learnedWord();
            } else {
              setWrong({ ...wrong, button1: true });
            }

            setTimeout(() => {
              newWordGenerate();
            }, 500);
          }}
          title={props.choiceOne}
          isWrong={wrong.button1}
        ></AnswerItem>

        <View style={{ marginBottom: 50 }}></View>

        <AnswerItem
          onPress={() => {
            if (props.selectWordTr === props.choiceTwo) {
              setWrong({ ...wrong, button2: false });
              learnedWord();
            } else {
              setWrong({ ...wrong, button2: true });
            }

            setTimeout(() => {
              newWordGenerate();
            }, 500);
          }}
          title={props.choiceTwo}
          isWrong={wrong.button2}
        ></AnswerItem>
        <View></View>
      </View>
    </>
  );
};

const mapStateToProps = ({ quiz }: { quiz: QuizStateModel }) => ({
  selectWordEng: quiz.selectWordEng,
  selectWordTr: quiz.selectWordTr,
  wrongWord: quiz.wrongWord,
  choiceOne: quiz.choiceOne,
  choiceTwo: quiz.choiceTwo,
});

const mapDispatchToProps = (dispatch: any) => ({
  setData: (payload: any) => dispatch(setData(payload)),
});

type Props = {
  selectWordEng: string;
  selectWordTr: string;
  wrongWord: string;
  choiceOne: string;
  choiceTwo: string;
  setData: (payload: any) => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
