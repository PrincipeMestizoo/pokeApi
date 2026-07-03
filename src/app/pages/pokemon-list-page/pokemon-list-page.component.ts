import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Pokemon } from "../../shared/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";

@Component({
  selector: "app-pokemon-list-page",
  templateUrl: "./pokemon-list-page.component.html",
  styleUrls: ["./pokemon-list-page.component.scss"],
})
export class PokemonListPageComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  readonly pageSize = 12;
  offset = 0;
  totalCount = 0;

  searchTerm = "";
  isSearchMode = false;
  private readonly searchInput$ = new Subject<string>();

  private subscriptions = new Subscription();

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPage(this.offset);
    this.pokemonService
      .getTotalCount()
      .subscribe((count) => (this.totalCount = count));

    const searchSub = this.searchInput$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.isLoading = true;
          this.errorMessage = null;
          return this.pokemonService.searchPokemon(term);
        }),
      )
      .subscribe({
        next: (results) => {
          this.isLoading = false;
          this.pokemons = results;
          if (this.searchTerm && results.length === 0) {
            this.errorMessage = `No se encontró ningún Pokémon llamado "${this.searchTerm}".`;
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = "Ocurrió un error al buscar. Intenta de nuevo.";
        },
      });

    this.subscriptions.add(searchSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.isSearchMode = term.trim().length > 0;

    if (!this.isSearchMode) {
      this.errorMessage = null;
      this.loadPage(this.offset);
      return;
    }

    this.searchInput$.next(term);
  }

  loadPage(offset: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    const pageSub = this.pokemonService
      .getPokemonPage(this.pageSize, offset)
      .subscribe({
        next: (pokemons) => {
          this.pokemons = pokemons;
          this.offset = offset;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage =
            "Error al cargar la lista de Pokémon. Verifica tu conexión e intenta nuevamente.";
        },
      });

    this.subscriptions.add(pageSub);
  }

  nextPage(): void {
    if (this.offset + this.pageSize < this.totalCount) {
      this.loadPage(this.offset + this.pageSize);
    }
  }

  previousPage(): void {
    if (this.offset - this.pageSize >= 0) {
      this.loadPage(this.offset - this.pageSize);
    }
  }

  retry(): void {
    this.isSearchMode
      ? this.searchInput$.next(this.searchTerm)
      : this.loadPage(this.offset);
  }

  trackByPokemonId(_index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }
}
