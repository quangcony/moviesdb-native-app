import { View, Text, Dimensions } from "react-native";
import React from "react";

import YoutubePlayer from "react-native-youtube-iframe";

const { WIDTH } = Dimensions.get("screen").width;

const VideoItem = ({ video }) => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <View key={video.key}>
      <Text className="text-white text-[16px] font-semibold mt-6 mb-4 px-4">
        {video.name}
      </Text>
      <YoutubePlayer
        width={WIDTH}
        height={240}
        play={playing}
        videoId={video.key}
      />
    </View>
  );
};

export default VideoItem;
