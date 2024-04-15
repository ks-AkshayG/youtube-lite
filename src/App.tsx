import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Box } from "@mui/material"

import Feed from "./components/Feed"
import ChannelDetail from "./components/ChannelDetail"
import Navbar from "./components/Navbar"
import SearchFeed from "./components/SearchFeed"
import VideoDetail from "./components/VideoDetail"

// --------------------------------------------------------------------------------------------------------------------

const App: FC = () => {

  return (
    <BrowserRouter>
      <Box sx={{backgroundColor: '#000'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
