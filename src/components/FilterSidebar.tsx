import { RotateCcw, X } from 'lucide-react';
import {
  AIR_PURIFIER_PRODUCTS,
  BRAND_OPTIONS,
  PURIFIER_TYPE_OPTIONS,
  PurifierType,
} from '../data/airPurifiers';

export type PriceRangeKey = 'all' | 'under-300' | '300-600' | '600-900' | 'over-900';
export type CoverageRangeKey = 'all' | 'up-to-35' | '36-55' | 'over-55';

export interface FilterState {
  brands: Array<(typeof BRAND_OPTIONS)[number]>;
  purifierTypes: PurifierType[];
  priceRange: PriceRangeKey;
  coverageRange: CoverageRangeKey;
  onSaleOnly: boolean;
  climateVoucherOnly: boolean;
  inStockOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const PRICE_OPTIONS: Array<{ key: PriceRangeKey; label: string }> = [
  { key: 'all', label: 'All Prices' },
  { key: 'under-300', label: 'Under S$300' },
  { key: '300-600', label: 'S$300 – S$600' },
  { key: '600-900', label: 'S$600 – S$900' },
  { key: 'over-900', label: 'S$900 & Above' },
];

const COVERAGE_OPTIONS: Array<{ key: CoverageRangeKey; label: string }> = [
  { key: 'all', label: 'All Room Sizes' },
  { key: 'up-to-35', label: 'Small Bedrooms (Up to 35 m²)' },
  { key: '36-55', label: 'Master & Dining (36 – 55 m²)' },
  { key: 'over-55', label: 'Living Rooms (56 m² & Above)' },
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const activeCount =
    filters.brands.length +
    filters.purifierTypes.length +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.coverageRange !== 'all' ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.climateVoucherOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const toggleBrand = (brand: (typeof BRAND_OPTIONS)[number]) => {
    const exists = filters.brands.includes(brand);
    onChange({
      ...filters,
      brands: exists ? filters.brands.filter((b) => b !== brand) : [...filters.brands, brand],
    });
  };

  const toggleType = (type: PurifierType) => {
    const exists = filters.purifierTypes.includes(type);
    onChange({
      ...filters,
      purifierTypes: exists
        ? filters.purifierTypes.filter((t) => t !== type)
        : [...filters.purifierTypes, type],
    });
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h2 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider">
          Filter Results
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00338D] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeCount})</span>
          </button>
        )}
      </div>

      {/* Special Offers & Stock */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Availability &amp; Offers
        </h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => onChange({ ...filters, onSaleOnly: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#00338D] focus:ring-[#00338D]"
            />
            <span>Promotional Deals</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.climateVoucherOnly}
              onChange={(e) => onChange({ ...filters, climateVoucherOnly: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#00338D] focus:ring-[#00338D]"
            />
            <span>Climate Voucher Eligible</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#00338D] focus:ring-[#00338D]"
            />
            <span>In Stock Online</span>
          </label>
        </div>
      </div>

      {/* Brands */}
      <div className="pt-5 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Brand</h3>
        <div className="space-y-2.5">
          {BRAND_OPTIONS.map((brand) => {
            const count = AIR_PURIFIER_PRODUCTS.filter((p) => p.brand === brand).length;
            return (
              <label
                key={brand}
                className="flex items-center justify-between text-sm text-slate-700 cursor-pointer select-none"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-slate-300 text-[#00338D] focus:ring-[#00338D]"
                  />
                  <span>{brand}</span>
                </span>
                <span className="text-xs text-slate-400 tabular-nums">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-5 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Price (SGD)
        </h3>
        <div className="space-y-2">
          {PRICE_OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="price-range"
                checked={filters.priceRange === opt.key}
                onChange={() => onChange({ ...filters, priceRange: opt.key })}
                className="w-4 h-4 border-slate-300 text-[#00338D] focus:ring-[#00338D]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Purifier Type */}
      <div className="pt-5 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Purifier Type
        </h3>
        <div className="space-y-2.5">
          {PURIFIER_TYPE_OPTIONS.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.purifierTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="w-4 h-4 rounded border-slate-300 text-[#00338D] focus:ring-[#00338D]"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Coverage */}
      <div className="pt-5 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Room Coverage
        </h3>
        <div className="space-y-2">
          {COVERAGE_OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="coverage-range"
                checked={filters.coverageRange === opt.key}
                onChange={() => onChange({ ...filters, coverageRange: opt.key })}
                className="w-4 h-4 border-slate-300 text-[#00338D] focus:ring-[#00338D]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Facet Sidebar */}
      <aside aria-label="Product filters" className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-white border border-slate-200 rounded-lg p-5">
          {content}
        </div>
      </aside>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-base text-slate-900">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close filters"
                className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1">{content}</div>
            <div className="pt-4 mt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full bg-[#00338D] text-white text-sm font-semibold py-2.5 rounded-md cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
