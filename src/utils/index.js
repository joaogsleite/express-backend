
export function getPathFromObj(path, obj) {
  return path.split('.').reduce((obj, key) => {
    return obj[key]
  }, obj)
}

export function setPathOnObj(path, obj, value) {
  const paths = path.split('.')
  const key = paths.pop()
  const objToChange = paths.reduce((obj, key) => {
    return obj[key]
  }, obj)
  objToChange[key] = value
  return objToChange
}
