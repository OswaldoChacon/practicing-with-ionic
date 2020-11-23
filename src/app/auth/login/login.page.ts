import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { HttpClient } from '@angular/common/http';
const { FacebookLogin } = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    // private facebook: Facebook
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value);
    // this.loginForm.v
  }

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
