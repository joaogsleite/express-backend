
export function getPathFromObj(path, obj) {
  return path.split('.').reduce((part, key) => part[key], obj);
}

export function setPathOnObj(path, obj, value) {
  const paths = path.split('.');
  const key = paths.pop();
  const objToChange = paths.reduce((part, partkey) => part[partkey], obj);
  objToChange[key] = value;
  return objToChange;
}
