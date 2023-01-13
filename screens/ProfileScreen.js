import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { DefaultCastImg, Logo } from "../assets";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalStyles from "../components/GlobalStyles";
import apiConfig from "../util/api/apiConfig";
import ChooseLanguage from "../components/ChooseLanguage";
import { useTranslation } from "react-i18next";

const ProfileScreen = ({ navigation }) => {
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
      {/* Head */}
      <View className="px-6 mt-4">
        <Image source={Logo} />
      </View>
      {/* profile */}
      <View className="mt-6 items-center justify-center">
        <Image
          source={DefaultCastImg}
          className="w-[90px] h-[90px] object-cover bg-slate-500 rounded-full"
        />
        <Text className="text-white text-[22px] font-semibold mt-4">
          Quang Dang
        </Text>
        <Text className="text-white text-[14px] font-normal mt-2">
          quang_dn@yourdomain.com
        </Text>
      </View>
      {/* Premium Regitry*/}
      <View className="flex-row m-6 p-4 items-center justify-between border-2 border-red-500 rounded-[30px]">
        <MaterialCommunityIcons name="crown" size={64} color="red" />
        <View>
          <Text className="text-red-500 text-[24px] font-semibold mt-4">
            Join Premium!
          </Text>
          <Text className="text-white text-[12px] font-normal mt-2">
            quang_dn@yourdomain.com
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color="red" />
      </View>
      {/* Configure */}
      <View className="flex-1 mt-2 px-6">
        {/* Edit profile */}
        <TouchableOpacity className="flex-row items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color="white"
            />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureProfile")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          />
        </TouchableOpacity>

        {/* Notification */}
        <TouchableOpacity className="flex-row mt-4 items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="white"
            />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureNotification")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          />
        </TouchableOpacity>

        {/* Download */}
        <TouchableOpacity className="flex-row mt-4 items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons
              name="cloud-download-outline"
              size={24}
              color="white"
            />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureDownload")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          />
        </TouchableOpacity>

        {/* Security */}
        <TouchableOpacity className="flex-row mt-4 items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons name="security" size={24} color="white" />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureSecurity")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          />
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity className="flex-row mt-4 items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons
              name="globe-model"
              size={24}
              color="white"
            />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureLanguage")}
            </Text>
          </View>
          {/* <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          /> */}
          <View className="w-[150px]">
            <ChooseLanguage />
          </View>
        </TouchableOpacity>

        {/* Dark mode */}
        <TouchableOpacity className="flex-row mt-4 items-center justify-between">
          <View className="flex-row">
            <MaterialCommunityIcons
              name="eye-outline"
              size={24}
              color="white"
            />
            <Text className="text-white text-[16px] ml-4">
              {t("ConfigureMode")}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
