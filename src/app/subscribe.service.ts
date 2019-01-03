import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private sendSubscribe(sub: PushSubscription) {
    console.log('sending subscription: sub:');
    console.log(sub);
    this.http.post('https://us-central1-gottem-b0b2b.cloudfunctions.net/endpoints/subscribe', sub)
      .subscribe(data => {
        console.log('Success: data:');
        console.log(data);
      });
  }

  sendNotif() {
    console.log('sending notif');
    this.http.post('https://us-central1-gottem-b0b2b.cloudfunctions.net/endpoints/gottem', {})
      .subscribe(data => {
        console.log('Success:');
        console.log(data);
      });
  }

  subscribe() {
    console.log('Sending subscribe');
    this.swPush.requestSubscription({
      serverPublicKey:
        'BC8iHicSX9qdAZkS1DB1iNhRwVbD8YSq_lvbn8r3flIvnI6c2q8gpUZOpn2i7WgBgv-qzeHIUf1jzX9AxH4flkM'
    }).then(sub => {
      console.log('request success');
      this.sendSubscribe(sub);
    }).catch(err => console.log('request failed'));
  }

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
  ) { }
}
