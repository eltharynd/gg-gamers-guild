import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { AuthpalClient, UserChangesEmitter } from 'authpal-client'
import axios from 'axios'
import { PublicUser } from 'gg-gamers-guild-interfaces'
import { Observable, Subject } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  busy: boolean = false

  private authPalClient: AuthpalClient

  authenticatedUser: PublicUser
  authenticatedUserChanges: Subject<{ user: PublicUser; loggedIn: boolean }> =
    new Subject()

  userChangesEmitter: UserChangesEmitter = new UserChangesEmitter()
  resumeDoneEmitter: Subject<void> = new Subject<void>()

  constructor(private router: Router, private route: ActivatedRoute) {
    this.authPalClient = new AuthpalClient({
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
        }
        if (currentRoute.routeConfig?.canActivate)
          if (
            /AuthGuard/i.test(currentRoute.routeConfig?.canActivate[0]?.name)
          ) {
            this.router.navigate([''])
          }
      }
    })

    this.authPalClient.attemptResume()
  }

  private guardedRoute: string
  canActivate(
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

  async login(credentials: { email: string; password: string }) {
    this.busy = true
    return new Promise<void>((resolve, reject) => {
      this.authPalClient
        .login(credentials)
        .then(async () => {
          await this.me()
          this.busy = false
          if (this.guardedRoute) {
            this.router.navigate([this.guardedRoute])
            this.guardedRoute = null
          }
          resolve()
        })
        .catch((e) => {
          this.busy = false
          reject(e)
        })
    })
  }

  async logout(noRedirect?: boolean) {
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
        //if (!noRedirect) this.router.navigate(['/'])
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
