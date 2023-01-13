import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import tmdpApi, {
  movieType,
  personType,
  tvType,
  category as cate,
} from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import { DefaultCastImg, DefaultMovieImg, NotFoundIcon } from "../assets";
import LoadmoreButton from "./LoadmoreButton";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const width = Dimensions.get("screen").width;
const spacer = 10;
const Size = (width - 48) / 2 - spacer;

const MovieGrid = ({ category, keyword }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === "") {
        const params = {};
        switch (category) {
          case cate.movie:
            response = await tmdpApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          case cate.person:
            response = await tmdpApi.getPeople(personType.popular, {
              params,
            });
            break;
          default:
            response = await tmdpApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdpApi.search(category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [category, keyword, apiConfig.language]);

  //   Loadmore button clicked
  const Loadmore = async () => {
    let response = null;
    if (keyword === "") {
      const params = {
        page: page + 1,
      };
      switch (category) {
        case cate.movie:
          response = await tmdpApi.getMovieList(movieType.upcoming, {
            params,
          });
          break;
        case cate.person:
          response = await tmdpApi.getPeople(personType.popular, {
            params,
          });
          break;
        default:
          response = await tmdpApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdpApi.search(category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  const renderItem = ({ item }) => {
    let imagePath =
      item.poster_path || item.backdrop_path
        ? { uri: apiConfig.w500Image(item.poster_path || item.backdrop_path) }
        : DefaultMovieImg;

    if (item.profile_path)
      imagePath = item.profile_path
        ? { uri: apiConfig.w500Image(item.profile_path) }
        : DefaultCastImg;

    return (
      <TouchableOpacity
        className="mt-4"
        style={{ width: Size }}
        onPress={() =>
          navigation.push(item.gender ? "CastDetail" : "Detail", {
            category,
            id: item.id,
          })
        }
      >
        <Image source={imagePath} className="rounded-[20px] w-full h-[200px]" />
        <Text className="text-[18px] text-white mt-4" numberOfLines={2}>
          {item.title || item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={items}
      numColumns={2}
      contentContainerStyle={{ flexGrow: 1 }}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 10,
        paddingHorizontal: 24,
      }}
      ListFooterComponent={() =>
        page < totalPage ? <LoadmoreButton onPress={Loadmore} /> : null
      }
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center p-6">
          <Image source={NotFoundIcon} className="w-[250px] h-[250px]" />
          <Text className="text-white text-[28px] font-semibold text-center">
            {t("NoResultTitle")}
          </Text>
          <Text className="text-white text-[14px] text-center mt-2 leading-6">
            {t("NoResultSmall")}
            <Text className="text-[#FF8F71] font-bold">{keyword}. </Text>
            {t("NoResultSmall2")}
          </Text>
        </View>
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MovieGrid;
