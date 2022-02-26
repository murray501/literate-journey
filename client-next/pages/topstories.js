import axiosConfig from "../axiosConfig"

export async function getServerSideProps(context) {
    const result = await axiosConfig.get('/topstories.json').catch((err) => console.log(err.message));
    
    let promises = [];
    for (let i = 0; i < 10; i++) {
        const promise = axiosConfig.get('/item/' + result.data[i] + '.json');
        promises.push(promise);
    } 

    const result2 = await Promise.all(promises).catch((err) => console.log(err.message));

    console.log(result2);
    
    return {
        props: {
            data: result.data
        }
    }

}

export default function Index({data}) {
    return (
        <div>
            <p>Hello everyone!</p>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}