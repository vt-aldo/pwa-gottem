import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  news;
  newsLoading;

  subscribeToNotifs() {
    this.swPush.requestSubscription({
      serverPublicKey:
        'BC8iHicSX9qdAZkS1DB1iNhRwVbD8YSq_lvbn8r3flIvnI6c2q8gpUZOpn2i7WgBgv-qzeHIUf1jzX9AxH4flkM'
    }).then(sub => console.log('Subscribed!'))
    .catch(err => console.log('Could not subscribe. Maybe they declined.'));
  }

  constructor(
    private newsService: NewsService,
    private swPush: SwPush,
  ) { }

  ngOnInit() {
    this.newsLoading = true;
    this.newsService.getNews().subscribe(data => {
      this.newsLoading = false;
      this.news = data;
    },
    error => {
      this.newsLoading = false;
      this.news = false;
    });

    this.subscribeToNotifs();
  }

}
