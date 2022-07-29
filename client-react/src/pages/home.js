import React from "react";
import {Link} from "react-router-dom"

export default function Home() {
    return (
        <section>
            <div class="columns">
                <div class="column">
                    <Link to="topstories">Top Stories</Link>
                    <Link to="beststories">Best Stories</Link>
                    <Link to="newstories">New Stories</Link>
                    <Link to="askstories">Ask Stories</Link>
                    <Link to="showstories">Show Stories</Link>
                    <Link to="jobstories"> Job Stories</Link>
                    <Link to="bookmarks">Bookmarks</Link>
                </div>
            </div>
        </section>
    )
} 