import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  news;
  newsLoading;

  constructor(
    private newsService: NewsService,
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
  }

}
