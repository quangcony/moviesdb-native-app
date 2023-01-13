import React, { useEffect, useRef, useState } from "react";
import { Logo } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faPlay } from "@fortawesome/free-solid-svg-icons";
import HeroSlide from "./HeroSlide";
import { Image, ImageBackground, View, Dimensions } from "react-native";
import tmdpApi from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ type }) => {
  const [items, setItems] = useState([]);
  const [imgPath, setImgPath] = useState(
    "https://cdn.pixabay.com/photo/2022/12/04/15/10/game-7634718__340.jpg"
  );

  useEffect(() => {
    const getList = async () => {
      let response = await tmdpApi.getMovieList(type, {
        params: {},
      });
      setItems(response.results.slice(0, 5));
      setImgPath(apiConfig.w500Image(response.results[0].poster_path));
    };
    getList();
  }, [type, apiConfig.language]);

  const changeImageBg = (index) => {
    if (items) setImgPath(apiConfig.w500Image(items[index].poster_path));
  };

  return (
    <ImageBackground
      source={{
        uri: imgPath,
      }}
      resizeMode="cover"
      blurRadius={80}
    >
      <LinearGradient colors={["transparent", "#0f0f0f", "#15141f"]}>
        <View className="flex-row px-6 items-center justify-between mt-12">
          <Image source={Logo} />
          <FontAwesomeIcon icon={faBell} color={"white"} size={20} />
        </View>
        {/*Hero Slider */}
        <View className="mt-4">
          <HeroSlide items={items} onIndexChange={changeImageBg} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Header;
