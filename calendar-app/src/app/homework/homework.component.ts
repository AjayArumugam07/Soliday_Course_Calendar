import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  @Input() eventsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
  }

}
