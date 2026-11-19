import { GitCompareArrows, X } from 'lucide-react';
import { AirPurifierProduct } from '../data/airPurifiers';

interface CompareBarProps {
  items: AirPurifierProduct[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenCompareModal: () => void;
}

export function CompareBar({ items, onRemove, onClear, onOpenCompareModal }: CompareBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[960px] bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-300 whitespace-nowrap shrink-0">
          Compare ({items.length}/3):
        </span>
        <div className="flex items-center gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs shrink-0"
            >
              <span className="max-w-[140px] truncate font-medium">{item.brand} {item.sku}</span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name} from comparison`}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onOpenCompareModal}
          disabled={items.length < 2}
          className="inline-flex items-center gap-1.5 bg-[#00338D] hover:bg-[#0044b8] disabled:bg-slate-700 disabled:text-slate-400 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
        >
          <GitCompareArrows className="w-3.5 h-3.5" />
          <span>{items.length < 2 ? 'Select 1 More' : 'Compare Side-by-Side'}</span>
        </button>
      </div>
    </div>
  );
}
