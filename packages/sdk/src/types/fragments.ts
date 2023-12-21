export enum FragmentName {
  product = 'product',
  variant = 'variant',
  collection = 'collection',
}

export type FragmentInstance = string;

export type FragmentsStore = {
  [key in FragmentName]?: FragmentInstance;
};
