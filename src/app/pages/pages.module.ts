import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ComponentsModule } from "../components/components.module";
import { PokemonListPageComponent } from "./pokemon-list-page/pokemon-list-page.component";

const routes: Routes = [{ path: "", component: PokemonListPageComponent }];

@NgModule({
  declarations: [PokemonListPageComponent],
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
