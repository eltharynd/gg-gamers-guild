import { Component, ViewChild } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MatExpansionPanel } from '@angular/material/expansion'
import { Event } from 'gg-gamers-guild-interfaces'
import { debounceTime } from 'rxjs'
import { DataService } from '../../shared/services/data.service'
import { UtilsService } from '../../shared/services/utils.service'
import { POPIN } from '../../shared/ui/animations'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  animations: [POPIN],
})
export class EventsComponent {
  events: Event[]
  past: Event[]

  @ViewChild('expansionPanel') expansionPanel: MatExpansionPanel

  today = new Date().setHours(0, 0, 0, 0)

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl(
      `Venite a giocare con noi!\n\nL'evento è aperto a tuttə: giocatorə navigatə ed espertə ma anche, e soprattutto, debuttanti desiderosi di imparare.`,
      [Validators.required, Validators.minLength(1)]
    ),
    date: new FormControl(new Date(), [this.utils.futureDateValidator]),
    location: new FormControl("Spazio L'ove", [
      Validators.required,
      Validators.minLength(1),
    ]),
    address: new FormControl('Via Luganetto 1, 6962 Viganello', [
      Validators.required,
      Validators.minLength(1),
    ]),
    rounds: new FormArray([], [this.utils.arrayValidator]),
  })
  createRound = () => {
    let start = new FormControl('', [
      Validators.required,
      this.utils.timeValidator,
    ])
    start.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.utils.timeCorrector(start)
    })
    let end = new FormControl('', [
      Validators.required,
      this.utils.timeValidator,
    ])
    end.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.utils.timeCorrector(end)
    })
    return new FormGroup({
      start,
      end,
      tables: new FormArray([], this.utils.arrayValidator),
    })
  }
  createTable = () => {
    return new FormGroup({
      minimumSeats: new FormControl(),
      optimalSeats: new FormControl(),
      maximumSeats: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    })
  }

  constructor(public data: DataService, private utils: UtilsService) {}

  async ngOnInit() {
    let events: Event[] = await this.data.get(`events`)
    this.events = events.filter((e) => {
      return new Date(e.date).getTime() >= this.today
    })
    this.past = events.filter((e) => {
      return new Date(e.date).getTime() < this.today
    })
  }

  addRound() {
    let formArray: FormArray = this.formGroup.get('rounds') as FormArray
    let round = this.createRound()
    if (formArray.length > 0) {
      let previous = formArray.value.at(-1)

      Object.keys(previous).forEach((k) => {
        if (k === 'tables') {
          let tables: FormArray = new FormArray([], [this.utils.arrayValidator])
          previous[k].forEach((t) => {
            let table = this.createTable()
            Object.keys(t).forEach((kk) => {
              table.get(kk).setValue(t[kk])
            })
            tables.push(table)
          })
          round.setControl(k, tables)
        } else round.get(k).setValue(previous[k])
      })
    } else {
    }
    formArray.push(round)
  }

  removeRound(round: AbstractControl) {
    let formArray: FormArray = this.formGroup.get('rounds') as FormArray
    let index = formArray.controls.findIndex((control) => control === round)
    if (index >= 0) formArray.removeAt(index)
  }

  addTable(round: AbstractControl) {
    let formArray: FormArray = (round as FormGroup).get('tables') as FormArray
    let table = this.createTable()
    if (formArray.length > 0) {
      let previous = formArray.value.at(-1)
      Object.keys(previous).forEach((k) => {
        table.get(k).setValue(previous[k])
      })
    }
    formArray.push(table)
  }

  removeTable(round: AbstractControl, table: AbstractControl) {
    let formArray: FormArray = (round as FormGroup).get('tables') as FormArray
    let index = formArray.controls.findIndex((control) => control === table)
    if (index >= 0) formArray.removeAt(index)
  }

  async save() {
    if (this.formGroup.valid) {
      this.data.post(`events`, this.formGroup.getRawValue()).then((created) => {
        this.events.unshift(created)

        let rounds: FormArray = this.formGroup.get('rounds') as FormArray
        rounds.clear()
        this.formGroup.reset()
        this.expansionPanel.close()
      })
    }
  }

  async deleteEvent(event: Event) {
    this.data.delete(`events/${event._id}`).then(() => {
      this.events.splice(this.events.indexOf(event), 1)
    })
  }
}
