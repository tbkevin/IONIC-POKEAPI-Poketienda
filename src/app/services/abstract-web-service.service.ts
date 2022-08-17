import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AbstractWebService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  protected makeGet<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
