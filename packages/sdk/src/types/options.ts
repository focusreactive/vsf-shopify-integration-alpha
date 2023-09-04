import { FragmentsStore } from './fragments';

export interface Options {
  /**
   * The API URL of the client-side environment.
   */
  apiUrl: string;
  fragments: FragmentsStore;
}
