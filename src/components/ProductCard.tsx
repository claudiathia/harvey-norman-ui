import { Check, Eye, GitCompareArrows, ShoppingCart, Star } from 'lucide-react';
import { AirPurifierProduct } from '../data/airPurifiers';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: AirPurifierProduct;
  isCompared: boolean;
  justAdded: boolean;
  onToggleCompare: (product: AirPurifierProduct) => void;
  onAddToCart: (product: AirPurifierProduct) => void;
  onOpenQuickView: (product: AirPurifierProduct) => void;
}

export function ProductCard({
  product,
  isCompared,
  justAdded,
  onToggleCompare,
  onAddToCart,
  onOpenQuickView,
}: ProductCardProps) {
  const monthlyInstalment = (product.price / 12).toFixed(2);
  const savings = product.usualPrice ? product.usualPrice - product.price : 0;

  return (
    <article className="group bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
      {/* Uniform Product Stage */}
      <div className="relative bg-[#F8FAFC] aspect-square overflow-hidden border-b border-slate-100">
        <button
          type="button"
          onClick={() => onOpenQuickView(product)}
          className="w-full h-full block cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#00338D]"
          aria-label={`View details for ${product.name}`}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-5 transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </button>

        {/* Single crisp rectangular promo indicator (no pill badge spam) */}
        {product.promoLabel && (
          <span className="absolute top-3 left-3 bg-[#D91F26] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wide tabular-nums pointer-events-none">
            {product.promoLabel}
          </span>
        )}

        {/* Quick View trigger on hover / focus */}
        <button
          type="button"
          onClick={() => onOpenQuickView(product)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 border border-slate-200 text-slate-700 hover:text-[#00338D] hover:border-[#00338D] text-xs font-medium px-2.5 py-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Brand & SKU */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-[#00338D]">
            {product.brand}
          </span>
          <span className="tabular-nums text-slate-400">{product.sku}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2 mb-2 min-h-[2.6rem]">
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="text-left hover:text-[#00338D] transition-colors cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        {/* Clean Unboxed Metadata with middot separators */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-3">
          <span className="inline-flex items-center gap-1 text-slate-700 font-medium tabular-nums">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Up to {product.coverageSqm} m²</span>
          <span aria-hidden="true">·</span>
          <span>{product.purifierType}</span>
        </div>

        {/* Fulfilment & Climate Voucher subtle text line */}
        <div className="text-xs text-slate-600 mb-4 space-y-0.5">
          <p className={product.inStock ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
            {product.inStock
              ? 'In Stock Online · 2-Hr Click & Collect'
              : 'Store Pickup Only · Check Outlet Stock'}
          </p>
          {product.climateVoucherEligible && (
            <p className="text-[#00338D] font-medium">NEA Climate Voucher Eligible</p>
          )}
        </div>

        {/* Price Block anchored cleanly before actions */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-display text-xl font-bold text-slate-900 tabular-nums">
              S${product.price.toLocaleString()}
            </span>
            {product.usualPrice && savings > 0 && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                U.P. S${product.usualPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
            or 0% from S${monthlyInstalment}/mth × 12 mths
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className={`flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#00338D] hover:bg-[#002569] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleCompare(product)}
              aria-pressed={isCompared}
              title={isCompared ? 'Remove from comparison' : 'Compare specifications'}
              className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isCompared
                  ? 'bg-[#00338D]/10 border-[#00338D] text-[#00338D]'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-[#00338D] hover:text-[#00338D]'
              }`}
            >
              <GitCompareArrows className="w-4 h-4" />
              <span>{isCompared ? 'Added' : 'Compare'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
