import axiosConfig from "./axiosConfig";

export const loadJSON = key => key && localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
export const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export async function getItem(Id) {
    return axiosConfig.get('/item/' + Id + '.json')
        .then(result => {
           return result.data 
        },
        err => {
           console.log(err.message) 
        })
}

export function saveComment(data) {
    const previous = loadJSON('comments');
    if (previous) {
        previous.push(data);
        saveJSON('comments', previous);
    } else {
        saveJSON('comments', [data]);
    }
}

export function saveBookmark(data, type) {
    data.type = type;
    const bookmarks = loadJSON('bookmarks');
    if (bookmarks) {
        const newbookmarks = bookmarks.filter(x => x.id !== data.id);
        newbookmarks.unshift(data);
        saveJSON('bookmarks', newbookmarks);
    } else {
        saveJSON('bookmarks', [data]);
    }
}

export async function getKids(ids) {
    let promises = [];
    ids.forEach(id => {
        promises.push(getItem(id));
    })
    const data = await Promise.all(promises).catch((err) => console.log(err.message));
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

async function getFromStorage(id, data) {
    if (!data) {
        return getItem(id);
    }

    const item = data.find(x => x.id === id);
    if (item) {
        return item;
    } else {
        return getItem(id);
    }
}

export async function getStories(path) {
    const result = await axiosConfig.get('/' + path + '.json').catch(err => console.log(err.message));
    const ids = result.data;
    const key = path;
    const storage = loadJSON(key);

    let promises = []
    ids.forEach(id => {
        promises.push(getFromStorage(id, storage));
    })

    const data = await Promise.all(promises).catch((err) => console.log(err.message));
    saveJSON(key, data);
    return data;
}

