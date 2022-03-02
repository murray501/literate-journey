import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Topstories from "./pages/topstories";
import Beststories from "./pages/beststories";
import Comments from "./pages/comments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topstories" element={<Topstories />} />
        <Route path="/beststories" element={<Beststories />} />
        <Route path="/comments/:id/:type" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
