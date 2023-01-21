import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image } from "react-native";
import { pickImage } from "../lib/image-picker";
import { getExtention } from "../utils/file";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StartInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { UserContext } from "../contexts/userContext";
import { Timestamp } from "firebase/firestore";
import { Review } from "../types/review";
import { addReview, createReviewRef, uploadImage } from "../lib/firebase";
import { ReviewsContext } from "../contexts/reviewsContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    setLoading(true);
    // docIDを取得
    const reviewDocRef = createReviewRef(shop.id!);
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    const downloadUrl = await uploadImage(imageUri, storagePath);

    // firestoreに保存する
    const review = {
      id: reviewDocRef.id,
      user: {
        name: user?.name,
      },
      shop: {
        name: shop.name,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    } as Review;
    await addReview(shop.id!, review);

    // レビュー一覧に即時反映する
    setReviews([review, ...reviews]);

    // await addReview(shop.id || "", review);

    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = (await pickImage()) || "";
    setImageUri(uri);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={setScore} />
      <TextArea
        value={text}
        onChangeText={setText}
        label="レビュー"
        placeholder="レビューを書いてください"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button onPress={onSubmit} text="レビューを投稿する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
});
