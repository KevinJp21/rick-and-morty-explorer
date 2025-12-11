import type { Character } from "../types/character";

type CharacterCardProps = Pick<Character, 'name' | 'image' | 'species' | 'status'>;


export default function CharacterCard({ name, image, species, status }: CharacterCardProps) {

    const statusText = status === 'Alive' ? 'Vivo' : status === 'Dead' ? 'Muerto' : 'Desconocido';
    const statusColor = status === 'Alive' ? 'bg-green-500' : status === 'Dead' ? 'bg-red-500' : 'bg-gray-500';

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <div className={`w-2.5 h-2.5 rounded-full ${statusColor} animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-800">
                        {statusText}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {name}
                </h3>
                <div className="space-y-1.5">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold mr-1">
                            Especie:
                        </span>
                        {species}
                    </p>
                </div>
            </div>
        </div>
    )
}