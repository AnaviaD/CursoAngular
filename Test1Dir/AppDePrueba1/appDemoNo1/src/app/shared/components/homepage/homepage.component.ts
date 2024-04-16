import { Component, OnInit } from '@angular/core';
import { TestserviceService } from '../../../services/testservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [
  ]
})
export class HomepageComponent implements OnInit {

  constructor( private testserviceService: TestserviceService) { }

  ngOnInit(): void {
    console.log(`
    ${this.testserviceService.testApi()}
    `);
  }



}
