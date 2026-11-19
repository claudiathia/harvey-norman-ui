import { MapPin, Search, X } from 'lucide-react';
import { StoreLocation } from '../data/airPurifiers';

interface StorefrontToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStore: StoreLocation;
  onOpenStoreFinder: () => void;
  onQuickResetBreadcrumb: () => void;
}

export function StorefrontToolbar({
  searchQuery,
  onSearchChange,
  selectedStore,
  onOpenStoreFinder,
  onQuickResetBreadcrumb,
}: StorefrontToolbarProps) {
  return (
    <div className="bg-[#F5F7FA] border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <button
            type="button"
            onClick={onQuickResetBreadcrumb}
            className="hover:text-[#00338D] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={onQuickResetBreadcrumb}
            className="hover:text-[#00338D] transition-colors cursor-pointer"
          >
            Home Appliances
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={onQuickResetBreadcrumb}
            className="hover:text-[#00338D] transition-colors cursor-pointer"
          >
            Air Conditioning &amp; Treatment
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-800">Air Purifiers</span>
        </nav>

        {/* Search & Store Pickup Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Dyson, Novita, HEPA..."
              aria-label="Search air purifiers"
              className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-8 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00338D] focus:ring-1 focus:ring-[#00338D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenStoreFinder}
            className="inline-flex items-center justify-center sm:justify-start gap-2 bg-white border border-slate-300 hover:border-[#00338D] text-slate-700 hover:text-[#00338D] rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00338D]" />
            <span className="truncate max-w-[180px]">{selectedStore.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
