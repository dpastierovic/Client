import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hint-button',
  templateUrl: './hint-button.component.html',
  styleUrls: ['./hint-button.component.scss']
})

export class HintButtonComponent {

  @Input()
  id: string;
  @Input() 
  buttonText: string;
  @Input()
  hintText: string;

  @Output()
  onClick: EventEmitter<any> = new EventEmitter();

  buttonOnClick(): void {
    this.onClick.emit();
  }
}
