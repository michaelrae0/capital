Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

export function collect(array, callback) {
  return Array.from(new Set(array.map(callback).filter(item => item != null).flat()));
};

export function contains(array, valueArray) {
  const set = new Set(array);
  const test = valueArray.filter(item => set.has(item));
  return test.length >= 1;
}