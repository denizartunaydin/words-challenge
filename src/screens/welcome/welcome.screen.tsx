import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
  Image,
} from "react-native";

import { connect } from "react-redux";
import { getItem, setItem, STORAGE_KEYS } from "../../storage/storage.service";
import { DbSettings } from "../core/db";
import { setDayWord } from "../quiz/store/quiz.action";
import { QuizStateModel } from "../quiz/store/quiz.store";

const WelcomeScreen = (props: Props) => {
  useEffect(() => {
    props.createDatabase();

    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
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
        <Image style={{}} source={require("../../assets/logo.png")} />
      </View>
    </>
  );
};

const mapStateToProps = ({ quiz }: { quiz: QuizStateModel }) => ({
  dayWords: quiz.dayWords,
});

const mapDispatchToProps = (dispatch: any) => ({
  setDayWord: (payload: number) => dispatch(setDayWord(payload)),
  createDatabase: () => dispatch(DbSettings.createDatabase()),
});

type Props = {
  dayWords: number;
  setDayWord: (payload: number) => any;
  createDatabase: () => any;
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
