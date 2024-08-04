export interface Products {
    key: string;
    name: string;
    stock: number;
    price: number;
    imgSrc: string;
    category: string;
    position: number;
}
export interface STATUS {
    success: boolean;
    error: string | null;
}