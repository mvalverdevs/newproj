import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbService {
    title: BehaviorSubject<string>;
    subtitle: BehaviorSubject<string>;

    constructor() {
        this.title = new BehaviorSubject('');
        this.subtitle = new BehaviorSubject('');
    }

    setTitle(name: string) {
        this.title.next(name);
    }
    setSubtitle(name: string) {
        this.subtitle.next(name);
    }
    getTitle(): string {
        return this.title.value;
    }
    getSubtitle(): string {
        return this.subtitle.value;
    }
}
