import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/PopularTag.type';
import { environment } from 'src/environments/environment';
import { PopularTagsResponseInterface } from '../types/PopularTagsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';
    return this.http.get(url).pipe(
      map((response: PopularTagsResponseInterface) => {
        return response.tags;
      })
    );
  }
}
