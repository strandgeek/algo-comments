import { Config } from "./src/types/config";

declare global {
  interface Window {
    AlgoComments: Config;
    AlgoSigner: any
  }
}

export {}
