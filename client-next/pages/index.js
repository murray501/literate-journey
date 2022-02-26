import axiosConfig from "../axiosConfig"

export async function getServerSideProps(context) {
    const result = await axiosConfig.get('/item/30466733.json').catch((err) => console.log(err.message));
    console.log("result");
    console.log(result.data);
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