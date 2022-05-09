import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public currentProduct?: Product
  private url: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catService: CatalogueService
  ) {}

  ngOnInit(): void {
    this.url = atob(this.activatedRoute.snapshot.params['id']);
    console.log(this.url);
    this.catService.getResource(this.url).subscribe(
      (data) => {
        this.currentProduct = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url, value).subscribe(
      (data) => {
        alert('mise à jour effectué avec succès !');
        this.router.navigateByUrl('/products');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
