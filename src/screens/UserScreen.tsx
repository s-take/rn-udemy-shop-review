import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { updateUser } from "../lib/firebase";
/* components */
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* contexts */
import { UserContext } from "../contexts/userContext";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";

type UserScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen = ({ navigation, route }: UserScreenProps) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user!.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    const updatedAt = Timestamp.now();
    if (user && user.id) {
      await updateUser(user.id, { name, updatedAt });
      setUser({ ...user, name, updatedAt });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
