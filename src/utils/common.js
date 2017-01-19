import { dotSync, subtractSync } from './linearAlgebra'

export {
    asyncify,
    errors,
    errorsSync
}

function asyncify (fnSync, callback) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // TODO: Zalgo? process.nextTick()?
      let result
      try {
        result = fnSync(...args)
      } catch (error) {
        callback(error)
        return reject(error)
      }
      callback(null, result)
      resolve(result)
    })
  }
}

function errors (X, theta, y, callback = () => {}) {
  return asyncify(errorsSync, callback)(...arguments)
}

function errorsSync (X, theta, y) {
  return subtractSync(dotSync(X, theta), y)
}
