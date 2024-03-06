import { Component } from '@angular/core'
import { POPIN } from '../../shared/ui/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [POPIN],
})
export class HomeComponent {}
