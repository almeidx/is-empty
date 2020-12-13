import isEmpty from '..';

describe('isEmpty()', () => {
  it('should return `true` for empty values', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(Array.prototype.slice)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty(Symbol('a'))).toBe(true);
    expect(isEmpty()).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(Buffer.from(''))).toBe(true);
  });

  it('should return `false` for non-empty values', () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 0 })).toBe(false);
    expect(isEmpty('a')).toBe(false);
  });

  it('should work with an object that has a `length` property', () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });

  it('should work with `arguments` objects', () => {
    expect(isEmpty((function n(): IArguments {
      return arguments;
    }.apply(undefined)))).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expect(isEmpty((function n(a: number): IArguments {
      return arguments;
    }.apply(undefined, [1])))).toBe(false);
  });

  it('should work with prototype objects', () => {
    function foo(): void {}
    foo.prototype = { constructor: foo };

    expect(isEmpty(foo.prototype)).toBe(true);

    foo.prototype.a = 1;
    expect(isEmpty(foo.prototype)).toBe(false);
  });

  it('should work with maps', () => {
    const map = new Map();
    expect(isEmpty(map)).toBe(true);
    map.set('a', 1);
    expect(isEmpty(map)).toBe(false);
    map.clear();
    expect(isEmpty(map)).toBe(true);
  });

  it('should work with sets', () => {
    const set = new Set();
    expect(isEmpty(set)).toBe(true);
    set.add(1);
    expect(isEmpty(set)).toBe(false);
    set.clear();
    expect(isEmpty(set)).toBe(true);
  });
});
