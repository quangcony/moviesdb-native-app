import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const LoadmoreButton = ({ onPress }) => {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      className="mt-4 mb-6 items-center justify-center"
      onPress={onPress}
    >
      <View className=" w-[150px] p-2 border-2 border-white rounded-md">
        <Text className="text-orange-500 text-[16px] text-center">
          {t("LoadmoreTitle")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoadmoreButton;
