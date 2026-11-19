import { useState } from 'react';
import { Check, Minus, Plus, ShieldCheck, ShoppingCart, Star, Store, Truck, X } from 'lucide-react';
import { AirPurifierProduct, StoreLocation } from '../data/airPurifiers';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: AirPurifierProduct | null;
  selectedStore: StoreLocation;
  onClose: () => void;
  onAddToCart: (product: AirPurifierProduct, quantity: number) => void;
  onOpenStoreFinder: () => void;
}

export function ProductDetailModal({
  product,
  selectedStore,
  onClose,
  onAddToCart,
  onOpenStoreFinder,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const savings = product.usualPrice ? product.usualPrice - product.price : 0;
  const monthly = (product.price / 12).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-[#00338D] uppercase">{product.brand}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums">SKU: {product.sku}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left Gallery & Highlights */}
          <div className="md:col-span-6 space-y-5">
            <div className="relative bg-[#F8FAFC] border border-slate-200 rounded-lg aspect-square flex items-center justify-center p-6">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.promoLabel && (
                <span className="absolute top-3 left-3 bg-[#D91F26] text-white text-xs font-bold px-2.5 py-1 rounded-sm tabular-nums">
                  {product.promoLabel}
                </span>
              )}
            </div>

            <div className="border border-slate-200 rounded-md p-4 bg-[#F5F7FA]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                Key Specifications
              </h4>
              <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <dt className="text-slate-500">Coverage Area</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">
                    Up to {product.coverageSqm} m²
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">CADR Rating</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">{product.cadrCmh} m³/h</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Noise Level</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">{product.noiseDb}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Warranty</dt>
                  <dd className="font-semibold text-slate-900 tabular-nums">
                    {product.warrantyYears} Years SG Warranty
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col">
            <h2 id="pdp-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
              {product.name}
            </h2>
            <p className="text-sm text-slate-600 mb-3">{product.shortSubtitle}</p>

            <div className="flex items-center gap-2 text-xs text-slate-600 mb-5">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900 tabular-nums">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </span>
              <span>({product.reviewCount} verified reviews)</span>
              <span aria-hidden="true">·</span>
              <span>{product.filtration}</span>
            </div>

            {/* Pricing Block */}
            <div className="p-4 bg-[#F5F7FA] border border-slate-200 rounded-md mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                  S${product.price.toLocaleString()}
                </span>
                {product.usualPrice && savings > 0 && (
                  <>
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      U.P. S${product.usualPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#D91F26] tabular-nums">
                      Save S${savings.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1 tabular-nums">
                0% Interest Instalment: S${monthly}/month over 12 months
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">{product.description}</p>

            <ul className="space-y-2 mb-6 text-sm text-slate-700">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00338D] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Fulfilment Options */}
            <div className="border border-slate-200 rounded-md divide-y divide-slate-200 mb-6 text-xs">
              <div className="p-3 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#00338D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">
                    {product.price >= 300 ? 'Free Islandwide Delivery' : 'Standard Delivery (S$12)'}
                  </p>
                  <p className="text-slate-500">Estimated arrival in 2–4 working days</p>
                </div>
              </div>
              <div className="p-3 flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <Store className="w-4 h-4 text-[#00338D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Click &amp; Collect: {selectedStore.name}
                    </p>
                    <p className="text-emerald-700 font-medium">{selectedStore.pickupReadyText}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenStoreFinder}
                  className="text-[#00338D] font-semibold hover:underline shrink-0 cursor-pointer"
                >
                  Change Store
                </button>
              </div>
            </div>

            {/* Quantity & Add CTA */}
            <div className="mt-auto flex items-center gap-3">
              <div className="inline-flex items-center border border-slate-300 rounded-md">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-semibold tabular-nums min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-md transition-colors cursor-pointer ${
                  addedFeedback
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#00338D] hover:bg-[#002569] text-white'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart · S${(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Official Harvey Norman Singapore Warranty &amp; 7-Day Exchange Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
