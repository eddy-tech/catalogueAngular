import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getProducts(page: number, size: number) {
    return this.httpClient.get(
      this.host + '/produits?page=' + page + '&size=' + size
    );
  }

  public getProductsByKeyword(mc: String, page: number, size: number) {
    return this.httpClient.get(
      this.host +
        '/produits/search/byDesignation?mc=' +
        mc +
        '&page=' +
        page +
        '&size=' +
        size
    );
  }

  public deleteResource(url: any) {
    return this.httpClient.delete(url);
  }

  public saveResource(url: any, data: any): Observable<Product> {
    return this.httpClient.post<Product>(url, data);
  }

  public getResource(url: any): Observable<Product> {
    return this.httpClient.get<Product>(url);
  }

  public updateResource(url: any, data: any) {
    return this.httpClient.put<Product>(url, data);
  }
}
