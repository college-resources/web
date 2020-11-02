/* eslint-disable */
// Source: https://stackoverflow.com/a/4760279

export function dynamicSort(property) {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    /*
     * Next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

export function dynamicSortMultiple(...args) {
  /*
   * Save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  const props = args
  return function (obj1, obj2) {
    let i = 0
    let result = 0
    const numberOfProperties = props.length

    /*
     * Try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2)
      i++
    }
    return result
  }
}
