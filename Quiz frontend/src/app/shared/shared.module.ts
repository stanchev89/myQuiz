import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { FixHtmlSymbolsPipe } from './fix-html-symbols.pipe';



@NgModule({
  declarations: [
    PageTitleComponent,
    FixHtmlSymbolsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PageTitleComponent,
    FixHtmlSymbolsPipe
  ]
})
export class SharedModule { }
