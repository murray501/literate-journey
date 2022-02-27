import { getItem, getKids } from '../getter';

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
            <Story data={parent} />
            <Comments data={kids} />
        </section>
    )
}

function Comments({data}) {
    return (
        <div class="columns">
            <div class="column">
                {data.map (x => <Comment data={x} />)}
            </div>
        </div>
    )
}

function Comment({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    
    return (
        <article class="box">
            <div class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            By: {data.by} <br />
                            Date: {date} {time} <br />
                            Kids: {JSON.stringify(data.kids)} <br />
                            {data.text}
                        </p>
                    </div>
                    {data.kids ? 
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <button class="level-item button is-small">Comments</button>
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
        <article class="box">
            <div class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            By: {data.by} <br />
                            Score: {data.score} <br />
                            Date: {date} {time} <br />
                            Title: <a href={data.url}>{data.title}</a> <br />
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}
