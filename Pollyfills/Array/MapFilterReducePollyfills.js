
Array.prototype.myMap = function (callbackFn) {
    let array = new Array();
    for (let i = 0; i < this.length; i++) {
        array.push(callbackFn(this[i], i, this));
    }
    return array;
}

const arr = [1, 2, 3, 4, 5, 6];
const res = arr.myMap((i) => i+2);
console.log(res,'MY-MAP-RESULT');

Array.prototype.myFilter = function (callbackFn) {
    let array = new Array();
    for (let i = 0; i < this.length; i++) {
        if (callbackFn.call(null, this[i], i, this)) {
            array.push(this[i]);
        }
    }
    return array;
}

let res1 = arr.myFilter((i) => i > 3);
console.log(res1,'MY-FILTER-RESULT');

Array.prototype.myReduce = function(callbackFn,initialValue) {
    let accummalator = initialValue;
    for(let i=0; i<this.length; i++) {
        if(accummalator !== undefined) {
            accummalator = callbackFn.call(undefined,accummalator,this[i],i,this);
        } else {
            accummalator = this[i];
        }
    }
    return accummalator;
}

const result = arr.myReduce((acc, i) => acc+i);
console.log(result,'MY-REDUCE-RESULT');
