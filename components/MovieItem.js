import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import apiConfig from "../util/api/apiConfig";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { DefaultMovieImg } from "../assets";
import moment from "moment/moment";

const MovieItem = ({ item, category }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const SIZE = width * 0.4;

  const imagePath =
    item.poster_path || item.backdrop_path
      ? { uri: apiConfig.w500Image(item.poster_path || item.backdrop_path) }
      : DefaultMovieImg;

  if (item.media_type) category = item.media_type;

  return (
    <TouchableOpacity
      style={{ width: SIZE }}
      key={item.id}
      onPress={() => navigation.navigate("Detail", { category, id: item.id })}
    >
      <View style={[styles.imageContainer]} className="relative">
        <Image source={imagePath} style={styles.image} />
        <View className="absolute top-4 right-4 px-4 py-2 bg-white/30 rounded-[20px]">
          <Text className="text-white/80 text-xs">IMDb</Text>
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={faStar} color={"#F3BE00"} size={20} />
            <Text className="text-white text-lg font-semibold ml-4">
              {Math.round(item.vote_average * 10) / 10}
            </Text>
          </View>
        </View>
        <View className="absolute  bottom-4 left-0 right-0 h-[60px] mx-4 p-1  bg-white/30 rounded-[20px] items-center justify-center">
          <Text className="text-white text-base text-center" numberOfLines={2}>
            {item.title || item.name}
          </Text>
        </View>
      </View>
      <View className="p-2">
        <Text className="text-slate-600 text-base ">
          {moment(item.release_date).format("LL")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 225,
    opacity: 0.7,
  },
});

export default MovieItem;
