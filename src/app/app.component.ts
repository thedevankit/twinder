import { Component ,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { TwitterService } from './service/twitter.service';
import { IRootObject } from './model/local'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twinder';
  public tweets: any;
  public rootObject: IRootObject;

  constructor( private breakpointObserver: BreakpointObserver,
               private twitservice: TwitterService) {
  }

  ngOnInit() {
    // this.loadTinderCards();
    // this.getTweets();
    this.getPosition().then(pos=>
      {
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.twitservice.getlocation(pos.lng, pos.lat).subscribe(res=>{
          this.rootObject = res;
          console.log(`local user:`, JSON.stringify(this.rootObject.restaurants));
        })
      });
  }
  getTweets(){
    this.twitservice.getTweets().subscribe( res=> {
      this.tweets = res;
      console.log('error', this.tweets);

    }, error =>{
      console.log('error',error);
      
    })
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  // loadTinderCards() {
  //   this.tweets = [
  //     {
  //       img: "https://placeimg.com/300/300/people",
  //       title: "Demo card 1",
  //       description: "This is a demo for Tinder like swipe cards"
  //     },
  //     {
  //       img: "https://placeimg.com/300/300/animals",
  //       title: "Demo card 2",
  //       description: "This is a demo for Tinder like swipe cards"
  //     },
  //     {
  //       img: "https://placeimg.com/300/300/nature",
  //       title: "Demo card 3",
  //       description: "This is a demo for Tinder like swipe cards"
  //     },
  //     {
  //       img: "https://placeimg.com/300/300/tech",
  //       title: "Demo card 4",
  //       description: "This is a demo for Tinder like swipe cards"
  //     },
  //     {
  //       img: "https://placeimg.com/300/300/arch",
  //       title: "Demo card 5",
  //       description: "This is a demo for Tinder like swipe cards"
  //     }
  //   ]
  // };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logChoice(_event: any){
      console.log(_event,'in app');
    }


}