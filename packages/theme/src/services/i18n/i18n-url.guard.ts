import { Inject, Injectable, Optional, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AlainConfigService } from '@delon/util/config';

import { AlainI18NService, ALAIN_I18N_TOKEN } from './i18n';

@Injectable({ providedIn: 'root' })
export class AlainI18NGuardService {
  constructor(
    @Optional()
    @Inject(ALAIN_I18N_TOKEN)
    private i18nSrv: AlainI18NService,
    private cogSrv: AlainConfigService
  ) {}

  process(route: ActivatedRouteSnapshot): Observable<boolean> {
    const lang = route.params && route.params[this.cogSrv.get('themeI18n')?.paramNameOfUrlGuard ?? 'i18n'];
    if (lang != null) {
      this.i18nSrv.use(lang);
    }
    return of(true);
  }
}

/**
 * Simple 路由守卫, [ACL Document](https://ng-alain.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivate: [ alainI18nCanActivate ]
 * }
 * ```
 */
export const alainI18nCanActivate: CanActivateFn = childRoute => inject(AlainI18NGuardService).process(childRoute);

/**
 * Simple 路由守卫, [ACL Document](https://ng-alain.com/auth/guard).
 *
 * ```ts
 * data: {
 *  path: 'home',
 *  canActivateChild: [ alainI18nCanActivateChild ]
 * }
 * ```
 */
export const alainI18nCanActivateChild: CanActivateChildFn = route => inject(AlainI18NGuardService).process(route);
