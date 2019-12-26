import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'events-for-day',
  templateUrl: './events-for-day.component.html',
  styleUrls: ['./events-for-day.component.css']
})
export class EventsForDayComponent implements OnInit {

  @Input() day: string;
  @Input() eventType: string;
  @Input() eventsInDay: FormGroup;

  MAX_LENGTH = 400;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  addTextArea() {
    (<FormArray>this.eventsInDay.get(this.day + 'Events.' + this.eventType)).push(new FormControl(null));
    }

    config = {
        toolbar: [
            ['bold', 'italic', 'underline', { 'color': [] }, { 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }]
        ]
    }

    editorStyle = {
        height: '170px'
    }

    maxLength(event) {
        if (event.editor.getLength() > this.MAX_LENGTH) {
            event.editor.deleteText(this.MAX_LENGTH, event.editor.getLength());
        }
    }

}
