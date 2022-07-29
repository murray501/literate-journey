import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import { getStories, saveBookmark } from "./getter";

function Story({data, type}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const navigate = useNavigate();
    
    const goComment = () => {
        navigate(`/comments/${data.id}/${type}`)
    }

    const goBookmark = () => {
        saveBookmark(data, type)
        navigate('/bookmarks')
    }

    return (
        <tr>
            <td><a href={data.url}>{data.title}</a></td>
            <td>{data.by}</td>
            <td>{data.score}</td>
            <td>{date} {time}</td>
            <td>    
                <button class="button is-small" onClick={goComment}>Comments</button>            
            </td>
            <td>    
                <button class="button is-small" onClick={goBookmark}>Bookmark</button>            
            </td>
        </tr>
    )
}

export function ShowPage({story}) {
    return (
        <div class="container">
            <Tabs story={story} />
            <ShowStories story={story} />
        </div>
    )
}

export function Tabs({story}) {
    return (
        <div class="tabs">
            <ul>
                <li class={story === 'topstories' ? 'is-active' : ''}><a href="/">Top Stories</a></li>
                <li class={story === 'beststories' ? 'is-active' : ''}><a href="/beststories">Best Stories</a></li>
                <li class={story === 'newstories' ? 'is-active' : ''}><a href="/newstories">New Stories</a></li>
                <li class={story === 'askstories' ? 'is-active' : ''}><a href="/askstories">Ask Stories</a></li>
                <li class={story === 'showstories' ? 'is-active' : ''}><a href="/showstories">Show Stories</a></li>
                <li class={story === 'jobstories' ? 'is-active' : ''}><a href="/jobstories"> Job Stories</a></li>
                <li class={story === 'bookmarks' ? 'is-active' : ''}><a href="/bookmarks">Bookmarks</a></li>
            </ul>
        </div>
    )
} 

function ShowStories({story}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getStories(story)
            .then(setData)
            .catch(console.error)
    }, [])

    if (data === null) {
        return <div>loading...</div>
    }
    
    return (
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>By</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Bookmark</th>
                </tr>
            </thead>
            <tbody>
                {data.map (x => <Story data={x} type={story} />)}
            </tbody>
            <tfoot>
                <tr>
                    <th>Title</th>
                    <th>By</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Bookmark</th>
                </tr>
            </tfoot>
        </table>
    )
}