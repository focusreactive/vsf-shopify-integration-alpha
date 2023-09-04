export enum FragmentName {
  product = 'product',
  variant = 'variant',
}

export type FragmentInstance = string;

export type FragmentsStore = {
  [key in FragmentName]?: FragmentInstance;
};
