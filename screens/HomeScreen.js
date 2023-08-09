import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import MovieList from "../components/MovieList";
import { category, movieType } from "../util/api/tmdpApi";
import { AntDesign } from "@expo/vector-icons";

// import GlobalStyles from "../components/GlobalStyles";
import { TRENDING_TABS } from "../util/constants";
import MovieItems from "../components/MovieItems";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

// const wait = (timeout) => {
//   return new Promise((resolve) => setTimeout(resolve, timeout));
// };

const HomeScreen = ({ navigation }) => {
  const [active, setActive] = useState("day");
  // const [refreshing, setRefreshing] = useState(false);
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  return (
    // <View
    //   className="flex-1 bg-[#15141F] relative"
    //   // style={GlobalStyles.droidSafeArea}
    // >
    <ScrollView
      className="flex-1 bg-[#15141F] relative"
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    >
      {/* Head */}
      <Header type={movieType.upcoming} />
      {/* End Head */}

      {/* Now playing Movies */}
      <View className="mt-8 pl-6">
        <View className="flex-row items-center">
          <Text className="text-slate-200 text-[20px] font-normal mr-2">
            {/* Pupular Movies */}
            {t("NowPlayingMovies")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movies", {
                category: category.movie,
                type: movieType.now_playing,
              })
            }
          >
            <AntDesign name="right" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <MovieList category={category.movie} type={movieType.popular} />
      </View>

      {/* Trending*/}
      <View className="mt-8 ">
        <Text className="text-slate-200 text-[20px] font-normal px-6 mr-2">
          {t("Trending")}
        </Text>

        {/* Tab Categories */}
        <View className="mt-4 flex-row px-6">
          {TRENDING_TABS.map((item) => {
            return (
              <TouchableOpacity
                key={item.key}
                className="mr-10"
                onPress={() => {
                  setActive(item.key);
                }}
              >
                <Text
                  className={` text-lg ${
                    item.key === active
                      ? "text-white font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {item.key === "day" ? t("TodayTab") : t("WeekTab")}
                </Text>
                {item.key === active && (
                  <View className="w-[70%] h-[2px] bg-[#FF8F71] rounded-md"></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        {/* End Tab Categories */}

        {/* Movie List - Items */}
        <MovieItems mediaType={category.all} timeWindow={active} />
      </View>

      {/* Top Rated movies*/}
      <View className="mt-8 pl-6">
        <View className="flex-row items-center">
          <Text className="text-slate-200 text-[20px] font-normal mr-2">
            {t("TopRatedMovies")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movies", {
                category: category.movie,
                type: movieType.top_rated,
              })
            }
          >
            <AntDesign name="right" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </View>

      {/* Trending TV */}
      <View className="mt-8 pl-6">
        <View className="flex-row items-center">
          <Text className="text-slate-200 text-[20px] font-normal mr-2">
            {t("PopularTV")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movies", {
                category: category.tv,
                type: movieType.popular,
              })
            }
          >
            <AntDesign name="right" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <MovieList category={category.tv} type={movieType.popular} />
      </View>

      {/* Top rated TV*/}
      <View className="mt-8 pl-6">
        <View className="flex-row items-center">
          <Text className="text-slate-200 text-[20px] font-normal mr-2">
            {t("TopRatedTV")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movies", {
                category: category.tv,
                type: movieType.top_rated,
              })
            }
          >
            <AntDesign name="right" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <MovieList category={category.tv} type={movieType.top_rated} />
      </View>
    </ScrollView>
    // </View>
  );
};

export default HomeScreen;
