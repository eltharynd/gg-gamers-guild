import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  width: number
  height: number

  viewPortChanges: Subject<void> = new Subject()

  setWidth(width: number) {
    this.width = width
    this.viewPortChanges.next()
  }
  setHeight(height: number) {
    this.height = height
    this.viewPortChanges.next()
  }
}
