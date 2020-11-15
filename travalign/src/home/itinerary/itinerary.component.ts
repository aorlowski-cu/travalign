import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../activity';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  //https://angular-2-training-book.rangle.io/components/app_structure_with_components/passing_data_into_components
  @Input() activities: Activity[] = [];
  @Input() startDate = "";
  @Input() endDate = "";

  constructor() { }

  ngOnInit(): void {
  }

  getDatesArray(): string[] {
    let start = new Date(this.startDate);
    const end = new Date(this.endDate);
    //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    const numDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const dateArray = [];
    for(let i = 0; i<=numDays; i++){
      dateArray.push(start.toDateString());
      //https://stackoverflow.com/questions/563406/add-days-to-javascript-date
      start.setDate(start.getDate() + 1);
    }
    return dateArray;
  }

}
