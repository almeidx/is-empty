import isEmpty from '..';

describe('Testing isEmpty function', () => {
  it('should return true when the input is 0', () => {
    expect(isEmpty(0)).toBe(true);
  });

  it('should return false when the input is -1', () => {
    expect(isEmpty(-1)).toBe(false);
  });

  it('should return false when the input is 1', () => {
    expect(isEmpty(1)).toBe(false);
  });

  it('should return true when the input is an empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return false when the input is an array with one or more elements', () => {
    expect(isEmpty([null])).toBe(false);
    expect(isEmpty([null, 2, 3])).toBe(false);
  });

  it('should return true when the input is an empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false when the input is an object with properties', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return true when the input is an empty set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false when the input is a set with one or more items', () => {
    const set = new Set();
    set.add(1);
    expect(isEmpty(set)).toBe(false);
    set.add(2);
    expect(isEmpty(set)).toBe(false);
  });

  it('should return true when the input is an empty map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  it('should return false when the input is a map with one or more items', () => {
    const map = new Map();
    map.set('a', 1);
    expect(isEmpty(map)).toBe(false);
    map.set('b', 2);
    expect(isEmpty(map)).toBe(false);
  });

  it('should return true when the input is an empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return false when the input is a non-empty string', () => {
    expect(isEmpty('abc123')).toBe(false);
  });

  it('should return true when the input is NaN', () => {
    expect(isEmpty(NaN)).toBe(true);
  });
});
