// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueByKey = (object: any, key: string) => {
  const keys = key.split("."); // split the string into an array of keys

  let value = object;
  for (let i = 0; i < keys.length; i++) {
    if (value[keys[i]]) {
      value = value[keys[i]]; // traverse the object based on the keys in the array
    } else {
      return undefined; // return undefined if the key doesn't exist
    }
  }
  return value; // return the value of the final key in the array
};
