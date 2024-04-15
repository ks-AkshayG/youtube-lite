import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import Videos from "./Videos";
import Loader from "./Loader";
import { useSignIn } from "../utils/GlobalSignInState";

import { fetchFromAPI } from "../utils/fetchFromApi";

import { VideoDetails, VideoDetailsItem } from "../types/VideoDetails";
import { SearchVideos, SearchVideosItem } from "../types/SearchVideos";

// --------------------------------------------------------------------------------------------------------------------

export type VideoDetailProps = {};

const VideoDetail: FC<VideoDetailProps> = (props) => {
  const { ...other } = props;
  const { id } = useParams();

  const [videoDetails, setVideoDetails] = useState<VideoDetailsItem>();
  const [relatedVideos, setRelatedVideos] = useState<SearchVideosItem[]>();

  const { isSignIn } = useSignIn();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(
      (data: VideoDetails) => setVideoDetails(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data: SearchVideos) => setRelatedVideos(data.items)
    );
  }, [id]);

  return (
    <>
      {isSignIn ? (
        <Box minHeight="95vh" {...other}>
          <Stack direction={{ xs: "column", md: "row" }}>
            {videoDetails ? (
              <Box flex={1}>
                <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    className="react-player"
                    controls
                  />

                  <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                    {videoDetails?.snippet.title}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ color: "#fff" }}
                    py={1}
                    px={2}
                  >
                    <Link to={`channel/${videoDetails?.snippet.channelId}`}>
                      <Typography variant="h6" color="#fff">
                        {videoDetails?.snippet.channelTitle}
                        <CheckCircle
                          sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                        />
                      </Typography>
                    </Link>

                    <Stack direction="row" gap="20px" alignItems="center">
                      {videoDetails?.statistics.viewCount && (
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>
                          {parseInt(
                            videoDetails.statistics.viewCount
                          ).toLocaleString()}{" "}
                          views
                        </Typography>
                      )}

                      {videoDetails?.statistics.likeCount && (
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>
                          {parseInt(
                            videoDetails.statistics.viewCount
                          ).toLocaleString()}{" "}
                          likes
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <Loader />
            )}

            {relatedVideos && relatedVideos.length > 0 ? (
              <Box
                px={2}
                py={{ md: 1, xs: 5 }}
                justifyContent="center"
                alignItems="center"
              >
                <Videos videos={relatedVideos} direction="column" />
              </Box>
            ) : (
              <Loader />
            )}
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#f00",
          }}
        >
          You are not sign in
        </Box>
      )}
    </>
  );
};

export default VideoDetail;
