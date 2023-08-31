import { Endpoints } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (
  context,
  params
) => {
  console.log('getProduct has been called');

  return { data: 'Hello from getProduct endpoint!' };
};
