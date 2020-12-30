import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../Models/SearchResult.model';

@Component({
  selector: 'app-youtube-search-component',
  templateUrl: './youtube-search-component.component.html',
  styleUrls: ['./youtube-search-component.component.css']
})
export class YoutubeSearchComponentComponent implements OnInit {

  results: SearchResult[];
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  updateResults(results: SearchResult[]): void {
    this.results = results;
  }

}
