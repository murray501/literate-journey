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

class Cache {
    constructor(path) {
        this.map = new Map();
        this.path = path;
    }

    async getItem(id) {    
        if (this.map.get(id)) {
            return Promise.resolve(this.map.get(id))
        } 
    
        return axiosConfig.get('/item/' + id + '.json')
            .then(result => {
                this.map.set(id, result.data)
                return result.data
            },
            err => {
                console.log(err.message)
            })
        
    }

    deleteOld(data) {
        for (const id of this.map.keys()) {
            if (!data.includes(id)) {
                console.log("id is deleted " + id);
                this.map.delete(id)
            }
        }
    }

    async getStories() {
        const result = await axiosConfig.get(this.path).catch(err => console.log(err.message))
        let promises = []
        result.data.forEach(id => {
            promises.push(this.getItem(id));
        })

        const data = await Promise.all(promises).catch((err) => console.log(err.message));
        console.log("map size = " + this.map.size);
        return data;
    }
}

const CacheTopStories = new Cache('/topstories.json');
const CacheBestStories = new Cache('/beststories.json');

export async function getCache(id, type) {
    if (type === 'TopStories') {
        console.log("CacheTopStories size = " + CacheTopStories.map.size)
        return CacheTopStories.getItem(id);
    } else if (type === 'BestStories') {
        return CacheBestStories.getItem(id);
    }
} 

export async function getTopStories() {
    return CacheTopStories.getStories();
}

export async function getBestStories() {
    return CacheBestStories.getStories();
}