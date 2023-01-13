import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { categories } from "../util/constants";
import MovieGrid from "../components/MovieGrid";
import GlobalStyles from "../components/GlobalStyles";
import { useTranslation } from "react-i18next";

const ExploreScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [active, setActive] = useState("movie");
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView
      className="flex-1 bg-[#15141F] relative"
      style={GlobalStyles.droidSafeArea}
    >
      {/* Text first section */}
      <View className="px-6 mt-4 max-w-[340px]">
        <Text className="text-white text-[26px] font-normal ">
          {t("ExploreTitle")}
        </Text>
      </View>
      {/* Input Search */}
      <View className="mx-6 mt-8  relative">
        {/* Search Icon */}
        <TouchableOpacity className="absolute top-0 left-0 w-[60px] h-[60px] items-center justify-center z-10">
          <FontAwesomeIcon icon={faSearch} color={"white"} size={18} />
        </TouchableOpacity>
        {/* Search input */}
        <TextInput
          onChangeText={setKeyword}
          value={keyword}
          placeholder={t("SearchPlaceholder")}
          placeholderTextColor={"gray"}
          clearButtonMode={"while-editing"}
          keyboardType="web-search"
          className="h-[60px] p-[10px] pl-[60px] bg-[#211F30] text-[#BBBBBB] text-[18px] rounded-[20px]"
        />
      </View>
      {/* Tab Categories */}
      <View className="px-6 mt-8">
        <ScrollView horizontal>
          {categories.map((item) => {
            return (
              <TouchableOpacity
                key={item.key}
                className="mr-10"
                onPress={() => {
                  setActive(item.key);
                }}
              >
                <Text
                  className={` text-[16px] ${
                    item.key === active
                      ? "text-white font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {item.key === "movie"
                    ? t("MovieTab")
                    : item.key === "tv"
                    ? t("TVSerieTab")
                    : t("ActorTab")}
                </Text>
                {item.key === active && (
                  <View className="w-[50%] h-[2px] bg-[#FF8F71] rounded-md"></View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* Grid Items*/}
      <View className="flex-1 mt-4 ">
        <MovieGrid category={active} keyword={keyword} />
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
