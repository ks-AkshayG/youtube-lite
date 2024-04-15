import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import Videos from "./Videos";
import ChannelCard from "./ChannelCard";

import { fetchFromAPI } from "../utils/fetchFromApi";
import { ChannelDetails, ChannelDetailsItem } from "../types/ChannelDetails";
import { SearchVideos, SearchVideosItem } from "../types/SearchVideos";

// --------------------------------------------------------------------------------------------------------------------

export type ChannelDetailProps = {};

const ChannelDetail: FC<ChannelDetailProps> = (props) => {
  const { ...other } = props;
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState<ChannelDetailsItem>();
  const [videosDetail, setVideosDetail] = useState<SearchVideosItem[]>();

  console.log(videosDetail)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data: ChannelDetails) =>
      setChannelDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`).then(
      (data: SearchVideos) => setVideosDetail(data.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh" {...other}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />

        {channelDetail && (
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        )}
      </Box>

      <Box display="flex" p="2px">
        <Box sx={{ mr: { sm: "100px" } }} />
        {videosDetail && <Videos videos={videosDetail} />}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
