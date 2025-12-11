import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCharacters } from "./useCharacters";
import { getCharacters } from "../services/characterService";
import type { CharacterResponse } from "../types/character";

// Mock del servicio
vi.mock("../services/characterService");

describe("useCharacters", () => {
  const mockGetCharacters = vi.mocked(getCharacters);

  const mockCharacterResponse: CharacterResponse = {
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth (C-137)", url: "" },
        location: { name: "Citadel of Ricks", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/4",
          "https://rickandmortyapi.com/api/episode/5",
          "https://rickandmortyapi.com/api/episode/6",
          "https://rickandmortyapi.com/api/episode/7",
        ],
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "unknown", url: "" },
        location: { name: "Citadel of Ricks", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe iniciar con loading en true", () => {
    mockGetCharacters.mockResolvedValue(mockCharacterResponse);

    const { result } = renderHook(() => useCharacters(1, ""));

    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBeNull();
  });


  it("debe cargar personajes exitosamente", async () => {
    mockGetCharacters.mockResolvedValue(mockCharacterResponse);

    const { result } = renderHook(() => useCharacters(1, ""));

// Se espera a que el hook termine de cargar los datos.
// `loading` cambiará de true a false cuando la promesa de getCharacters se resuelva.
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toHaveLength(2);
    expect(result.current.characters[0].name).toBe("Rick Sanchez");
    expect(result.current.totalPages).toBe(1);
    expect(result.current.error).toBeNull();
    expect(result.current.noResults).toBe(false);
    expect(mockGetCharacters).toHaveBeenCalledWith(1, "");
  });
});
