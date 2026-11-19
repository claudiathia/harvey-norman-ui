import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  AIR_PURIFIER_PRODUCTS,
  AirPurifierProduct,
  SINGAPORE_STORES,
  StoreLocation,
} from './data/airPurifiers';
import { Header, NavCategoryAction } from './components/Header';
import { StorefrontToolbar } from './components/StorefrontToolbar';
import { CategoryHero } from './components/CategoryHero';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { StoreFinderModal } from './components/StoreFinderModal';
import { BuyingGuide } from './components/BuyingGuide';
import { Footer } from './components/Footer';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'coverage-desc';

const INITIAL_FILTERS: FilterState = {
  brands: [],
  purifierTypes: [],
  priceRange: 'all',
  coverageRange: 'all',
  onSaleOnly: false,
  climateVoucherOnly: false,
  inStockOnly: false,
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [selectedStore, setSelectedStore] = useState<StoreLocation>(SINGAPORE_STORES[0]);
  const [isStoreFinderOpen, setIsStoreFinderOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [startInCheckout, setStartInCheckout] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState<AirPurifierProduct | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = AIR_PURIFIER_PRODUCTS.filter((p) => {
      if (q) {
        const haystack = `${p.brand} ${p.name} ${p.sku} ${p.filtration} ${p.purifierType} ${p.shortSubtitle}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      if (filters.purifierTypes.length > 0 && !filters.purifierTypes.includes(p.purifierType)) {
        return false;
      }

      if (filters.priceRange === 'under-300' && p.price >= 300) return false;
      if (filters.priceRange === '300-600' && (p.price < 300 || p.price > 600)) return false;
      if (filters.priceRange === '600-900' && (p.price <= 600 || p.price > 900)) return false;
      if (filters.priceRange === 'over-900' && p.price <= 900) return false;

      if (filters.coverageRange === 'up-to-35' && p.coverageSqm > 35) return false;
      if (filters.coverageRange === '36-55' && (p.coverageSqm < 36 || p.coverageSqm > 55)) return false;
      if (filters.coverageRange === 'over-55' && p.coverageSqm <= 55) return false;

      if (filters.onSaleOnly && !p.usualPrice) return false;
      if (filters.climateVoucherOnly && !p.climateVoucherEligible) return false;
      if (filters.inStockOnly && !p.inStock) return false;

      return true;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating-desc') sorted.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'coverage-desc') sorted.sort((a, b) => b.coverageSqm - a.coverageSqm);

    return sorted;
  }, [searchQuery, filters, sortBy]);

  const compareProducts = useMemo(
    () => AIR_PURIFIER_PRODUCTS.filter((p) => compareIds.includes(p.id)),
    [compareIds],
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleAddToCart = (product: AirPurifierProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleCompare = (product: AirPurifierProduct) => {
    setCompareIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product.id];
      }
      return [...prev, product.id];
    });
  };

  const handleResetAll = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleOneClickCheckout = (product: AirPurifierProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product, quantity: qty }];
    });
    setStartInCheckout(true);
    setIsCartOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavCategoryAction = (action: NavCategoryAction) => {
    if (action.openStores) {
      setIsStoreFinderOpen(true);
      return;
    }
    if (action.resetAll) {
      setFilters(INITIAL_FILTERS);
      setSearchQuery('');
    } else if (action.type || action.promoOnly || action.climateOnly) {
      setFilters({
        ...INITIAL_FILTERS,
        purifierTypes: action.type ? [action.type] : [],
        onSaleOnly: Boolean(action.promoOnly),
        climateVoucherOnly: Boolean(action.climateOnly),
      });
    }
    if (action.sectionId) {
      scrollToSection(action.sectionId);
    }
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    filters.brands.length > 0 ||
    filters.purifierTypes.length > 0 ||
    filters.priceRange !== 'all' ||
    filters.coverageRange !== 'all' ||
    filters.onSaleOnly ||
    filters.climateVoucherOnly ||
    filters.inStockOnly;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => {
          setStartInCheckout(false);
          setIsCartOpen(true);
        }}
        onSelectCategoryAction={handleNavCategoryAction}
      />

      <StorefrontToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStore={selectedStore}
        onOpenStoreFinder={() => setIsStoreFinderOpen(true)}
        onQuickResetBreadcrumb={handleResetAll}
      />

      <main className="flex-1">
        <CategoryHero
          totalProducts={AIR_PURIFIER_PRODUCTS.length}
          onBrowseCatalog={() => scrollToSection('catalog-section')}
          onFilterPromo={() => {
            setFilters({ ...INITIAL_FILTERS, onSaleOnly: true });
            scrollToSection('catalog-section');
          }}
        />

        {/* Catalog Section: Sidebar + Grid */}
        <section id="catalog-section" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetAll}
              isMobileOpen={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />

            <div className="flex-1 min-w-0 w-full">
              {/* Catalog Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-md cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                  <p className="text-sm text-slate-600">
                    Showing <strong className="text-slate-900 tabular-nums">{filteredProducts.length}</strong> of{' '}
                    <span className="tabular-nums">{AIR_PURIFIER_PRODUCTS.length}</span> air purifiers
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00338D] cursor-pointer"
                  >
                    <option value="featured">Featured Recommendations</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Customer Rating</option>
                    <option value="coverage-desc">Room Coverage: Largest First</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Controls */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>Search: “{searchQuery}”</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {filters.brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() =>
                        setFilters({
                          ...filters,
                          brands: filters.brands.filter((b) => b !== brand),
                        })
                      }
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>Brand: {brand}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ))}
                  {filters.purifierTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFilters({
                          ...filters,
                          purifierTypes: filters.purifierTypes.filter((t) => t !== type),
                        })
                      }
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>{type}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ))}
                  {filters.onSaleOnly && (
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, onSaleOnly: false })}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>Promotional Deals</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {filters.climateVoucherOnly && (
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, climateVoucherOnly: false })}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>Climate Voucher Eligible</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {filters.inStockOnly && (
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, inStockOnly: false })}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded cursor-pointer"
                    >
                      <span>In Stock Online</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="text-xs font-semibold text-[#00338D] hover:underline px-2 py-1 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Product Grid (3 Columns Desktop, 2 Columns Tablet) */}
              {filteredProducts.length === 0 ? (
                <div className="border border-slate-200 rounded-lg bg-[#F5F7FA] p-12 text-center">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    No air purifiers match your current filters
                  </h3>
                  <p className="text-sm text-slate-600 mb-5">
                    Try clearing one or more filters or broadening your price and room coverage selection.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold px-5 py-2.5 rounded-md cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isCompared={compareIds.includes(product.id)}
                      justAdded={recentlyAddedId === product.id}
                      onToggleCompare={handleToggleCompare}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      onOneClickCheckout={(p) => handleOneClickCheckout(p, 1)}
                      onOpenQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <BuyingGuide
          onSelectCoveragePreset={(range) => {
            setFilters({ ...INITIAL_FILTERS, coverageRange: range });
            scrollToSection('catalog-section');
          }}
        />
      </main>

      <Footer
        onOpenStoreFinder={() => setIsStoreFinderOpen(true)}
        onScrollTop={() => scrollToSection('top')}
      />

      <CompareBar
        items={compareProducts}
        onRemove={(id) => setCompareIds((prev) => prev.filter((item) => item !== id))}
        onClear={() => setCompareIds([])}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      <CompareModal
        items={compareProducts}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemove={(id) => setCompareIds((prev) => prev.filter((item) => item !== id))}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      <ProductDetailModal
        product={quickViewProduct}
        selectedStore={selectedStore}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOneClickCheckout={handleOneClickCheckout}
        onOpenStoreFinder={() => setIsStoreFinderOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        startInCheckout={startInCheckout}
        items={cart}
        selectedStore={selectedStore}
        onClose={() => {
          setIsCartOpen(false);
          setStartInCheckout(false);
        }}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onOpenStoreFinder={() => setIsStoreFinderOpen(true)}
      />

      <StoreFinderModal
        isOpen={isStoreFinderOpen}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        onClose={() => setIsStoreFinderOpen(false)}
      />
    </div>
  );
}
