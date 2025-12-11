import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Pagination from "./components/pagination"
import type { CharacterDetails } from "./types/episode"
import { getCharacterDetails } from "./services/characterDetailsService"
import CharacterModal from "./components/characterModal"
import { useCharacters } from "./hooks/useCharacters"
import CharactersSection from "./components/charactersSection"
import SearchBar from "./components/searchBar"

export default function App() {

  //Ventana modal Detalles del personaje
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDetails | null>(null);
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null);

  //Query params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  //Paginación  
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const {
    characters,
    loading,
    error,
    noResults,
    totalPages,
    retry,
  } = useCharacters(pageFromUrl, searchFromUrl);

  //Ocultar scroll del body cuando se abra el modal
  useEffect(() => {
    if (selectedCharacter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCharacter])


  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString(), search: searchFromUrl });
  }
  const handleSearchChange = (value: string) => {
    setSearchParams({ page: "1", search: value });
  }

  const openCharacterModal = async (id: number) => {
    setModalError(null);

    try {
      setModalLoading(true);

      const data = await getCharacterDetails(id);
      setSelectedCharacter(data);
      setModalLoading(false);
    } catch (err) {
      console.error(err);
      setModalError("Error al cargar el personaje");
    } finally {
      setModalLoading(false);
    }
  }


  return (
    <main className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mt-2">
          Rick and Morty
          <span className="block text-3xl text-blue-600 mt-2">
            Explorer
          </span>
        </h1>
        <SearchBar
          value={searchFromUrl}
          placeholder="Buscar personaje..."
          onChange={handleSearchChange}
        />

      </header>
      <CharactersSection
        characters={characters}
        loading={loading}
        error={error}
        noResults={noResults}
        searchTerm={searchFromUrl}
        onRetry={retry}
        onSelectCharacter={openCharacterModal}
      />

      {!loading && !error && !noResults && (
        <Pagination
          currentPage={pageFromUrl}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CharacterModal
        character={selectedCharacter}
        loading={modalLoading}
        error={modalError}
        onClose={() => {
          setSelectedCharacter(null);
          setModalError(null);
          setModalLoading(false);
        }}
      />

    </main>
  )
}

