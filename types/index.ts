export interface FirebaseDate {
  seconds: number;
  nanoseconds: number;
}
export interface Products {
    key: string;
    name: string;
    stock: number;
    price: number;
    imgSrc: string;
    category: string;
    position: number;
}
export interface OrderProduct {
    name: string;
    count: number;
    position: number;
    prize: number;
    productId: string;
  }
  
  export interface OrderType {
    key: string;
    amount: number;
    status: "pending" | "collected";
    userId: string;
    products: OrderProduct[];
    timeStamp: FirebaseDate;
  }
  export interface PaymentType {
    key: string;
    amount: number;
    orderId: string;
    userId: string;
    timeStamp: FirebaseDate;
  }
  export interface UserType {
    key: string;
    name: string;
    credit: number;
    userId: string;
    timeStamp: FirebaseDate;
  }