import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "../services/characterService";
import type { Character } from "../types/character";

type UseCharactersResult = {
  characters: Character[];
  loading: boolean;
  error: string | null;
  noResults: boolean;
  totalPages: number;
  retry: () => Promise<void>;
};

export function useCharacters(page: number, search: string): UseCharactersResult {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setNoResults(false);

      const data = await getCharacters(page, search);
      setCharacters(data.results);
      setTotalPages(data.info.pages);

      if (!data.results.length) {
        setNoResults(true);
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 404) {
        setCharacters([]);
        setTotalPages(1);
        setNoResults(true);
        setError(null);
      } else {
        setError("Error al cargar los personajes, intente nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return {
    characters,
    loading,
    error,
    noResults,
    totalPages,
    retry: fetchCharacters,
  };
}

