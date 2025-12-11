import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getCharacters } from "./services/characterService"
import type { Character } from "./types/character"
import CharacterCard from "./components/characterCard"
import Pagination from "./components/pagination"

export default function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError("")
      const data = await getCharacters(pageFromUrl);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError("Error al cargar los personajes, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [pageFromUrl]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  }

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchCharacters();
  }

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-blue-600 text-xl font-semibold">
          Cargando personajes...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={retryFetch}
        >
          Reintentar
        </button>
      </div>
    )
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

      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {characters.map((char) => (
          <CharacterCard key={char.id} name={char.name} image={char.image} species={char.species} status={char.status} />
        ))}
      </section>

      <Pagination 
        currentPage={pageFromUrl}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </main>
  )
}

