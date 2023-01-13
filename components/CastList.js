import { Image, FlatList, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tmdpApi, { category as cate, movieType } from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import { DefaultCastImg } from "../assets";
import { useNavigation } from "@react-navigation/native";

const CastList = ({ category, id }) => {
  const navigation = useNavigation();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = await tmdpApi.credits(category, id);
      setCasts(response.cast);
    };
    getList();
  }, [category, id, apiConfig.language]);

  if (!casts) return <Text className="text-white">Loading...</Text>;

  const renderItem = ({ item }) => {
    const imgPath = item.profile_path
      ? { uri: apiConfig.w500Image(item.profile_path) }
      : DefaultCastImg;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CastDetail", {
            category: cate.person,
            id: item.id,
          })
        }
      >
        <Image source={imgPath} className="w-[120px] h-[150px] object-cover" />
        <Text className="text-white text-[12px] font-semibold mt-2">
          {item.name}
        </Text>
        <Text className="text-slate-500 text-[12px] font-semibold mt-2 max-w-[120px]">
          {item.character}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={casts}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="w-[10px] h-full"></View>}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CastList;
