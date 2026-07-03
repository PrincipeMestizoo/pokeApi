import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";

@NgModule({
  declarations: [PokemonCardComponent],
  imports: [SharedModule],
  exports: [PokemonCardComponent],
})
export class ComponentsModule {}
