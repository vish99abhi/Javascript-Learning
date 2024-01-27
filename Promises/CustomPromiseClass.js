const STATE = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    REJECTED: 'REJECTED'
}


class MyPromise {
    constructor(executorFn){
        this.val = null;
        this.state = STATE.PENDING;
        // For Chaining the promises...
        this.successCallbacks = [];
        this.failedCallbacks = [];
        try {
            executorFn(
                val => this.resolve(val),
                val => this.reject(val)
            )
        } catch (error) {
            this.reject(error);
        }
    }
    resolve(val) {
        this.val = val;
        this.state = STATE.SUCCESS;
        this.successCallbacks.forEach( cb => cb());
    }

    reject(val) {
        this.val = val;
        this.state = STATE.REJECTED;
        this.failedCallbacks.forEach(cb => cb());
    }

    then(onResolve, onReject) {
        return new MyPromise((resolve, reject) => {
            const successCaller = () => {
                if(!onResolve) return resolve(this.val);
                try {
                    let val = onResolve(this.val);
                    resolve(val);
                } catch (error) {
                    reject(error);
                }
            }
            const failedCaller = () => {
                if(!onReject) return reject(this.val);
                try {
                    let val = onReject(this.val);
                    resolve(val);
                } catch (error) {
                    reject(error);
                }
            }
            switch (this.state) {
                case STATE.PENDING:
                    this.successCallbacks.push(successCaller);
                    this.failedCallbacks.push(failedCaller);
                    break;
                case STATE.SUCCESS:
                    successCaller();
                    break;
                case STATE.REJECTED:
                    failedCaller();
                    break;
                default:
                    throw new Error('State is not define');
            }
        })
    }

    catch(onReject) {
        return this.then(null,onReject);
    }
}

function promiseA(a) {
    return new MyPromise((resolve,reject) =>{
        setTimeout(()=> {
            if(a===1) {
                return reject('a can not equals to 1')
            }else {
                resolve(a+a);
            }
        },5000)
    });
}

promiseA(3)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

