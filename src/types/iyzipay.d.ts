declare module 'iyzipay' {
  export default class Iyzipay {
    constructor(config: any);
    static LOCALE: { TR: string; EN: string };
    static PAYMENT_GROUP: { PRODUCT: string; LISTING: string; SUBSCRIPTION: string };
    static CURRENCY: { TRY: string; EUR: string; USD: string; GBP: string; IRR: string };
    static BASKET_ITEM_TYPE: { PHYSICAL: string; VIRTUAL: string };
    checkoutFormInitialize: {
      create(request: any, callback: (err: any, result: any) => void): void;
    };
  }
}