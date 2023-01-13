import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tmdpApi, { category } from "../util/api/tmdpApi";
import MovieItem from "./MovieItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import apiConfig from "../util/api/apiConfig";
import { useTranslation } from "react-i18next";
// import axios from "axios";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=8151a26f17888f9d09496420f570361d`
  //     )
  //     .then((response) => setMovies(response.data.results));
  // }, [props.category, props.type]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdpApi.getMovieList(props.type, { params });
            break;
          default:
            response = await tmdpApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdpApi.similar(props.category, props.id);
      }
      setMovies(response.results.slice(0, 10));
    };

    getList();
  }, [props.category, props.type, props.id, apiConfig.language]);

  return (
    <View className="mt-4 relative">
      <FlatList
        data={movies}
        renderItem={(item) => (
          <MovieItem item={item.item} category={props.category} />
        )}
        ListFooterComponent={() => (
          <View className="w-[150px] h-[225px] items-center justify-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Movies", {
                  category: props.category,
                  type: props.type,
                  id: props.id,
                })
              }
            >
              <View className="w-[50px] h-[50px] rounded-full border-2 border-white items-center justify-center">
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>

            <Text className="text-white text-[18px] mt-2">{t("ViewAll")}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        ItemSeparatorComponent={() => <View className="w-[20px] h-full"></View>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieList;
