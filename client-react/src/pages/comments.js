import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { getKids, getCache} from '../getter';
import parse from 'html-react-parser';

export default function Comments() {
    const {id, type} = useParams();
    
    const [parent, setParent] = useState(null);
    const [kids, setKids] = useState(null);

    useEffect(() => {
        setParent(getCache(parseInt(id), type));
    }, [id, type])

    useEffect(() => {     
        if (parent) {
            getKids(parent.kids)
            .then(setKids)
            .catch(console.error)
        }
    }, [parent])

    if (!parent || !kids) {
        return <div>loading...</div>
    }

    return (
        <section class="section">
            <Parent data={parent} />
            <Kids data={kids} />
        </section>
    )
}

function Kids({data}) {
    return (
        <div class="columns">
            <div class="column">
                {data.map (x => <CommentEach data={x} />)}
            </div>
        </div>
    )
}

function CommentEach({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const text = data.text ? parse(data.text) : ""
    const navigate = useNavigate();
    
    const goComment = () => {
        navigate(`/comments/${data.id}/comments`)
    }

    return (
        <article class="box">
            <div class="media">
                <div class="media-content">
                    <div class="content is-small">
                        {text}
                        By: {data.by} <br />
                        Date: {date} {time} <br />
                    </div>
                    {data.kids ? 
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <button class="level-item button is-small" onClick={goComment}>Comments</button>
                        </div>
                    </nav>
                    : 
                    <></>
                    }
                </div>
            </div>
        </article>
    )
}

function Story({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    return (
        <div class="content is-small">
            <a href={data.url}>{data.title}</a>
            By: {data.by} <br />
            Score: {data.score} <br />
            Date: {date} {time} <br />
        </div>
    )
}

function Comment({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const text = data.text ? parse(data.text) : ""
    return (
        <div class="content is-small">
            {text}
            ID: {data.id} <br />
            By: {data.by} <br />
            Date: {date} {time} <br />
        </div>
    )
}

function Parent({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    
    return (
        <div class="notification is-primary is-light">
            <article>
                <div class="media">
                    <div class="media-content">
                        {data.type === "story" ? <Story data={data} /> : <Comment data={data} /> }
                    </div>
                </div>
            </article>
        </div>
    )
}