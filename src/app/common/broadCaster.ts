import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

interface IBroadcastEvent {
  key: any;
  data?: any;
}

export class Broadcaster {
  private _eventBus: Subject<IBroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<IBroadcastEvent>();
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter((event) => event.key === key)
      .map((event) => event.data as T);
  }
  unsubscribe() {
    this._eventBus.unsubscribe();
  }
}
