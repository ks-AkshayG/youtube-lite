import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import Videos from "./Videos";
import { useSignIn } from "../utils/GlobalSignInState";

import { fetchFromAPI } from "../utils/fetchFromApi";
import { SearchVideosItem, SearchVideos } from "../types/SearchVideos";
import Loader from "./Loader";

// --------------------------------------------------------------------------------------------------------------------

export type SearchFeedProps = {};

const SearchFeed: FC<SearchFeedProps> = (props) => {
  const { ...other } = props;
  const { searchTerm } = useParams();

  const [videos, setVideos] = useState<SearchVideosItem[]>();
  const { isSignIn } = useSignIn();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then(
      (data: SearchVideos) => setVideos(data.items)
    );
  }, [searchTerm]);

  return (
    <>
      {isSignIn ? (
        videos && videos.length > 0 ? (
          <Box
            p={2}
            sx={{ overflow: "auto", height: "90vh", flex: 2 }}
            {...other}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={2}
              sx={{
                color: "white",
              }}
            >
              Search Results for:{" "}
              <span style={{ color: "#F31503" }}> {searchTerm} </span> videos
            </Typography>

            {videos && <Videos videos={videos} />}
          </Box>
        ) : (
          <Loader />
        )
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

export default SearchFeed;
