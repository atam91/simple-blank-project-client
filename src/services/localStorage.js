const getItem = (key) => localStorage.getItem(key);
const setItem = (key, val) => localStorage.setItem(key, val);
const removeItem = (key) => localStorage.removeItem(key);


const getObject = (key) => {
    const item = getItem(key);

    try {
        return item && JSON.parse(item);
    } catch (err) {
        return;
    }
};

const setObject = (key, obj) => setItem(key, JSON.stringify(obj));


export default {
    getItem,
    setItem,
    removeItem,
    getObject,
    setObject
};
