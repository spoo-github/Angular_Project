import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
@Input() maxRating=5;
maxRatingArr: any= [];
@Input() SelectedStar=0;
previousSelection =0;
@Input() readonly: boolean = false;
@Output()
  onRating:EventEmitter<number>= new EventEmitter<number>();
  
constructor(){}

Rating(index:number){
  this.SelectedStar=index;
  this.previousSelection=this.SelectedStar;
  this.onRating.emit(this.SelectedStar);
}
ngOnInit():void{
  this.maxRatingArr = Array(this.maxRating).fill(0);
}
}
