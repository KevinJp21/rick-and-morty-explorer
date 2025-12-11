type paginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: paginationProps) {
    const pagesToShow = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">

            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded cursor-pointer bg-gray-200 disabled:bg-gray-400"
            >
                Anterior
            </button>

            {/* Botones numéricos */}
            {pages.map(num => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`px-3 py-1 rounded cursor-pointer ${num === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                        }`}
                >
                    {num}
                </button>
            ))}

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 cursor-pointer disabled:bg-gray-400"
            >
                Siguiente
            </button>
        </div>
    )
}