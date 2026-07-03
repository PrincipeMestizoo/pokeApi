export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    ['official-artwork']?: {
      front_default: string | null;
    };
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitySlot {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonStatSlot {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  stats: PokemonStatSlot[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  baseExperience: number;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
}
