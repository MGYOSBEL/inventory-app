import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, filter, map, mergeMap, mergeMapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { SearchResult } from '../Models/SearchResult.model';
import { YoutubeSearchService } from '../Services/youtube-search.service';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus />
  `,
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  constructor(
    private youtube: YoutubeSearchService,
    private el: ElementRef
  ) { }

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      debounceTime(250),
      tap(() => this.loading.emit(true)),
      switchMap(query => this.youtube.search(query)),
    ).subscribe(
      (results: SearchResult[]) => {
        this.loading.emit(false);
        this.results.emit(results);
      },
      err => {
        console.log(err);
        this.loading.emit(false);
      },
      () => this.loading.emit(false)
    );
  }
}
