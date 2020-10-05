import * as util from 'util';

const getRawTag = (value: any): string => {
  const isOwn = Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag);
  const tag = value[Symbol.toStringTag];

  let unmasked = false;
  try {
    value[Symbol.toStringTag] = undefined;
    unmasked = true;
  } catch {} // eslint-disable-line no-empty

  const result = Object.prototype.toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[Symbol.toStringTag] = tag;
    } else {
      delete value[Symbol.toStringTag];
    }
  }
  return result;
};

const getTag = (value: any): string => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return (Symbol.toStringTag in Object(value))
    ? getRawTag(value)
    : Object.prototype.toString.call(value);
};

const isFunction = (value: any): boolean => {
  if (value == null || (typeof value !== 'object' && typeof value !== 'function')) return false;

  const tag = getTag(value);
  return tag === '[object Function]'
    || tag === '[object GeneratorFunction]'
    || tag === '[object AsyncFunction]'
    || tag === '[object Proxy]';
};

function isPrototype(value: any) {
  const valProto = value && value.constructor;
  return value === (typeof valProto === 'function' && valProto.prototype) || Object.prototype;
}

const overArg = (
  func: (...args: any[]) => any,
  transform: any,
// eslint-disable-next-line function-paren-newline
): (...args: any[]) => any => function recursive(arg) {
  return func(transform(arg));
};

const baseKeys = (object: any) => {
  if (!isPrototype(object)) return overArg(Object.keys, Object)(object);

  const result = [];
  for (const key in Object(object)) {
    if (Object.prototype.hasOwnProperty.call(object, key) && key !== 'constructor') result.push(key);
  }
  return result;
};

export const isEmpty = (value: any): boolean => {
  if (value == null) return true;

  if (typeof value === 'number') return !value;

  if (
    (value != null && typeof value.length === 'number' && !isFunction(value))
    && (
      Array.isArray(value)
      || typeof value === 'string'
      || typeof value.splice === 'function'
      || Buffer.isBuffer(value)
      || util.types.isTypedArray(value)
      || (typeof value === 'object' && getTag(value) === '[object Arguments]')
    )
  ) return !value.length;

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') return !value.size;

  if (isPrototype(value)) return !baseKeys(value).length;

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) return false;
  }

  return true;
};

export default isEmpty;
