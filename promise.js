// 实现promise链式调用
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
  this.cbs = [];
  this.errs = [];
  this.data = null;
  this.reason = null;
  this.state = PENDING;
  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.data = value;
      this.cbs.forEach((cb) => cb());
    }
  };

  const reject = (value) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = value;
      this.errs.forEach((cb) => cb());
    }
  };

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFuifilled, onRejected) {
  onFuifilled =
    typeof onFuifilled === "function"
      ? onFuifilled
      : (value) => {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  let promise2 = null;

  promise2 = new MyPromise((resolve, reject) => {
    if (this.state === PENDING) {
      this.cbs.push(() => {
        setTimeout(() => {
          try {
            const res = onFuifilled(this.data);
            this.resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      this.errs.push(() => {
        setTimeout(() => {
          try {
            const res = onRejected(this.reason);
            this.resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          const res = onFuifilled(this.data);
          this.resolvePromise(promise2, res, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          const res = onRejected(this.reason);
          this.resolvePromise(promise2, res, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });
  return promise2;
};

MyPromise.prototype.resolvePromise = function (promise2, res, resolve, reject) {
  let called = false;

  if (promise2 === res) {
    return reject(new TypeError("循环引用"));
  }

  if (
    res !== null &&
    (Object.prototype.toString.call(res) === "[object Object]" ||
      Object.prototype.toString.call(res) === "[object Function]")
  ) {
    try {
      let then = res.then;

      if (typeof then === "function") {
        then.call(
          res,
          (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(res);
      }
    } catch (reason) {
      if (called) return;
      called = true;
      reject(reason);
    }
  } else {
    resolve(res);
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// test
new MyPromise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log("resolve1", res);
    return new MyPromise((resolve, reject) => {
      resolve(2);
    });
  })
  .then((res) => {
    console.log("resolve2", res);
    return new MyPromise((resolve, reject) => {
      reject(3);
    });
  })
  .then((res) => {
    console.log(`output->res`, res);
  })
  .catch((res) => console.log("reject3", res));
