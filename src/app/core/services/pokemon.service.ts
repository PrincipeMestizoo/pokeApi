import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of } from "rxjs";
import { catchError, map, switchMap, shareReplay } from "rxjs/operators";
import {
  Pokemon,
  PokemonDetailResponse,
  PokemonListResponse,
} from "../../shared/models/pokemon.model";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private readonly baseUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(private readonly http: HttpClient) {}

  getPokemonPage(limit: number, offset: number): Observable<Pokemon[]> {
    const listUrl = `${this.baseUrl}?limit=${limit}&offset=${offset}`;

    return this.http.get<PokemonListResponse>(listUrl).pipe(
      switchMap((listResponse) => {
        const detailRequests = listResponse.results.map((item) =>
          this.http.get<PokemonDetailResponse>(item.url),
        );
        return detailRequests.length ? forkJoin(detailRequests) : of([]);
      }),
      map((details) => details.map((detail) => this.mapToPokemon(detail))),
      catchError((error) => {
        console.error("Error al obtener el listado de Pokémon", error);
        throw error;
      }),
    );
  }

  searchPokemon(term: string): Observable<Pokemon[]> {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      return of([]);
    }

    return this.http
      .get<PokemonDetailResponse>(`${this.baseUrl}/${normalized}`)
      .pipe(
        map((detail) => [this.mapToPokemon(detail)]),
        catchError(() => {
          return of<Pokemon[]>([]);
        }),
      );
  }

  getTotalCount(): Observable<number> {
    return this.http
      .get<PokemonListResponse>(`${this.baseUrl}?limit=1&offset=0`)
      .pipe(
        map((response) => response.count),
        shareReplay(1),
        catchError(() => of(0)),
      );
  }

  private mapToPokemon(detail: PokemonDetailResponse): Pokemon {
    return {
      id: detail.id,
      name: detail.name,
      image:
        detail.sprites.other?.["official-artwork"]?.front_default ??
        detail.sprites.front_default ??
        "assets/pokeball-placeholder.png",
      height: detail.height,
      weight: detail.weight,
      baseExperience: detail.base_experience,
      types: detail.types.map((t) => t.type.name),
      abilities: detail.abilities.map((a) => a.ability.name),
      stats: detail.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  }
}
