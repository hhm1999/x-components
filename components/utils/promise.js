let utils = {
  judge: function (resolve, reject, results, promises) {
    let allEnd = true
    for (let resultsOne of results) {
      if (resultsOne === undefined) {
        allEnd = false
        break
      }
    }
    if (allEnd && (results.length === promises.length)) {
      let isReject = false
      for (let resultsOne of results) {
        if (resultsOne.state === 'rejected') {
          isReject = true
          let parameters = []
          for (let resultsTwo of results) {
            if (resultsTwo.state === 'rejected') {
              parameters.push(resultsTwo.parameter)
            }
          }
          reject(parameters)
          break
        }
      }
      if (!isReject) {
        let parameters = []
        for (let resultsOne of results) {
          parameters.push(resultsOne.parameter)
        }
        resolve(parameters)
      }
    }
  },
  getResults: function (results) {
    let parameters = []
    for (let resultsOne of results) {
      parameters.push(resultsOne.parameter)
    }
    return parameters
  },
  lazyRecursive: function (i, resolve, reject, results, promises) {
    promises[i]().then((p) => {
      results.push({
        state: 'resolved',
        parameter: p
      })
      if (i < promises.length - 1) {
        this.lazyRecursive(i + 1, resolve, reject, results, promises)
      } else {
        resolve(this.getResults(results))
      }
    }, (p) => {
      results.push({
        state: 'rejected',
        parameter: p
      })
      reject(this.getResults(results))
    })
  },
  all: function (promises, isLazy) {
    let results = []
    if (isLazy) {
      return new Promise((resolve, reject) => {
        this.lazyRecursive(0, resolve, reject, results, promises)
      })
    } else {
      return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
          promises[i].then((p) => {
            results[i] = {
              state: 'resolved',
              parameter: p
            }
            this.judge(resolve, reject, results, promises)
          }, (p) => {
            results[i] = {
              state: 'rejected',
              parameter: p
            }
            this.judge(resolve, reject, results, promises)
          })
        }
      })
    }
  }
}
export default utils
