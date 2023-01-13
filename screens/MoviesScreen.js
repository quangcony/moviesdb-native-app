import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tmdpApi, {
  category as cate,
  movieTitle,
  movieType,
  tvTitle,
  tvType,
} from "../util/api/tmdpApi";
import { DefaultCastImg, DefaultMovieImg, Rocket } from "../assets";
import LoadmoreButton from "../components/LoadmoreButton";
import apiConfig from "../util/api/apiConfig";
import moment from "moment";
import { useTranslation } from "react-i18next";

const width = Dimensions.get("screen").width;
const spacer = 10;
const Size = (width - 48) / 2 - spacer;

const MoviesScreen = ({ route, navigation }) => {
  const [movies, setMovies] = useState([]);
  const { category, type, id } = route.params;
  // const [headerTitle, setHeaderTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { t, i18n } = useTranslation();
  let headerTitle = "";

  useEffect(() => {
    let title = "";
    if (type !== "similar") {
      switch (category) {
        case cate.movie:
          if (type === movieType.popular) title = t("PopularMovies");
          if (type === movieType.top_rated) title = t("TopRatedMovies");
          break;
        default:
          if (type === tvType.popular) title = t("PopularTV");
          if (type === tvType.top_rated) title = t("TopRatedTV");
      }
    } else {
      title = "Similar";
    }
    headerTitle = title;
  }, [category, type]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#FF8F71",
        shadowColor: "white",
      },
      headerTitle: () => (
        <View className="flex-row">
          <Text className="text-white text-[18px] capitalize">
            {headerTitle}
          </Text>
          <Image source={Rocket} className="w-[24px] h-[24px] ml-2" />
        </View>
      ),
      headerTintColor: "white",
      headerBackTitleVisible: false,
    });
  }, []);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (type !== "similar") {
        switch (category) {
          case cate.movie:
            response = await tmdpApi.getMovieList(type, { params });
            break;
          default:
            response = await tmdpApi.getTvList(type, { params });
        }
      } else {
        response = await tmdpApi.similar(category, id);
      }
      setMovies(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [category, type, id]);

  //   Loadmore button clicked
  const Loadmore = async () => {
    const getList = async () => {
      let response = null;
      const params = {
        page: page + 1,
      };

      if (type !== "similar") {
        switch (category) {
          case cate.movie:
            response = await tmdpApi.getMovieList(type, { params });
            break;
          default:
            response = await tmdpApi.getTvList(type, { params });
        }
      } else {
        response = await tmdpApi.similar(category, id);
      }
      setMovies([...movies, ...response.results]);
      setPage(page + 1);
    };
    getList();
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
        key={item.id}
        onPress={() =>
          navigation.push(item.gender ? "CastDetail" : "Detail", {
            category,
            id: item.id,
          })
        }
      >
        <Image source={imagePath} className="rounded-[20px] w-full h-[200px]" />
        <View className="pt-[16px] relative">
          <View className="absolute -top-[26px] left-0 w-[40px] h-[40px] rounded-full border-2 border-[#FF8F71] bg-black/30 items-center justify-center">
            <Text className="text-white text-[14px] font-semibold">
              {Math.round(item.vote_average * 10) / 10}
            </Text>
          </View>
          <Text className="text-[18px] text-white h-[45px]" numberOfLines={2}>
            {item.title || item.name}
          </Text>
          <Text className="text-[18px] text-slate-500 ">
            {moment(item.release_date).format("MMMM, DD YYYY")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="flex-1 bg-[#15141f] relative pt-4 "
      style={{ backgroundColor: "#15141f" }}
    >
      <FlatList
        data={movies}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 24,
        }}
        ListFooterComponent={() =>
          page < totalPage ? (
            <LoadmoreButton onPress={Loadmore} />
          ) : (
            <Text className="text-white text-center">End</Text>
          )
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MoviesScreen;
