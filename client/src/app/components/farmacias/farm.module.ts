import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FarmaciaComponent } from "./modals/farmacia/farmacia.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UpdateFarmComponent } from "./modals/update-farm/update-farm.component";
import { ListFarmaciasComponent } from "./list-farmacias/list-farmacias.component";

@NgModule({
    declarations: [FarmaciaComponent, UpdateFarmComponent, ListFarmaciasComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [FarmaciaComponent, UpdateFarmComponent, ListFarmaciasComponent]
})

export class FarmModule { }