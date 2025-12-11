import { http } from "../utils/http";
import type { CharacterDetails } from "../types/episode";
import type { Character } from "../types/character";

export const getCharacterDetails = async (id: number): Promise<CharacterDetails> => {
    const { data: character } = await http.get<Character>(`/character/${id}`)

    //Obtener IDs de episodios
    const episodeIds = character.episode.map(url => url.split("/").pop()).join(",");

    const { data: episodesData } = await http.get(`/episodes/${episodeIds}`);

    const episodes = Array.isArray(episodesData) ? episodesData : [episodesData];

    return {
        ...character,
        episodes
    }
};
