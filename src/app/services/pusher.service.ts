import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import Pusher from 'pusher-js';

@Injectable()
export class PusherService {
  pusher: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      authEndpoint: `${environment.ntApiEndpoint}/pusher/auth`
    });
  }

  trigger(channel: string, eventName: string): void {
    const self = this;
    const c = this.pusher.subscribe(`private-${channel}`);
    c.bind('pusher:subscription_succeeded', () => {
      self.pusher.send_event(`client-${eventName}`, {}, `private-${channel}`);
    });
  }
}
