import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";

/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ReviewItem } from "../components/ReviewItem";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Review } from "../types/review";
import { getReviews } from "../lib/firebase";
import { ReviewsContext } from "../contexts/reviewsContext";

type ShopScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">;
};

export const ShopScreen = ({ navigation, route }: ShopScreenProps) => {
  const { shop } = route.params;
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({ title: shop.name });

    const fetchReviews = async () => {
      const reviews = await getReviews(shop.id!);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id!}
        // keyExtractor={(item, index) => index.toString()}
      />
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
