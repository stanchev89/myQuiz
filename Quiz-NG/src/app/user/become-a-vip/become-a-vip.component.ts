import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-a-vip',
  templateUrl: './become-a-vip.component.html',
  styleUrls: ['./become-a-vip.component.css']
})
export class BecomeAVipComponent implements OnInit {
  pageTitle = 'Joining to our VIP club';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(value): void {
  }

}