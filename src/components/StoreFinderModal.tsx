import { Check, Clock, MapPin, Train, X } from 'lucide-react';
import { SINGAPORE_STORES, StoreLocation } from '../data/airPurifiers';

interface StoreFinderModalProps {
  isOpen: boolean;
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
  onClose: () => void;
}

export function StoreFinderModal({
  isOpen,
  selectedStore,
  onSelectStore,
  onClose,
}: StoreFinderModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-finder-title"
    >
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 id="store-finder-title" className="font-display text-lg font-bold text-slate-900">
              Harvey Norman Singapore Stores
            </h2>
            <p className="text-xs text-slate-500">
              Select your preferred outlet for 2-Hour Click &amp; Collect stock checks
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close store finder"
            className="p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-3">
          {SINGAPORE_STORES.map((store) => {
            const isSelected = store.id === selectedStore.id;
            return (
              <div
                key={store.id}
                className={`border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isSelected
                    ? 'border-[#00338D] bg-[#00338D]/[0.03]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-slate-900">{store.name}</h3>
                    <span className="text-xs text-slate-500">· {store.region}</span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Train className="w-3.5 h-3.5 text-slate-400" />
                      {store.mrt}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {store.hours}
                    </span>
                    <span className="text-emerald-700 font-medium">{store.pickupReadyText}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectStore(store);
                    onClose();
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00338D] text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-[#00338D] hover:text-[#00338D]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{isSelected ? 'Selected Store' : 'Set Pickup Store'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
