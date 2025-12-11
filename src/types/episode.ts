import type { Character } from "./character"

export interface Episode {
    id: number,
    name: string,
    episode: string,
    air_date: string
}

export interface CharacterDetails extends Character {
    episodes: Episode[];
}