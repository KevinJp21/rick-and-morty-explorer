import { useEffect, useState } from "react"
import { getCharacters } from "./services/characterService"
import type { Character } from "./types/character"
import CharacterCard from "./components/characterCard"

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters(1);
        setCharacters(data.results);
      } catch (error) {
        console.error("Error cargando personajes:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchCharacters();
  }, []);

  if(loading) {
    return <p>Cargando personajes...</p>
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
        
    </main>
  )
}

