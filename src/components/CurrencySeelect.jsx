import { useState } from 'react';

function CurrencySelect({ currencies, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className="border p-4 rounded-lg cursor-pointer flex justify-between items-center"
      >
        <span>
          {selected.flag} {selected.code}
        </span>
        <span>▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow mt-2 max-h-60 overflow-y-auto z-50">
          {currencies.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
              <span className="text-gray-500 text-sm">{c.name}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CurrencySelect;