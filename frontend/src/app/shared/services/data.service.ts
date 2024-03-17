import { Injectable } from '@angular/core'
import axios, { AxiosError } from 'axios'
import { environment } from '../../../environments/environment'
import { AuthGuard } from '../guards/auth.guard'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  busy: boolean

  constructor(private auth: AuthGuard) {}

  async get(endpoint: string) {
    return this.request('GET', endpoint)
  }

  async post(endpoint: string, body?: any) {
    return this.request('POST', endpoint, body)
  }

  async patch(endpoint: string, body?: any) {
    return this.request('PATCH', endpoint, body)
  }

  async delete(endpoint: string) {
    return this.request('DELETE', endpoint)
  }

  private async request(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.busy = true
      await axios
        .request({
          method: method || 'GET',
          url: `${environment.API_BASE_URL}${endpoint}`,
          headers: {
            ...this.auth.getAuthorizationHeader(),
          },
          data: body,
        })
        .then(({ data }) => {
          this.busy = false
          resolve(data)
        })
        .catch((e: AxiosError) => {
          console.error(e)
          this.busy = false
          reject(e)
        })
    })
  }
}
