import axiosConfig from "./axiosConfig";

const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

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
    const data = await Promise.all(promises).catch((err) => console.log(err.message));
    const previous = loadJSON('comments');
    if (previous) {
        previous.push(...data);
        saveJSON('comments', previous);
    } else {
        saveJSON('comments', data);
    }
    return data;
}

export function getCache(id, type) {
    const data = loadJSON(type);
    if (data) {
        return data.find(x => x.id === id);
    } else {
        console.log("getCache error id type =" + id + "," + type)
    }
}

export async function getStories(path) {
    const result = await axiosConfig.get('/' + path + '.json').catch(err => console.log(err.message));
    const ids = result.data;
    const key = path;
    const value = loadJSON(key);
    if (value) {
        return value;
    }

    let promises = []
    ids.forEach(id => {
        promises.push(getItem(id));
    })

    const data = await Promise.all(promises).catch((err) => console.log(err.message));
    saveJSON(key, data);
    return data;
}

