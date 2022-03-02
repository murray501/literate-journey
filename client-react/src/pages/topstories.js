import React, { useState, useEffect } from "react";

import { getStories } from "../getter";
import { Story } from "../components";

export default function Topstories() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getStories('topstories')
            .then(setData)
            .catch(console.error)
    }, [])

    if (data === null) {
        return <div>loading...</div>
    }
    
    return (
        <section class="section">
            <div class="columns is-multiline">
                {data.map (x => <Story data={x} type='topstories' />)}
            </div>
        </section>
    )
}