import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenStoreFinder: () => void;
  onSelectCategoryNav: (sectionId: string) => void;
}

export function Header({
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenStoreFinder,
  onSelectCategoryNav,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategoryNav('top');
          }}
          className="flex items-center gap-2.5 text-[#00338D] font-display font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338D] rounded"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 bg-[#00338D] text-white text-sm font-extrabold tracking-tighter">
            HN
          </span>
          <span>Harvey Norman</span>
        </a>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Primary categories"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onSelectCategoryNav('catalog-section')}
            className="hover:text-[#00338D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Home Appliances
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoryNav('catalog-section')}
            className="hover:text-[#00338D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Air Conditioning
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoryNav('catalog-section')}
            className="text-[#00338D] font-semibold underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Air Purifiers
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoryNav('buying-guide')}
            className="hover:text-[#00338D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Buying Guide
          </button>
          <button
            type="button"
            onClick={onOpenStoreFinder}
            className="hover:text-[#00338D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Stores
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2.5 bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338D]"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cartCount})</span>
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline tabular-nums border-l border-white/25 pl-2.5">
                S${cartSubtotal.toLocaleString()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
