export const mergeArr = (array) => {
  let map = {};
  let arr = []
  if (Array.isArray(array)) {
    array.map(item => {
      let productType = item.productType
      if (!map[productType]) {
        map[productType] = 1
      } else {
        map[productType] = map[productType] + 1
      }
    })
    Object.keys(map).forEach(key => {
      arr.push({
        'item': key,
        'count': map[key]
      })
    })
    return arr
  } else {
    console.error('Param must be a Array')
  }
}