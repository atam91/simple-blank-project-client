
export const jsonEquals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const jsonCopy = (x) => JSON.parse( JSON.stringify(x) );


export const genObjectAccumFrom = (obj) => (prev, key) => {
    prev[key] = obj[key];
    return prev;
};

/// cb(val, key)
export const filterObject = (obj = {}, cb) => {
    return Object.keys(obj)
        .filter(key => cb(obj[key], key))
        .reduce(genObjectAccumFrom(obj), {});
};

export const getObjectAllowedFields = (obj, fields) => {
    return Object.keys(obj)
        .reduce(
            (prev, key) => Object.assign(prev, fields.includes(key) && { [key]: obj[key] }),
            {}
        );
};


export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


export const accumulateToObject = (list, partCb) => list.reduce(
    (acc, cur, index) => Object.assign(acc, partCb(cur, index)),
    {}
);