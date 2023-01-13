import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import tmdpApi from "../util/api/tmdpApi";
import VideoItem from "./VideoItem";
import apiConfig from "../util/api/apiConfig";
import { AntDesign } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const VideoList = ({ category, id }) => {
  const [videos, setVideos] = React.useState([]);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    const getList = async () => {
      const response = await tmdpApi.getVideos(category, id, { params: {} });
      setVideos(response.results.slice(0, 2));
    };
    getList();
  }, [category, id, apiConfig.language]);

  if (videos.length === 0) return;

  return (
    <View className=" mt-2 ">
      <View className="flex-row items-center justify-between px-6">
        <Text className="text-white text-[20px] font-semibold mr-2">
          Trailers
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Videos", {
              category,
              id,
            })
          }
        >
          <AntDesign name="right" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {videos.map((video) => (
        <VideoItem video={video} key={video.key} />
      ))}
    </View>
  );
};

export default VideoList;
