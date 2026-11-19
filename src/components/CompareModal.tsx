import { ShoppingCart, X } from 'lucide-react';
import { AirPurifierProduct } from '../data/airPurifiers';
import { ProductImage } from './ProductImage';

interface CompareModalProps {
  items: AirPurifierProduct[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: AirPurifierProduct) => void;
}

export function CompareModal({
  items,
  isOpen,
  onClose,
  onRemove,
  onAddToCart,
}: CompareModalProps) {
  if (!isOpen || items.length === 0) return null;

  const specRows: Array<{ label: string; render: (p: AirPurifierProduct) => string }> = [
    { label: 'Brand', render: (p) => p.brand },
    { label: 'Category Type', render: (p) => p.purifierType },
    { label: 'Room Coverage', render: (p) => `Up to ${p.coverageSqm} m²` },
    { label: 'CADR Rating', render: (p) => `${p.cadrCmh} m³/h` },
    { label: 'Filtration System', render: (p) => p.filtration },
    { label: 'Noise Level', render: (p) => p.noiseDb },
    { label: 'Smart Connectivity', render: (p) => p.smartControl },
    { label: 'Dimensions (H×W×D)', render: (p) => p.dimensionsMm },
    { label: 'Local Warranty', render: (p) => `${p.warrantyYears} Years` },
    {
      label: 'Climate Voucher',
      render: (p) => (p.climateVoucherEligible ? 'Eligible' : 'Not Applicable'),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 id="compare-modal-title" className="font-display text-lg font-bold text-slate-900">
              Compare Air Purifiers
            </h2>
            <p className="text-xs text-slate-500">
              Side-by-side technical specifications across selected models
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-auto p-6">
          <table className="w-full table-fixed border-collapse text-left min-w-[640px]">
            <colgroup>
              <col className="w-44" />
              {items.map((item) => (
                <col key={item.id} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="p-3 align-top text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  Model
                </th>
                {items.map((item) => (
                  <th key={item.id} className="p-3 align-top border-b border-slate-200">
                    <div className="relative bg-[#F8FAFC] border border-slate-100 rounded-md p-4 mb-3 h-44 w-full flex items-center justify-center">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="w-36 h-36 object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="absolute top-2 right-2 p-1 bg-white border border-slate-200 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-[#00338D] uppercase">{item.brand}</p>
                    <p className="font-display text-sm font-bold text-slate-900 line-clamp-2 min-h-[2.5rem] mt-0.5 mb-2">
                      {item.name}
                    </p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                        S${item.price.toLocaleString()}
                      </span>
                      {item.usualPrice && (
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          S${item.usualPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#00338D] hover:bg-[#002569] text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {specRows.map((row) => (
                <tr key={row.label} className="hover:bg-slate-50/70">
                  <td className="p-3 font-medium text-slate-600 text-xs uppercase tracking-wide">
                    {row.label}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-3 text-slate-900 font-medium tabular-nums">
                      {row.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
