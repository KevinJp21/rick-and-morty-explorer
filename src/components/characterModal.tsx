import type { CharacterDetails } from "../types/episode";

type Props = {
    character: CharacterDetails | null;
    onClose: () => void;
}

export default function CharacterModal({ character, onClose }: Props) {
    if (!character) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h[90vh] overflow-hidden shadow-2xl">
                <h1>{character.name}</h1>
            </div>
            <button onClick={onClose}>
                Cerrar
            </button>
        </div>
    )

}