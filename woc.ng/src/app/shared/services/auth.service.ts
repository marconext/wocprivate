import { Injectable } from '@angular/core';
import {Adal5Service} from 'adal-angular5';

@Injectable()
export class AuthService {

  private _user = null;
  private _config = {

    // tenant: '1b06c97c-c216-4cab-bf49-83bf81ecec08', // < --opjectId from Azure AD Enterprise Applications
    // tenant: 'DemoOpenIdConnect', // < -- name from Azure AD Enterprise Applications
    tenant: '87595dac-c372-4455-9459-c98411db977e', // < --Azure Active Directory DirectoryID
    clientId: '17aed305-1227-481e-9408-3b37f5bd063c', // <-- applicationId from Azure AD
    redirectUri: 'http://localhost:4200/auth-callback', // <--callback URI mentionned in the previous article
    postLogoutRedirectUri: 'http://localhost:4200' // < --same URI as homepage URI mentionned in the previous article
  };

  constructor(private _adal: Adal5Service) {
    this._adal.init(this._config);
  }

  public isLoggedIn(): boolean {
    return this._adal.userInfo.authenticated;
  }

  public signout(): void {
    this._adal.logOut();
  }

  public startAuthentication(): any {
    this._adal.login();
  }

  public getName(): string {
    return this._user.profile.name;

  }

  public completeAuthentication(): void {
    this._adal.handleWindowCallback();
    this._adal.getUser().subscribe(user => {
      this._user = user;
      console.log(this._adal.userInfo);
      const expireIn = user.profile.exp - new Date().getTime();
    });
  }
}
