/**
 * await catch 异常处理
 * @param { Function } promise 
 */
export default function (promise: Promise<any>) {
  return promise
      .then(data => [null, data])
      .catch(err => [err, null])
}