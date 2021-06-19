import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  options = {          
  }
  options2 = {
    slidesPerView: 1.5,
    spaceBetween: 20
  }
  constructor() { }

  ngOnInit() {
  }

}
