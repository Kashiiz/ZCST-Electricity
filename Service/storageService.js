let store = {};


exports.get = (key)=>{
    if(store.hasOwnProperty(key) && parseInt(+new Date()/1000) <= store[key].expiredAt) return store[key];
    return null;
}

exports.set = (key,value)=>{
    store[key] = {
        data:value,
        expiredAt:parseInt(+new Date()/1000) + 24*3600
    }
};
