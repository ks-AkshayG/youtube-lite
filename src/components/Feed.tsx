import { FC, useState, useEffect } from "react";

import { Box, Stack, Typography } from "@mui/material";

import SideBar from "./SideBar";
import Videos from "./Videos";
import Loader from "./Loader";

import { fetchFromAPI } from "../utils/fetchFromApi";
import { SearchVideosItem, SearchVideos } from "../types/SearchVideos";
import { useSignIn } from "../utils/GlobalSignInState";

// --------------------------------------------------------------------------------------------------------------------

export type FeedProps = {};

const Feed: FC<FeedProps> = (props) => {
  const { ...other } = props;

  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [videos, setVideos] = useState<SearchVideosItem[]>();

  const { isSignIn } = useSignIn();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(
      (data: SearchVideos) => setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }} {...other}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ color: "#fff" }}
        >
          Copyright 2023-24 Youtube Lite
        </Typography>
      </Box>

      {isSignIn ? (
        <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{
              color: "white",
            }}
          >
            {selectedCategory}

            <span style={{ color: "#F31503" }}> videos</span>
          </Typography>

          {videos && videos.length > 0 ? (
            <Videos videos={videos} />
          ) : (
            <Loader />
          )}
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
    </Stack>
  );
};

export default Feed;
