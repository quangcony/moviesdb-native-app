import { View, Text, Image, FlatList, Dimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Rocket } from "../assets";
import tmdpApi from "../util/api/tmdpApi";
import VideoItem from "../components/VideoItem";

const width = Dimensions.get("screen").width;

const VideosScreen = ({ route, navigation }) => {
  const [videos, setVideos] = useState([]);
  const { category, id } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FF8F71",
        shadowColor: "white",
      },
      headerTitle: () => (
        <View className="flex-row">
          <Text className="text-white text-[18px] capitalize">Trailers</Text>
          <Image source={Rocket} className="w-[24px] h-[24px] ml-2" />
        </View>
      ),
      headerTintColor: "white",
      headerBackTitleVisible: false,
    });
  }, []);

  useEffect(() => {
    const getList = async () => {
      const response = await tmdpApi.getVideos(category, id, { params: {} });
      setVideos(response.results);
    };
    getList();
  }, [category, id]);

  const renderItem = ({ item }) => {
    return <VideoItem video={item} key={item.key} />;
  };

  return (
    <View
      className="flex-1 bg-[#15141f] relative pt-4 "
      style={{ backgroundColor: "#15141f" }}
    >
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default VideosScreen;
