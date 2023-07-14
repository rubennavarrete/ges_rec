import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleHeaderComponent } from './simple-header/simple-header.component';
import { SimpleFooterComponent } from './simple-footer/simple-footer.component';
import { SimpleSidebarComponent } from './simple-sidebar/simple-sidebar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
    declarations: [
        SimpleHeaderComponent,
        SimpleFooterComponent,
        SimpleSidebarComponent,
        PaginationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        ReactiveFormsModule,
    ],
    exports: [
        SimpleHeaderComponent,
        SimpleFooterComponent,
        SimpleSidebarComponent,
        PaginationComponent
    ]
})


export class DashboardModule { }