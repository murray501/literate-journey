import axiosConfig from "./axiosConfig";

export async function getItem(Id) {
    return axiosConfig.get('/item/' + Id + '.json')
        .then(result => {
           return result.data 
        },
        err => {
           console.log(err.message) 
        })
}

export async function getKids(ids) {
    let promises = [];
    ids.forEach(id => {
        promises.push(getItem(id));
    })
    return promises;
}

export async function getTopStories() {
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