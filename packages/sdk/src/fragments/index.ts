import { FragmentInstance, FragmentName, FragmentsStore } from '../types';

export const fragmentsStore: FragmentsStore = {};

export const prepareFragments = (fragments: FragmentsStore) => {
  Object.entries(fragments).forEach(([fragmentName, fragmentInstance]) => {
    fragmentsStore[fragmentName as FragmentName] = fragmentInstance;
  });
};

export const getFragment = (fragmentName: FragmentName): FragmentInstance =>
  fragmentsStore[fragmentName] as string;
