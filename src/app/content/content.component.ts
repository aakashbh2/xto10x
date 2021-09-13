import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web-service';
import { sortByList } from '../utilities/functionFactory';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  itemList: any = [];
  filteredproductList: Array<any> = [];
  count: number = 0;
  brandList: Array<string> = [];


  constructor(private _webService: WebService) {
  }

  ngOnInit(): void {
   this.fetchData();
  }

  public fetchData() {
     this._webService.initData().subscribe(result => {
      this.itemList = result;
      this.filteredproductList = this.itemList.products.slice();
      this.brandList =  this.itemList.products.map((product:any) => {
        return product.brand;
      });
      this.brandList = [...new Set(this.brandList)].sort();
    }, error => {
      console.error(error);
    })
  }

  public sortByFunction(index: number) {
   this.filteredproductList = sortByList(this.filteredproductList, this.itemList.sortOptions[index])
  }

  filterData(event: any, filterOn: string, filterBy: any) {
    if (!isNaN(filterBy)) {
      filterBy = this.brandList[filterBy];
    }
    if (this.count === 0) {
      this.filteredproductList = [];
    }
    if (event.target.checked) {
         this.count++;
         var filteredproduct = (this.itemList.products || []).filter((product: any) => {
          return product[filterOn].toLowerCase() === filterBy.toLowerCase();
         });
         this.filteredproductList = [...this.filteredproductList, ...filteredproduct];
    } else {
      this.count--;
      if (this.count === 0) {
        this.filteredproductList = this.itemList.products;
      }
    }
  }
}
