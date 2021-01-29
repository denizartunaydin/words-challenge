import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";

const SettingScreen = (props: Props) => {
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
        <Text>sdf</Text>
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
});
