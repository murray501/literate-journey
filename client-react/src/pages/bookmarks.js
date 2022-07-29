import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { loadJSON, saveJSON } from "./../getter";
import parse from 'html-react-parser';
import { Tabs } from "./../components";

function Story({data, onRemove = f => f}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const navigate = useNavigate();

    const goComment = () => {
        navigate(`/comments/${data.id}/bookmarks`)
    }

    const goBookmark = () => {
        onRemove(data.id)
    }

    return (
        <tr>
            {data.type === 'comments' ? 
              <td>{parse(data.text)}</td>
            : <td><a href={data.url}>{data.title}</a></td>
            }
            <td>{data.by}</td>
            <td>{data.score}</td>
            <td>{date} {time}</td>
            <td>{data.type}</td>
            <td>    
                <button class="button is-small" onClick={goComment}>Comments</button>            
            </td>
            <td>    
                <button class="button is-small" onClick={goBookmark}>Remove</button>            
            </td>
        </tr>
    )
}

export default function Bookmarks() {
    return (
        <div class="container">
            <Tabs story='bookmarks' />
            <ShowBookmarks />
        </div>
    )
}

function ShowBookmarks() {
    const [data, setData] = useState(loadJSON('bookmarks'));

    const remove = id => {
        const newData = data.filter(x => x.id !== id);
        setData(newData);
    }

    useEffect(() => {
        saveJSON('bookmarks', data);
    }, [data])

    return (
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>By</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Comments</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {data?.map (x => <Story data={x} onRemove={remove}/>)}
            </tbody>
        </table>
    )
}