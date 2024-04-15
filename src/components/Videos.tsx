import { FC } from "react";
import { Stack, Box } from "@mui/material";

import VideoCard from "./VideoCard";
import { SearchVideosItem } from "../types/SearchVideos";

// --------------------------------------------------------------------------------------------------------------------

export type VideosProps = {
  videos: SearchVideosItem[];
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
};

const Videos: FC<VideosProps> = (props) => {
  const { videos, direction, ...other } = props;

  console.log(videos);

  return (
    <Stack
      direction={direction ? direction : "row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
      {...other}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>{item.id.videoId && <VideoCard video={item} />}</Box>
      ))}
    </Stack>
  );
};

export default Videos;
