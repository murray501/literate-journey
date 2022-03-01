import { Router, useRouter } from 'next/router';

export function Story({data, type}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    const router = useRouter();
    
    const goComment = () => {
        router.push({
            pathname: "/comments",
            query: {id: data.id, type: type} 
        })
    }
    return (
        <div class="column is-6-tablet is-4-desktop is-3-widescreen">
            <article class="box">
                <div class="media">
                    <div class="media-content">
                        <div class="content is-small">
                            <a href={data.url}>{data.title}</a> <br />
                            By: {data.by} <br />
                            Score: {data.score} <br />
                            Date: {date} {time} <br />
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <button class="level-item button is-small" onClick={goComment}>Comments</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </article>
        </div>
    )
}