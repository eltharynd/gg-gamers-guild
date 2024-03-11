import { Component } from '@angular/core'
import { debounceTime, fromEvent } from 'rxjs'
import { ViewportService } from './shared/services/viewport.service'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(public viewport: ViewportService) {
    this.viewport.setWidth(window.innerWidth)
    this.viewport.setHeight(window.innerHeight)
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((ev: any) => {
        if (ev.target?.innerWidth) this.viewport.setWidth(ev.target?.innerWidth)
      })
  }
}
