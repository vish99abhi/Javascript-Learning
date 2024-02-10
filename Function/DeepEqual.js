
const deepEqual = (value1, value2) => {

    if(value1 === value2) {
        return true;
    }

    if(typeof value1 !== 'object' || value1 === null || value2 === null) {
        return false;
    }

    if(Array.isArray(value1)) {
        if(value1.length !== value2.length) {
            return false;
        }
        for(let i=0;i<value1.length;i++) {
            if(!deepEqual(value1[i],value2[i])) {
                return false;
            }
        }
        return true;
    }

    let keyA = Object.keys(value1);
    let keyB = Object.keys(value2);

    for(let key of keyA) {
        if(!keyB.includes(key) || !deepEqual(value1[key], value2[key])) {
            return false;
        }
    }

    return true;
}


function isDeepEqual() {
    const obj1 = { a: 1, b: [1, 3] , c: { x:1, y:2 } };
    const obj2 = { a: 1, b: [1, 3], c: { x:1, y: 2 } };

    if(deepEqual(obj1,obj2)) {
        console.log('both object are deep equal');
    }else {
        console.log('both object are not deep equal');
    }
}

isDeepEqual();