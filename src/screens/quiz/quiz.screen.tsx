import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { connect } from "react-redux";
import AnswerItem from "../../components/wg.answer.component";
import { setData } from "./store/quiz.action";
import { QuizService } from "./store/quiz.service";
import { QuizStateModel } from "./store/quiz.store";

const QuizScreen = (props: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    wordGenerate();
  }, []);

  const [wrong, setWrong] = useState({
    button1: null,
    button2: null,
  });

  const [wordCount, setWordCount] = useState({
    wordCountField: 1,
  });

  const [learnedWord, setlearnedWord] = useState(false);

  function learnWord() {
    if (props.dayWords <= wordCount.wordCountField) {
      Alert.alert(
        "Uyarı",
        "Günlük kelime hedefine ulaştın. Öğrendiğin kelimeleri tekrar etmek istiyor musun? ",
        [
          {
            text: "Evet",
            onPress: () => {
              setlearnedWord(true);
            },
          },
          {
            text: "Hayır",
            onPress: () => {
              navigation.goBack();
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }

    setWordCount({
      ...wordCount,
      wordCountField: wordCount.wordCountField + 1,
    });

    //props.learnWord(props.selectWordEng);
  }

  function wordGenerate() {
    if (learnedWord === true) {
      props.getDayWords(props.selectCategory, 1);
    } else {
      props.getDayWords(props.selectCategory, 0);
    }
    setWrong({ ...wrong, button1: null, button2: null });
  }

  function buttonStatus(button: string, choice: string) {
    if (props.selectWordTr === choice) {
      if (button === "button1") {
        setWrong({ ...wrong, button1: false });
      } else {
        setWrong({ ...wrong, button2: false });
      }

      if (learnedWord === false) {
        learnWord();
      }
    } else {
      if (button === "button1") {
        setWrong({ ...wrong, button1: true });
      } else {
        setWrong({ ...wrong, button2: true });
      }
    }

    setTimeout(() => {
      wordGenerate();
    }, 500);
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
            buttonStatus("button1", props.choiceOne);
          }}
          title={props.choiceOne}
          isWrong={wrong.button1}
        ></AnswerItem>

        <View style={{ marginBottom: 50 }}></View>

        <AnswerItem
          onPress={() => {
            buttonStatus("button2", props.choiceTwo);
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
  choiceOne: quiz.choiceOne,
  choiceTwo: quiz.choiceTwo,
  dayWords: quiz.dayWords,
  selectCategory: quiz.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  setData: (payload: any) => dispatch(setData(payload)),
  getDayWords: (category: string, learned: number) =>
    dispatch(QuizService.getDayWords(category, learned)),
  learnWord: (word: string) => dispatch(QuizService.learnWord(word)),
});

type Props = {
  selectWordEng: string;
  selectWordTr: string;
  wrongWord: string;
  choiceOne: string;
  choiceTwo: string;
  selectCategory: string;
  dayWords: number;
  setData: (payload: any) => any;
  getDayWords: (category: string, learned: number) => any;
  learnWord: (word: string) => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
