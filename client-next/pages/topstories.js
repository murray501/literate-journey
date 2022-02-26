import axiosConfig from "../axiosConfig"

async function getItem(Id) {
    return axiosConfig.get('/item/' + Id + '.json')
        .then(result => {
           return result.data 
        },
        err => {
           console.log(err.message) 
        })
}

async function getAll() {
    return axiosConfig.get('/topstories.json')
        .then(result => {
            let promises = [];
            result.data.forEach(id => {
                promises.push(getItem(id));
            })
            return promises;
        },
        err => {
            console.log(err.message)
        }) 
}

export async function getServerSideProps(context) {
    const promises = await getAll();
    const data = await Promise.all(promises).catch((err) => console.log(err.message));

    console.log(data);
    
    return {
        props: {
            data: data
        }
    }

}

export default function Index({data}) {
    return (
        <section class="section">
            <div class="columns is-multiline">
                {data.map (x => <Story data={x} />)}
            </div>
        </section>
    )
}

function Story({data}) {
    const date = new Date(data.time * 1000).toLocaleDateString("en-US")
    const time = new Date(data.time * 1000).toLocaleTimeString("en-US")
    return (
        <div class="column is-6-tablet is-4-desktop is-3-widescreen">
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
        </div>
    )
}