import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

type FormProps = {
  onChangeText: (text: string) => void;
  value: string;
  label: string;
};

export const Form = ({ value, onChangeText, label }: FormProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#999",
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: "bold",
    color: "#999",
  },
});
