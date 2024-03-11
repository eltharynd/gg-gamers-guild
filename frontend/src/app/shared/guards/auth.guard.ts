import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { AuthpalClient, UserChangesEmitter } from 'authpal-client'
import axios from 'axios'
import { GoogleUser, PublicUser } from 'gg-gamers-guild-interfaces'
import { Observable, Subject } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  busy: boolean = false

  private authPalClient: AuthpalClient

  authenticatedUser: PublicUser
  authenticatedUserChanges: Subject<{ user: PublicUser; loggedIn: boolean }> =
    new Subject()

  userChangesEmitter: UserChangesEmitter = new UserChangesEmitter()
  resumeDoneEmitter: Subject<void> = new Subject<void>()

  constructor(private router: Router, private route: ActivatedRoute) {
    this.authPalClient = new AuthpalClient({
      googlePostUrl: `${environment.API_BASE_URL}auth/google`,
      loginPostURL: `${environment.API_BASE_URL}auth/login`,
      logoutGetURL: `${environment.API_BASE_URL}auth/logout`,
      resumeGetURL: `${environment.API_BASE_URL}auth/resume`,

      userChangesEmitter: this.userChangesEmitter,
      resumeDoneEmitter: this.resumeDoneEmitter,
      resumeDoneMiddleware: async (changes) => {
        if (changes?.authenticated) await this.me()
      },
    })
    this.userChangesEmitter.subscribe(async (changes: any) => {
      if (!changes.authenticated) {
        this.authenticatedUser = null

        let currentRoute = this.router.routerState.root
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild
          if (currentRoute.routeConfig?.canActivate) {
            if (
              /AuthGuard/i.test(currentRoute.routeConfig?.canActivate[0]?.name)
            )
              this.router.navigate([''])
            break
          } else if (currentRoute.routeConfig?.canActivateChild) {
            if (
              /AuthGuard/i.test(
                currentRoute.routeConfig?.canActivateChild[0]?.name
              )
            )
              this.router.navigate([''])
            break
          }
        }
      }
    })

    this.authPalClient.attemptResume()
  }

  private guardedRoute: string
  canActivateChild(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(async (resolve) => {
      await this.resumeDoneEmitter.toPromise()

      if (this.authenticatedUser) {
        resolve(true)
      } else {
        this.guardedRoute = _state.url
        this.router.navigate(['auth/login'])
        resolve(false)
      }
    })
  }

  async google(google: GoogleUser) {
    this.busy = true
    return new Promise<void>((resolve, reject) => {
      this.authPalClient
        .google(google as any)
        .then(async () => {
          await this.me()
            .then(() => {
              if (this.guardedRoute) {
                this.router.navigate([this.guardedRoute])
                this.guardedRoute = null
              }
              this.busy = false
              resolve()
            })
            .catch((e) => {
              this.busy = false
              reject(e)
            })
        })
        .catch((e) => {
          this.busy = false
          reject(e)
        })
    })
  }

  async login(credentials: { email: string; password: string }) {
    this.busy = true
    return new Promise<void>((resolve, reject) => {
      this.authPalClient
        .login(credentials)
        .then(async () => {
          await this.me()
            .then(() => {
              if (this.guardedRoute) {
                this.router.navigate([this.guardedRoute])
                this.guardedRoute = null
              }
              this.busy = false
              resolve()
            })
            .catch((e) => {
              this.busy = false
              reject(e)
            })
        })
        .catch((e) => {
          this.busy = false
          reject(e)
        })
    })
  }

  async logout() {
    this.busy = true

    this.authPalClient
      .logout()
      .then(() => {
        this.authenticatedUser = null
        this.authenticatedUserChanges.next({
          user: this.authenticatedUser,
          loggedIn: false,
        })
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.busy = false
      })
  }

  private async me() {
    return new Promise((resolve, _reject) => {
      axios({
        method: 'get',
        url: `${environment.API_BASE_URL}auth/me`,
        headers: {
          ...this.getAuthorizationHeader(),
        },
      })
        .then(async ({ data }) => {
          this.authenticatedUser = data
          this.authenticatedUserChanges.next({
            user: this.authenticatedUser,
            loggedIn: true,
          })

          this.authenticatedUser = data

          resolve(true)
        })
        .catch((_e) => this.router.navigate(['']))
    })
  }

  getAuthorizationHeader() {
    return this.authPalClient.getAuthorizationHeader()
  }
}
