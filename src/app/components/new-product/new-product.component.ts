import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  public currentProduct: Product = {
    id: 0,
    designation: '',
    price: 0,
    quantity: 0,
  };

  public mode: number = 1;

  constructor(
    private catalogueService: CatalogueService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSaveProduct(data: any) {
    this.catalogueService
      .saveResource(this.catalogueService.host + '/produits', data)
      .subscribe(
        (res) => {
          //this.router.navigateByUrl('/products');
          this.currentProduct = res;
          this.mode = 2;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNewProduct() {
    this.mode = 1;
  }
}
