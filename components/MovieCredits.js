import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tmdpApi from "../util/api/tmdpApi";
import MovieItem from "./MovieItem";
import apiConfig from "../util/api/apiConfig";

const MovieCredits = ({ category, id }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = await tmdpApi.getCombinedCredits(category, id, {
        params: {},
      });
      setMovies(response.cast);
    };
    getList();
  }, [category, id, apiConfig.language]);

  return (
    <View className="mt-4">
      <FlatList
        data={movies}
        renderItem={(item) => (
          <MovieItem item={item.item} category={category} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        ItemSeparatorComponent={() => <View className="w-[20px] h-full"></View>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieCredits;
