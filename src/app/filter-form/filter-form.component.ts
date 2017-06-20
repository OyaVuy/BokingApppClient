import { Component, OnInit } from '@angular/core';
import { Accomodation } from '../accomodation/accomodation.model';
import { PagingService } from '../services/paging.service';
import { FilteredAccommodationsService } from '../services/filtered-acc.service'
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  providers: [FilteredAccommodationsService, PagingService]
})

export class FilterFormComponent implements OnInit {

Name: string="undefined";
PlaceName: string="undefined";
RegionName: string="undefined";
CountryName: string="undefined";
AverageGrade: number=-1;
BedCount: number=-1;
MinPrice: number=-1;
MaxPrice: number=-1;

Accomodations:Accomodation[];
counter:Array<number>
PageSet:number=1;

constructor(private router: Router,private filteredAccService: FilteredAccommodationsService,
    private pagingService: PagingService) {
        this.Accomodations=[];
     }

ngOnInit() {
    // this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
    //   this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice,
    //   1, PagingService.PageSize).subscribe(x => {
    //     this.Accomodations = (x.json()).value;
    //           this.pagingService.initPagingService(x);

    //           let counterLength = 2;
    //           if (this.PageSet * 2 > PagingService.PageNumber) {
    //               counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
    //           } 
    //           this.counter = new Array(counterLength);      
    // })
}

onSubmit() {
    if (this.Name == undefined || this.Name == ""){
      this.Name = "undefined";
    }
    if (this.PlaceName == undefined || this.PlaceName == ""){
      this.PlaceName = "undefined";
    }

    if (this.RegionName == undefined || this.RegionName == ""){
      this.RegionName = "undefined";
    }

    if (this.CountryName == undefined || this.CountryName == ""){
      this.CountryName = "undefined";
    }

    if (this.AverageGrade == undefined){
      this.AverageGrade = -1;
    }

    if (this.BedCount == undefined){
      this.BedCount = -1;
    }

    if (this.MinPrice == undefined){
      this.MinPrice = -1;
    }

    if (this.MaxPrice == undefined){
      this.MaxPrice = -1;
    }
    // this.router.navigate(['/filteredAcc', this.Name, this.PlaceName, this.RegionName, this.CountryName, this.AverageGrade,
    //                       this.BedCount, this.MinPrice, this.MaxPrice]);
  
    this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
      this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice,
      1, PagingService.PageSize).subscribe(x => {
          this.Accomodations=[];
        this.Accomodations = (x.json()).value; 
        console.log((x.json()).value);
        //console.log(x);
        //console.log(JSON.stringify(x));
    

              // this.pagingService.initPagingService(x);

              // let counterLength = 2;
              // if (this.PageSet * 2 > PagingService.PageNumber) {
              //     counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
              // } 
              // this.counter = new Array(counterLength);      
    })

}

changePage(pageNumber: number){
        this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
        this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice, 
        pageNumber, PagingService.PageSize).subscribe(x => {
            this.Accomodations = (x.json()).value; 
          });   
  }

showNext():boolean {
        return (this.PageSet * 2) < PagingService.PageNumber;
    }

showPrevious():boolean {
        return this.PageSet > 1;
  }

nextPageSet() {
      this.PageSet = this.PageSet + 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

previousPageSet() {
    this.PageSet = this.PageSet - 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }



} 