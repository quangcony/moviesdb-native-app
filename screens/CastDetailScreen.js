import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import tmdpApi from "../util/api/tmdpApi";
import apiConfig from "../util/api/apiConfig";
import MovieCredits from "../components/MovieCredits";

const CastDetailScreen = ({ route, navigation }) => {
  const { category, id } = route.params;
  const [item, setItem] = useState({});
  const [biography, setBiography] = useState("");
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getDetail = async () => {
      let response = await tmdpApi.detail(category, id, { params: {} });
      setItem(response);
      setBiography(
        response.biography.length > 250
          ? `${response.biography.substring(0, 250)}...`
          : response.biography
      );
      setShowMore(response.biography.length > 249);
    };
    getDetail();
  }, [category, id]);

  return (
    <SafeAreaView
      className="flex-1 bg-[#15141f] relative"
      style={{ backgroundColor: "#15141f" }}
    >
      <View className="mx-6 absolute left-0 top-10 z-10">
        <TouchableOpacity color={"white"} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 mt-4">
        {/* Main info */}
        <View className="items-center mt-6">
          <Image
            source={{ uri: apiConfig.w500Image(item.profile_path) }}
            className="w-[150px] h-[150px] object-cover rounded-md"
          />
          <Text className="text-orange-500 text-[30px] font-semibold mt-4">
            {item.name}
          </Text>
        </View>
        {/* Personal info */}
        <View className="px-6 mt-6">
          <Text className="text-white text-[18px] font-semibold mt-4">
            Personal Info
          </Text>
          <View className="mt-4">
            <View className="mt-4">
              <Text className="text-white text-[16px] font-semibold">
                Know for
              </Text>
              <Text className="text-slate-400 text-[14px] mt-1">
                {item.known_for_department}
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-white text-[16px] font-semibold">
                Gender
              </Text>
              <Text className="text-slate-400 text-[14px] mt-1">
                {item.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-white text-[16px] font-semibold">
                Birthday
              </Text>
              <Text className="text-slate-400 text-[14px] mt-1">
                {moment(item.birthday).format("MMMM, DD YYYY")}
              </Text>
            </View>
            <View className="mt-4">
              <Text className="text-white text-[16px] font-semibold">
                Place of Birthday
              </Text>
              <Text className="text-slate-400 text-[14px] mt-1">
                {item.place_of_birth}
              </Text>
            </View>
          </View>
        </View>
        {/* End Personal info */}

        {/* Biography */}
        <View className="mt-6 px-6">
          <Text className="text-white text-[18px] font-semibold mt-4">
            Biography
          </Text>
          <Text className="text-slate-400 text-[14px] mt-1">{biography}</Text>
          {showMore && (
            <TouchableOpacity
              className="mt-1"
              onPress={() => {
                setBiography(item.biography);
                setShowMore(!showMore);
              }}
            >
              <Text className="text-white">Show more</Text>
            </TouchableOpacity>
          )}
          {!showMore && biography.length > 249 && (
            <TouchableOpacity
              className="mt-1"
              onPress={() => {
                setBiography(`${item.biography.substring(0, 255)}...`);
                setShowMore(!showMore);
              }}
            >
              <Text className="text-white">Show less</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Movie credits */}
        <View className="mt-4 pl-6">
          <Text className="text-white text-[18px] font-semibold mt-4">
            Know for
          </Text>

          <MovieCredits category={category} id={item.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CastDetailScreen;
