import type { CharacterDetails } from "../types/episode";
import { Globe, MapPin, User, X } from "lucide-react";
type Props = {
    character: CharacterDetails | null;
    onClose: () => void;
}

export default function CharacterModal({ character, onClose }: Props) {
    if (!character) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h[90vh] overflow-hidden shadow-2xl">
                <div className="relative">
                    <div className="relative h-48 bg-linear-to-r from-blue-500 to-teal-500">
                        <img src={character.image} alt={character.name}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl absolute -bottom-16 left-8" />
                    </div>
                    <button type="button" onClick={onClose}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg cursor-pointer">
                        <X className="text-gray-700" size={20} />
                    </button>
                </div>
                <div className="pt-20 px-8 pb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {character.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                            <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Origen
                                </p>
                                <p className="text-sm text-gray-900 font-medium">
                                    {character.origin.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                            <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Localización
                                </p>
                                <p className="text-sm text-gray-900 font-medium">
                                    {character.location.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                            <User className="w-5 h-5 text-purple-500 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Género
                                </p>
                                <p className="text-sm text-gray-900 font-medium">
                                    {character.gender}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}