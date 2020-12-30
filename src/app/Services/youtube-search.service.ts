import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from '../Models/SearchResult.model';


export const YOUTUBE_API_KEY = environment.YOUTUBE_API_KEY;
export const YOUTUBE_API_URL = environment.YOUTUBE_API_URL;
@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string,
  ) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      // `fields=items(id,snippet,statistics)`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(
      map(response => {
        return response['items'].map(item => {
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      }));
  }
}
