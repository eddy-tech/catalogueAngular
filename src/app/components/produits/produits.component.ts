import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  public products: any;
  public size: number = 4;
  public currentPage: number = 0;
  public totalPages: number = 0;
  public pages: Array<number> = new Array<number>();
  private currentKeyword: String = '';

  constructor(private catalogueService: CatalogueService, private router:Router, public authService: AuthService) {}

  ngOnInit(): void {}

  onGetProducts() {
    this.catalogueService.getProducts(this.currentPage, this.size).subscribe(
      (data: any) => {
        this.totalPages = data['page'].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onPageProduct(i: any) {
    this.currentPage = i;
    this.onChercher({
      keyword: this.currentKeyword,
    });
  }

  onChercher(form: any) {
    this.currentKeyword = form.keyword;
    this.catalogueService
      .getProductsByKeyword(form.keyword, this.currentPage, this.size)
      .subscribe(
        (data: any) => {
          this.totalPages = data['page'].totalPages;
          this.pages = new Array<number>(this.totalPages);
          this.products = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onDeleteProduct(p: any) {
    let conf = confirm('Etes vous sur?');
    if (conf) {
      this.catalogueService.deleteResource(p._links.self.href).subscribe(
        (data) => {
          this.onGetProducts();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onEditProduct(p:any) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url)); // ENCODER URL EN BASE64

  }
}
