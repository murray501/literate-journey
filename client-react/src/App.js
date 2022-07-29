import React from "react";
import {Routes, Route} from "react-router-dom";
import TopStories from "./pages/topstories";
import NewStories from "./pages/newstories";
import BestStories from "./pages/beststories";
import AskStories from "./pages/askstories";
import Show_Stories from "./pages/showstories";
import JobStories from "./pages/jobstories";
import Comments from "./pages/comments";
import Bookmarks from "./pages/bookmarks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TopStories />} />
        <Route path="/newstories" element={<NewStories />} />
        <Route path="/beststories" element={<BestStories />} />
        <Route path="/askstories" element={<AskStories />} />
        <Route path="/showstories" element={<Show_Stories />} />
        <Route path="/jobstories" element={<JobStories />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/comments/:id/:type" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
