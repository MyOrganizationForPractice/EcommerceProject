import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  constructor(private route: Router) { }
  ngOnInit(): void {
  }

  doSearch(searchData: any) {
    this.route.navigateByUrl(`/search/${searchData}`);
  }
}
