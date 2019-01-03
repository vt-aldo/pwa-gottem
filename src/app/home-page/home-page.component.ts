import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { SwPush } from '@angular/service-worker';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  news;
  newsLoading;

  sendNotif() {
    this.subscribeService.sendNotif();
  }

  constructor(
    private newsService: NewsService,
    private subscribeService: SubscribeService,
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

    this.subscribeService.subscribe();
  }

}
