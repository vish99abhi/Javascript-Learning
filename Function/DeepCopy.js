
const deepCopy = (value, visited = new WeakMap) => {
    
    if(typeof value !== 'object' || value === null) {
        return value;
    }

    if(visited.has(value)) {
        return visited.get(value);
    }
    
    let copy = Array.isArray(value) ? [] : {};
    visited.set(value, copy);

    for(let key in value) {
        if(Object.prototype.hasOwnProperty.call(value, key)) {
            copy[key] = deepCopy(value[key], visited);
        }
    }
    return copy;
}

const user = {
    name: "Anne",
    age: 23,
    phone: 44554545,
    address: 'xyz location',
    favColor: ['blue', 'pink','yellow']
}
// user.self = user;
const userTwo = deepCopy(user);
console.log(userTwo);