import { Api, ApiListResponse } from './base/api';
import { IProduct, IOrder, IOrderResult } from '../types';

export interface ICatalogAPI {
    getproductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class AuctionAPI extends Api implements ICatalogAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    // Получаем список товаров
    getproductList(): Promise<IProduct[]> {

    }

    // Получаем товар
    getProductItem(id: string): Promise<IProduct> {

    }

    // Отправляем заказ
    orderProducts(order: IOrder): Promise<IOrderResult> {

    }
}