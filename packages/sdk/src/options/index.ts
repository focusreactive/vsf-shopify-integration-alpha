import { Options } from '../types';

const storage: { options: Options } = {
  // @ts-ignore
  options: {},
};

export const initOptions = (opt: Options) => {
  console.log("🚀 ~ file: index.ts:9 ~ initOptions ~ opt:", opt)
  storage.options = opt;
};
export const getOptions = () => storage.options;
