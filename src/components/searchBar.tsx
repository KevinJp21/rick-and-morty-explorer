type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  placeholder = "Buscar...",
  onChange,
}: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="mt-6 w-full max-w-md mx-auto block px-4 py-2 border rounded-lg shadow-sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

