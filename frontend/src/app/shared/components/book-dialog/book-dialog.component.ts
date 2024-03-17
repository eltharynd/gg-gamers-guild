import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import {
  Adventurer,
  AssignedEvent,
  AssignedRound,
  Party,
} from 'gg-gamers-guild-interfaces'
import { debounceTime } from 'rxjs'
import { AuthGuard } from '../../guards/auth.guard'
import { DataService } from '../../services/data.service'

export interface BookDialogData {
  event: AssignedEvent
  round: AssignedRound
}

@Component({
  selector: 'book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.scss',
})
export class BookDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: BookDialogData,
    public data: DataService,
    public auth: AuthGuard,
    private ngZone: NgZone
  ) {}

  @ViewChild('auto') auto

  party: Party = {
    leader: {
      user: this.auth.authenticatedUser?._id,
      name: this.auth.authenticatedUser?.username,
    },
    partners: [],
  }

  search = new FormControl<string>('')
  available: Adventurer[] = []

  async ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(async (data) => {
      if (this._selected) {
        if (this._selected.user) {
          this._selected = null
          this.available = []
        }
        return
      }

      if (this.search.value?.length && this.search.value?.length > 0) {
        let response: Adventurer[] = await this.data.post(
          `bookings/${this.dialogData.event._id}/rounds/${this.dialogData.round._id}/available`,
          { search: this.search.value }
        )
        response = response.filter((a) => {
          return !this.party.partners.find((aa) => aa.user === a.user)
        })
        this.available = [...response, { name: this.search.value }]
      } else {
        this.available = []
      }
    })
  }

  save() {
    if (!this.auth.authenticatedUser) return this.dialogRef.close()
    if (this.data.busy || this.auth.busy) return

    //TODO save on server
    this.dialogRef.close(this.party)
  }

  _selected: Adventurer
  onSelection(adventurer: Adventurer) {
    this._selected = adventurer
    if (!adventurer.user) return
    if (this.party.partners.includes(adventurer)) return

    this.party.partners.push(adventurer)
    this.search.setValue('')
  }

  guestCancel() {
    this.search.setValue('')
    this._selected = null
  }
  guestConfirm() {
    this._selected.name = this._selected.name.replace(/\@.*$/, '')
    this.party.partners.push(this._selected)
    this.search.setValue('')
    this._selected = null
  }

  guestMessage: string = `Non stai collegando l'invito ad un utente esistente.
  
  Puoi comunque effettuare una riservazione specificando tu il suo nome.
  
  Tuttavia in questa maniera non potranno controllare/modificare la loro riservazione.
  È preferibile che si iscrivano da soli, specificando poi di voler essere raggruppati con te.`
}
