
/**
 * * Custom promise class With its static methods
 * ? Promise.all(), Promise.any(), Promise.allSettled()
 * TODO: implements methods using typescript
 */
class MyPromise {
    /**
     * * The Promise.all() static method takes an iterable of promises as input and returns a single Promise.
     * ? This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
     * @param {Array of promises} promises 
     * @returns
     */
    static all(promises) {
        return new Promise((resolve, reject) => {
            let complete = 0;
            let result = [];
            promises.forEach((promise, index) => {
                Promise.resolve(promise)
                    .then((value) => {
                        complete++;
                        result[index] = value;
                        if (complete === promises.length) {
                            resolve(result)
                        }
                    })
                    .catch((error) => reject(error));
            })
        })
    }

    /**
     * ? The Promise.any() static method takes an iterable of promises as input and returns a single Promise.
     * * This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
     * @param {*} promises 
     * @returns 
     */
    static any(promises) {
        return new Promise((resolve, reject) => {
            let completed = 0;
            let errors = [];
            promises.forEach((promise,index) => {
                Promise.resolve(promise)
                    .then((value) => {
                        resolve(value);
                    })
                    .catch((err) => {
                        completed++;
                        errors[index] = err;
                        if(completed === promises.length) {
                            reject(new AggregateError(errors,'All Promise rejected'));
                        }
                    })
            })
        })
    }
    /**
     * ? The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise.
     * *This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.
     * @param {*} promises 
     * @returns 
     */
    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            let result = [];
            let complete = 0;
            function completed() {
                if(complete === promises.length) {
                    resolve(result)
                }
            }
            promises.forEach((promise,index) => {
                Promise.resolve(promise)
                    .then((value) => {
                        result[index] = {status: 'success', value: value};
                        complete++;
                        completed();
                    })
                    .catch((error) => {
                        result[index] = {status:'error',value:error};
                        complete++;
                        completed();
                    })
            })
        })
    }
}

const p1 = Promise.resolve('P1 resolve');
const p2 = Promise.reject('P2 reject');
const p3 = Promise.reject('P3 reject');
const p4 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject('P4 Rejected')
    },3000)
})

const p = MyPromise.allSettled([p1, p2, p3, p4])

p
    .then((value) => console.log(value))
    .catch((error) => console.log(error))

