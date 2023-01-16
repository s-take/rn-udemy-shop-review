import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type IconButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  color?: string;
};

export const IconButton = ({
  onPress,
  name,
  color = "#000",
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
