function customStringify(value) {
    if(value === null) {
        return 'null';
    }
    if(value === undefined) {
        return;
    }
    
    if(typeof value === 'string') {
        return '"'+ value + '"';
    }

    if(typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
    }

    if(Array.isArray(value)) {
        const elements = value.map((item) => customStringify(item));
        return '[' + elements.join(',') + ']';
    }

    if(typeof value === 'object') {
        let objValue  = Object.entries(value).map(([key,value]) => { return '"' +key +'":'+ customStringify(value)});
        return '{' + objValue.join(',') + "}";
    }

    return;
}

const obj = {
    name: "John",
    age: 30,
    married: true,
    hobbies: ["reading", "coding", "gaming"],
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    }
};

const result = customStringify(obj);
console.log(result);