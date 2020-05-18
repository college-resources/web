export default function groupBy (items, key) {
  return items.reduce(
    (result, item) => {
      if (!result[item[key]]) result[item[key]] = []
      result[item[key]].push(item)
      return result
    },
    []
  )
}
