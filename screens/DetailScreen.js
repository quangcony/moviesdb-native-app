import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import tmdpApi from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import { LinearGradient } from "expo-linear-gradient";

import moment from "moment";
import CastList from "../components/CastList";
import VideoList from "../components/VideoList";
import MovieList from "../components/MovieList";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const DetailScreen = ({ route, navigation }) => {
  const [item, setItem] = React.useState({});
  const { category, id } = route.params;
  const [overview, setOverview] = React.useState("");
  const [showMore, setShowMore] = React.useState(false);
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getDetail = async () => {
      let response = await tmdpApi.detail(category, id, { params: {} });
      setItem(response);
      setOverview(
        response.overview.length > 250
          ? `${response.overview.substring(0, 250)}...`
          : response.overview
      );
      setShowMore(response.overview.length > 249);
    };
    getDetail();
  }, [category, id]);

  return (
    <ScrollView
      className="flex-1 bg-[#15141f] relative"
      style={{ backgroundColor: "#15141f" }}
    >
      <View className="mx-6 absolute left-0 top-10 z-10">
        <TouchableOpacity color={"white"} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={28} color="white" />
        </TouchableOpacity>
      </View>
      {/* Item detail*/}
      <ImageBackground
        source={{
          uri: apiConfig.originalImage(item.backdrop_path || item.poster_path),
        }}
        resizeMode="cover"
        className="w-full h-[320px] relative"
      >
        {/* Item info */}
        <View className="absolute left-0 -bottom-[50px] w-full">
          <LinearGradient
            colors={["transparent", "#0f0f0f", "#15141f"]}
            className="p-6"
          >
            <Text className="text-white text-[22px] font-semibold">
              {item.title}
            </Text>
            <View className="flex-row mt-2">
              {/* Time */}
              <View className="flex-row mr-6">
                <AntDesign name="clockcircleo" size={16} color="#BBBBBB" />
                <Text className="text-[#BBBBBB] text-[14px] font-medium ml-2">
                  {item.runtime} {t("Minute")}
                </Text>
              </View>
              {/* Rating */}
              <View className="flex-row">
                <AntDesign name="star" size={16} color="yellow" />
                <Text className="text-[#BBBBBB] text-[14px] font-medium ml-2">
                  {Math.round(item.vote_average * 10) / 10} (IMDb)
                </Text>
              </View>
            </View>

            {/* Release date and genres */}
            <View className="flex-row justify-between mt-6 pb-4">
              {/* Release date */}
              <View className="flex-1/2">
                <Text className="text-white text-[18px] font-medium ">
                  {t("ReleaseDate")}
                </Text>
                <Text className="text-[#BBBBBB] text-[14px] font-medium mt-1">
                  {moment(item.release_date).format("MMMM, DD YYYY")}
                </Text>
              </View>
              {/* Genre */}
              <View className="flex-1/2 ">
                <Text className="text-white text-[18px] font-medium ">
                  {t("Genres")}
                </Text>
                <View className="flex-row flex-wrap mt-1">
                  {item.genres?.map((genre) => (
                    <View
                      key={genre.name}
                      className="p-1.5 border-2 border-white rounded-[20px] mr-1.5 mb-1.5"
                    >
                      <Text className="text-white text-[12px] ">
                        {genre.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>

      {/* Description */}
      <View className="mt-2 px-6">
        <Text className="text-[#BBBBBB] text-[14px] font-medium mt-3">
          {overview}
        </Text>
        {showMore && (
          <TouchableOpacity
            className="mt-1"
            onPress={() => {
              setOverview(item.overview);
              setShowMore(!showMore);
            }}
          >
            <Text className="text-white">{t("ShowmoreTitle")}</Text>
          </TouchableOpacity>
        )}
        {!showMore && overview.length > 249 && (
          <TouchableOpacity
            className="mt-1"
            onPress={() => {
              setOverview(`${item.overview.substring(0, 255)}...`);
              setShowMore(!showMore);
            }}
          >
            <Text className="text-white">{t("ShowlessTitle")}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cast */}
      <View className="mt-4 pl-6">
        <Text className="text-white text-[18px] font-medium ">{t("Cast")}</Text>
        <View className="mt-4">
          <CastList category={category} id={id} />
        </View>
      </View>

      {/* Video player */}
      <View className="mt-6">
        {/* <Text className="text-white text-[24px] font-medium px-6 ">
          Trailers
        </Text> */}
        <VideoList category={category} id={id} />
      </View>

      {/* Related Movies */}
      <View className="mt-4 mb-10 pl-6">
        <Text className="text-white text-[18px] font-medium ">
          {t("RelatedMovie")}
        </Text>

        <MovieList category={category} type={"similar"} id={id} />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
