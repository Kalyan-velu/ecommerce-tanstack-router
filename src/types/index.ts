export type ArgumentsType<T> = T extends (...args: infer P) => unknown
  ? P
  : never;
