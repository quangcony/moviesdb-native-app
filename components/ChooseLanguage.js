import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
// import tmdpApi from "../util/api/tmdpApi";
import { LANGUAGES } from "../util/constants";
import apiConfig from "../util/api/apiConfig";

import { useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";

const ChooseLanguage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(getLocales()[0].languageCode);
  const { t, i18n } = useTranslation();

  // alert(JSON.stringify(getLocales()));

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={LANGUAGES}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={() => {
        i18n.changeLanguage(value);
        apiConfig.language = value;
      }}
      // itemKey={value}
      schema={{
        label: "english_name",
        value: "iso_639_1",
      }}
      theme="DARK"
    />
  );
};

export default ChooseLanguage;
