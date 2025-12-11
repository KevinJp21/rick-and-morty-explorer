import CharacterCard from "./characterCard";
import { LoaderCircle } from "lucide-react";
import type { Character } from "../types/character";

type Props = {
  characters: Character[];
  loading: boolean;
  error: string | null;
  noResults: boolean;
  searchTerm: string;
  onRetry: () => void;
  onSelectCharacter: (id: number) => void;
};

export default function CharactersSection({
  characters,
  loading,
  error,
  noResults,
  searchTerm,
  onRetry,
  onSelectCharacter,
}: Props) {
  return (
    <section className="min-h-[260px] mb-8">
      {loading && (
        <div className="text-center mt-10 flex flex-col items-center justify-center">
          <LoaderCircle className="text-teal-500 animate-spin mb-1" size={64} />
          <p className="text-gray-900 text-2xl text-center">
            Cargando personajes..
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center mt-10">
          <p className="text-red-600 text-xl font-semibold">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={onRetry}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && noResults && (
        <div className="text-center mt-10">
          <p className="text-gray-700 text-lg font-semibold">
            No se encontraron personajes
            {searchTerm ? ` para "${searchTerm}"` : ""}.
          </p>
        </div>
      )}

      {!loading && !error && !noResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              name={char.name}
              image={char.image}
              species={char.species}
              status={char.status}
              onClick={() => onSelectCharacter(char.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

