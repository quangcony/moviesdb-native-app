import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tmdpApi from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("screen").width;

const MovieItems = ({ mediaType, timeWindow }) => {
  const [items, setItems] = useState([]);
  const itemWidth = WIDTH * 0.9;

  const navigation = useNavigation();

  useEffect(() => {
    const getList = async () => {
      let response = await tmdpApi.trending(mediaType, timeWindow, {
        params: {},
      });
      setItems(response.results);
    };
    getList();
  }, [mediaType, timeWindow, apiConfig.language]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(item.gender ? "CastDetail" : "Detail", {
          category: item.media_type,
          id: item.id,
        })
      }
    >
      <View className="flex-row items-center" style={{ width: itemWidth }}>
        <Image
          source={{
            uri: apiConfig.w500Image(
              item.poster_path || item.backdrop_path || item.profile_path
            ),
          }}
          className="w-[50px] h-[50px] mr-4 rounded-[8px]"
        />
        <View className="flex-1 pr-2">
          <Text
            className="text-white text-[14px] font-semibold"
            numberOfLines={1}
          >
            {item.title || item.name}
          </Text>
          <Text className="text-slate-500 text-[12px] mt-2">
            {Math.round(item.vote_average * 10) / 10} IDMb
            <Text className=" text-[14px] "> &#40;{item.vote_count}&#41;</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      className="mt-4"
      horizontal
      decelerationRate={0} //Set the de accelaration rate to 0, once the user lifts the finger
      snapToInterval={itemWidth} //Set the interval to snap to based on your contentInset props
      // snapToAlignment={"center"} //Set the alignmnet to a particular element to center
    >
      <FlatList
        data={items}
        numColumns={4}
        // listMode="SCROLLVIEW"
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 24,
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

export default MovieItems;
