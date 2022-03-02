import React, { useState, useEffect } from "react";

import { getStories } from "../getter";
import { Story } from "../components";

export default function BestStories() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getStories('beststories')
            .then(setData)
            .catch(console.error)
    }, [])

    if (data === null) {
        return <div class="notification">loading...</div>
    }
    
    return (
        <section class="section">
            <div class="columns is-multiline">
                {data.map (x => <Story data={x} type='beststories' />)}
            </div>
        </section>
    )
}