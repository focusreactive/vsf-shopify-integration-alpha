import { client } from '../../client';
import { getFragment } from '../../fragments';
import { FragmentInstance, FragmentName, TODO } from '../../types';

type Props = {
  productFragment?: FragmentInstance;
  handle: string;
};

type Returns = { product: Object };

type QueriedArray<T> = {
  edges: Array<{ node: T }>;
};
type ProcessArrays<T> = (
  queriedVariants: QueriedArray<T>
) => Array<T> | QueriedArray<T>;

const processArrays: ProcessArrays<Object> = (queriedArray) => {
  try {
    return queriedArray?.edges.map(({ node }) => node);
  } catch {
    return queriedArray;
  }
};

type AttributeName = string;
type Options = Array<{
  id: string;
  name: AttributeName;
  values: string[];
}>;

type Attributes = {
  [key: AttributeName]: Array<{
    label: string;
    name: AttributeName;
    value: string;
  }>;
};

type GetAttributes = (options: Options) => Attributes;
const getAttributes: GetAttributes = (options: Options) => {
  try {
    return options.reduce(
      (attr, opt) => ({
        ...attr,
        [opt.name]: opt.values.map((val) => ({
          label: val,
          name: opt.name,
          value: val,
        })),
      }),
      {}
    );
  } catch (error) {
    return {};
  }
};

/**
 * Method summary - General information about the SDK method, usually a single sentence.
 *
 * @remarks
 * In this section, we have been adding detailed information such as:
 * * what API middleware endpoint this method is calling,
 * * what SAP OCC API endpoints are being called as a result of using this method,
 * * when this method can be used and when it can’t (e.g. logged-in vs anonymous users),
 * * simply everything what helps with understanding how it works.
 *
 * @param props
 * Just like our API methods, our SDK connector methods accept a single props parameter which carries relevant sub-properties. Therefore, there isn’t much to be described within that TSDoc section.
 *
 * @returns
 * Human-friendly information what the SDK methods returns.
 *
 * @example
 * A short code snippet showing how to use the method. Usually we have more than one @example. We should strive for adding as many examples as possible here, with multiple param configurations.
 */
export async function getProduct(props: Props): Promise<Returns> {
  const productFragment =
    props.productFragment || getFragment(FragmentName.product);
  const { data } = await client.post('getProduct', {
    handle: props.handle,
    productFragment,
  });
  const product = {
    ...data.product,
    variants: processArrays(data.product.variants),
    gallery: processArrays(data.product.gallery),
    attributes: getAttributes(data.product.options),
    price: {
      value: {
        amount: 6868,
      },
      regularPrice: {
        amount: 6868,
      },
    },
    rating: {
      average: 4,
      count: 12,
    },
  };
  return product;
}
