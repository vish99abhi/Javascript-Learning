// function composition of any number of functions
const composeFn = (...fn) => (x) => fn.reduceRight((y,fn)=> fn(y),x);

function double(x) { return x*2 };
function square(x) { return x*x };

const output = composeFn(double, square)(2);
console.log(output);

// function composition using pipe of any number of functions
function pipe(...fn) {
    return function(n) {
        return fn.reduce(
            (x,fn) => fn(x),n);
    }
}

const out_put = pipe(double, square)(2);
console.log(out_put, 'PIPE FN');
