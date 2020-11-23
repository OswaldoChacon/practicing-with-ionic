import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
const { FacebookLogin } = Plugins;

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.scss'],
})
export class LoginSocialComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() { }

  async loginFacebook() {
    const FACEBOOK_PERMISSIONS = ['email'];
    // const result = await <FacebookLoginResponse>FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });    
    const result = await <any>FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

    if (result.accessToken) {
      // Login successful.    
      console.log(result.accessToken.token);
      this.http.post(`localhost:8000/api/login/facebook`, result.accessToken.token).subscribe();
      this.getDataFromFacebook(result.accessToken.token);
    } else {
      // Cancelled by user. 
    }
  }

  getDataFromFacebook(accessToken: string) {
    const endpoint = `https://graph.facebook.com/me?fields=name,first_name,last_name,email,picture.width(400).height(400)&access_token=${accessToken}`;
    this.http.get(endpoint).toPromise().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    })
  }
}
