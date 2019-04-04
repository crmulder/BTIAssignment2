import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  requestedResource: string;

  constructor(private res: ActivatedRoute) { 
    this.res.url.subscribe(x => this.requestedResource = x.join('/'));
  }

  ngOnInit() {
  }

}
