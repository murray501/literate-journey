import { Router, useRouter } from 'next/router';
import { getItem, getKids } from '../getter';
import parse from 'html-react-parser';

export async function getServerSideProps(context) {
    const id = context.query.id;
    const parent = await getItem(id);
    const promises = await getKids(parent.kids);
    const kids = await Promise.all(promises).catch((err) => console.log(err.message));
    return {
        props: {
            parent: parent,
            kids: kids
        }
    }
}

export default function Index({parent, kids}) {
    return (
        <section class="section">
            <Parent data={parent} />
            <Comments data={kids} />
        </section>
    )
}

function Comments({data}) {
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
    const router = useRouter();
    
    const goComment = () => {
        router.push({
            pathname: "/comments",
            query: {id: data.id} 
        })
    }

    return (
        <article class="box">
            <div class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            ID: {data.id} <br />
                            By: {data.by} <br />
                            Date: {date} {time} <br />
                            {text}
                        </p>
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
        <p>
            ID: {data.id} <br />
            By: {data.by} <br />
            Score: {data.score} <br />
            Date: {date} {time} <br />
            Title: <a href={data.url}>{data.title}</a>
        </p>
    )
}

function Comment({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const text = data.text ? parse(data.text) : ""
    return (
        <p>
            ID: {data.id} <br />
            By: {data.by} <br />
            Date: {date} {time} <br />
            {text}
        </p>
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
                        <div class="content">
                            {data.type === "story" ? <Story data={data} /> : <Comment data={data} /> }
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}