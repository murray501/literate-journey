import { getBestStories } from "../getter";
import { Story } from "../components";

export async function getServerSideProps(context) {
    const data = await getBestStories();
    
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
                {data.map (x => <Story data={x} type='BestStories' />)}
            </div>
        </section>
    )
}

