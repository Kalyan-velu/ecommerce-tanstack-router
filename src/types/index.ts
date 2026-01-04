
export type ArgumentsType<T> = T extends (...args: infer P) => any ? P : never;
