import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { FixHtmlSymbolsPipe } from './fix-html-symbols.pipe';
import { WithSpacesPipe } from './with-spaces.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
    WithSpacesPipe,
  ],
  imports: [
    CommonModule,
      NgbModule
  ],
  exports: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
  ]
})
export class SharedModule { }