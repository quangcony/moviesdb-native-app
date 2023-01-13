import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import apiConfig from "../util/api/apiConfig";
import { category } from "../util/api/tmdpApi";
import { useTranslation } from "react-i18next";
const { width } = Dimensions.get("window");

const HeroSlide = ({ items, onIndexChange }) => {
  const [activeSlide, setActiveSlide] = useState();
  const navigation = useNavigation();
  const imgWidth = width - 48;
  const carousel = useRef();
  const { t, i18n } = useTranslation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          navigation.navigate("Detail", {
            category: category.movie,
            id: item.id,
          })
        }
        className="relative items-center justify-center mx-6 "
      >
        <Image
          source={{
            uri: apiConfig.w500Image(item.poster_path || item.backdrop_path),
          }}
          className="rounded-[10px]"
          style={{ width: imgWidth, height: 210 }}
        />
        <View className="absolute left-0 bottom-4 flex-row items-center px-6 py-4 bg-white/30 rounded-[24px] ">
          <View className="w-10 h-10 rounded-full items-center justify-center bg-[#FF8F71] mr-4">
            <FontAwesomeIcon icon={faPlay} color={"white"} size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-slate-700 text-[18px] font-semibold">
              {t("WatchNow")}
            </Text>
            <Text className="text-slate-200 text-[20px]" numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        ref={carousel}
        data={items}
        renderItem={renderItem}
        autoplay={true}
        autoplayDelay={3000}
        onSnapToItem={(index) => {
          setActiveSlide(index);
          onIndexChange(index);
        }}
        sliderWidth={width}
        itemWidth={imgWidth}
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "transparent" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
    // <Swiper
    //   // autoplay={true}
    //   //   autoplayTimeout={3}
    //   loop={false}
    //   style={{ height: 210, marginBottom: 15 }}
    //   onIndexChanged={onIndexChange}
    //   dot={<View className="bg-white/40 w-[8px] h-[4px] rounded-md m-0.5" />}
    //   activeDot={
    //     <View className="bg-white w-[12px] h-[4px] rounded-md m-0.5" />
    //   }
    // >
    //   {items.map((item, index) => (
    //     <TouchableOpacity
    //       key={item.id}
    //       onPress={() =>
    //         navigation.navigate("Detail", {
    //           category: category.movie,
    //           id: item.id,
    //         })
    //       }
    //       className="relative items-center justify-center mx-6 px-6"
    //     >
    //       <Image
    //         source={{
    //           uri: apiConfig.w500Image(item.poster_path || item.backdrop_path),
    //         }}
    //         className="rounded-[10px]"
    //         style={{ width: imgWidth, height: 210 }}
    //       />
    //       <View className="absolute left-4 bottom-4 flex-row items-center px-6 py-4 bg-white/30 rounded-[24px] w-full">
    //         <View className="w-10 h-10 rounded-full items-center justify-center bg-[#FF8F71] mr-4">
    //           <FontAwesomeIcon icon={faPlay} color={"white"} size={18} />
    //         </View>
    //         <View className="flex-1">
    //           <Text className="text-slate-700 text-[18px] font-semibold">
    //             Continue Watching
    //           </Text>
    //           <Text className="text-slate-200 text-[20px]" numberOfLines={2}>
    //             {item.title}
    //           </Text>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
    //   ))}
    // </Swiper>
  );
};

export default HeroSlide;
