import { useEffect, useState } from "react"
import { getCharacters } from "./services/characterService"
import type { Character } from "./types/character"

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
    <main>
      <h1 className='text-red-400'>
        Rick and Morty Explorer
        </h1>
        <ul>
          {characters.map((char) => (
            <li key={char.id}>{char.name}</li>
          ))}
        </ul>
    </main>
  )
}

