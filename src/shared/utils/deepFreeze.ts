// src/shared/utils/deepFreeze.ts
// recursive freeze helper for authored static data

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly (infer Item)[]
    ? readonly DeepReadonly<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
      : T

function isFreezable(value: unknown): value is Record<PropertyKey, unknown>
{
  return typeof value === 'object' && value !== null
}

export function deepFreeze<T>(
  value: T,
  seen = new WeakSet<object>()
): DeepReadonly<T>
{
  if (!isFreezable(value))
  {
    return value as DeepReadonly<T>
  }

  if (seen.has(value))
  {
    return value as DeepReadonly<T>
  }

  seen.add(value)

  for (const propertyKey of Reflect.ownKeys(value))
  {
    deepFreeze(value[propertyKey], seen)
  }

  return Object.freeze(value) as DeepReadonly<T>
}
