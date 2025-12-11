import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getCharacters } from "./services/characterService"
import type { Character } from "./types/character"
import CharacterCard from "./components/characterCard"
import Pagination from "./components/pagination"
import type { CharacterDetails } from "./types/episode"
import { getCharacterDetails } from "./services/characterDetailsService"
import CharacterModal from "./components/characterModal"
import { LoaderCircle } from "lucide-react"

export default function App() {

  //Personajes
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Ventana modal Detalles del personaje
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterDetails | null>(null);
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null);

  //Paginación
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

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
      <div className="text-center mt-20 flex flex-col items-center justify-center">
        <LoaderCircle className="text-teal-500 animate-spin mb-1" size={64} />
        <p className="text-gray-900 text-2xl text-center">
          Cargando personajes..
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

      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            name={char.name}
            image={char.image}
            species={char.species}
            status={char.status}
            onClick={() => openCharacterModal(char.id)}
          />
        ))}
      </section>

      <Pagination
        currentPage={pageFromUrl}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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

