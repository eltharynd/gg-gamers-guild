import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  faHome = faHome
  faAngleLeft = faAngleLeft
  constructor(public _location: Location) {}
}
