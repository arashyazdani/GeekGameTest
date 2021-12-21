import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { timer } from 'rxjs';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  dragPosition = {x: 0, y: 0};
  allPictures = 28;
  allNationalities=4;
  pictureAddresses: string[]=[];
  picAddress = '';
  nationalities=[];
  totalScore=0;
  totalImage=10;
  lastScore=0;
  marqueeSpeed: number=0;
  started: boolean=false;
  visibleMarquee='hidden';

  timeLeft: number = 3;
  interval=setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.timeLeft = 3;
    }
  },1000);
  subscribeTimer: any;

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.started=true;
    let randomDigit=Math.floor((Math.random() * 27) + 1);
    this.picAddress=this.pictureAddresses[randomDigit];
    this.marqueeSpeed=11;
    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        randomDigit=Math.floor((Math.random() * 27) + 1)
        this.picAddress=this.pictureAddresses[randomDigit];
        this.visibleMarquee='visible';
        this.timeLeft = 3;
        if(this.totalImage>1)
        {
          this.totalImage--;
        } else {
          this.stopTimer();
          this.totalImage=10;
          this.lastScore=this.totalScore;
          this.totalScore=0;
        }     
      }
    },1000)
  }

  pauseTimer() {
    this.marqueeSpeed=0;
    this.visibleMarquee='hidden';
    if(this.totalImage>1)
    {
      this.totalImage=10;
    }
    this.picAddress='';
    clearInterval(this.interval);
    this.started=false;
  }

  stopTimer() {
    this.marqueeSpeed=0;
    this.visibleMarquee='hidden';

      this.totalImage=10;
      this.lastScore=this.totalScore;
      this.totalScore=0;
    this.picAddress='';
    clearInterval(this.interval);
    this.started=false;
  }
  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
    this.picAddress='assets/Images/Japanese(1).jpg';
  }

  constructor() {
   }


  ngOnInit(): void {
    this.marqueeBoxImages();
    this.stopTimer();

  }

  marqueeBoxImages() {
    for(var _i = 0; _i < 4; _i++)
    {
      for(var _j = 0; _j < 7; _j++)
      {
        switch (_i) {
          case 0:
            this.pictureAddresses.push('assets/Images/Japanese(' + (_j+1).toString() + ').jpg');
            break;
          case 1:
            this.pictureAddresses.push('assets/Images/Chinese(' + (_j+1).toString() + ').jpg');
            break;
          case 2:
            this.pictureAddresses.push('assets/Images/Korean(' + (_j+1).toString() + ').jpg');
            break;
          case 3:
            this.pictureAddresses.push('assets/Images/Thai(' + (_j+1).toString() + ').jpg');
            break;

          default:
            break;
        }
      }
    }
  }

  dragEnd($event: CdkDragEnd) {
    const xPosition = $event.source.getFreeDragPosition().x;
    const yPosition = $event.source.getFreeDragPosition().y;
    if(xPosition<=-20 && yPosition<=-20)
    {
      if(this.picAddress.includes('Japanese'))
      {
        this.totalScore+=20;
      } else {
        this.totalScore-=5;
      }
    } else if(xPosition>=20 && yPosition<=-20)
    {
      if(this.picAddress.includes('Chinese'))
      {
        this.totalScore+=20;
      } else {
        this.totalScore-=5;
      }
    } else if(xPosition<=-20 && yPosition>=20)
    {
      if(this.picAddress.includes('Korean'))
      {
        this.totalScore+=20;
      } else {
        this.totalScore-=5;
      }
    } else if(xPosition>=20 && yPosition>=20)
    {
      if(this.picAddress.includes('Thai'))
      {
        this.totalScore+=20;
      } else {
        this.totalScore-=5;
      }
    } 
    
    this.dragPosition = {x: 0, y: 0};
    
    this.pauseTimer();
    this.startTimer();
}


}
