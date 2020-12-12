import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { FixHtmlSymbolsPipe } from './fix-html-symbols.pipe';
import { WithSpacesPipe } from './with-spaces.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarColorDirective } from './progress-bar-color.directive';
import { ButtonColorDirective } from './button-color.directive';



@NgModule({
  declarations: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
    WithSpacesPipe,
    ProgressBarColorDirective,
    ButtonColorDirective,
  ],
  imports: [
    CommonModule,
      NgbModule
  ],
  exports: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
    ProgressBarColorDirective,
    ButtonColorDirective
  ]
})
export class SharedModule { }