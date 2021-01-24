import { Component ,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twinder';
  public cards: any;

  constructor( private breakpointObserver: BreakpointObserver) {
    this.cards = [];
  }

  ngOnInit() {
    this.loadTinderCards();
  }

  loadTinderCards() {
    this.cards = [
      {
        img: "https://placeimg.com/300/300/people",
        title: "Demo card 1",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/animals",
        title: "Demo card 2",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/nature",
        title: "Demo card 3",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/tech",
        title: "Demo card 4",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/arch",
        title: "Demo card 5",
        description: "This is a demo for Tinder like swipe cards"
      }
    ]
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logChoice(_event: any){
      console.log(_event,'in app');
    }


}