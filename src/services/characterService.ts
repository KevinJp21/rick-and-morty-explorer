import { http } from "../utils/http";
import type { CharacterResponse } from "../types/character";

type CharacterQueryParams  = {
    page: number;
    name?: string;
}

export const getCharacters = async (page: number = 1, name?: string):Promise<CharacterResponse> => {
    const params: CharacterQueryParams = { page };

    if(name) {
        params.name = name;
    }

    const { data } = await http.get<CharacterResponse>("/character", {
        params
    });

    return data;
}