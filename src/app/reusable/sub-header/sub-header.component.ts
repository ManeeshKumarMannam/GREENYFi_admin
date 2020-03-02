import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styles: [],
})
export class SubHeaderComponent extends BaseComponent implements OnInit {
  @Input() subHeaderData: any;

  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() { }
}
