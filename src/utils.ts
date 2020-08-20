export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export type Unpacked<T> = T extends (infer U)[] ? U : T;


type Concat<K extends string | symbol | number,
  T extends string | symbol | number> = K | T

type SuperOf<T, K extends keyof T> = {[P in K]: T[P]};


export type Selector<T, S> = (a: T) => S;

export function isValidURL(url: string) {
  return (/^http[s]+:\/\/.+/).test(url);
}
