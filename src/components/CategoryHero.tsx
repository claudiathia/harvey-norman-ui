import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck, Store, Truck } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/airPurifiers';

interface CategoryHeroProps {
  totalProducts: number;
  onBrowseCatalog: () => void;
  onFilterPromo: () => void;
}

export function CategoryHero({ totalProducts, onBrowseCatalog, onFilterPromo }: CategoryHeroProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch border border-slate-200 rounded-lg overflow-hidden bg-[#F5F7FA]">
          {/* Left Copy Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#00338D] tracking-wide mb-2">
                Harvey Norman Singapore · Home Appliances
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15] [text-wrap:balance] mb-4">
                Air Purifiers for Cleaner Singapore Homes
              </h1>
              <p className="text-[15px] leading-relaxed text-slate-600 mb-6 max-w-md">
                Capture 99.95% of fine PM2.5 haze, pet dander, and indoor allergens. Compare {totalProducts} curated HEPA H13, 2-in-1 purifier fans, and humidifying models from Dyson, Electrolux, Novita, LG, and Sharp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="inline-flex items-center gap-2 bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Shop All Purifiers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onFilterPromo}
                className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-[#D91F26] text-slate-800 hover:text-[#D91F26] text-sm font-semibold px-5 py-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>View Current Deals</span>
              </button>
            </div>
          </div>

          {/* Right 16:9 Lifestyle Image Column */}
          <div className="lg:col-span-7 relative min-h-[240px] sm:min-h-[300px] lg:min-h-[340px] bg-slate-200">
            <img
              src={HERO_BANNER_IMAGE}
              alt="Modern Singapore apartment living room featuring a cylindrical smart HEPA air purifier"
              referrerPolicy="no-referrer"
              className="w-full h-full lg:h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent p-5 sm:p-6 flex items-end justify-between gap-4">
              <div className="text-white">
                <p className="text-xs font-medium text-white/85">Selected Models Eligible</p>
                <p className="text-sm sm:text-base font-semibold">
                  Redeem NEA Climate Vouchers on Energy-Saving Circulator Purifiers
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#D91F26] px-3 py-1.5 rounded whitespace-nowrap shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Save up to S$410
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Retail Value Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-md bg-white">
            <Store className="w-5 h-5 text-[#00338D] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900">2-Hour Click &amp; Collect</p>
              <p className="text-xs text-slate-500 mt-0.5">Free pickup across 13 Singapore outlets</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-md bg-white">
            <Truck className="w-5 h-5 text-[#00338D] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Islandwide Delivery</p>
              <p className="text-xs text-slate-500 mt-0.5">Free shipping on orders S$300 &amp; above</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-md bg-white">
            <CreditCard className="w-5 h-5 text-[#00338D] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900">0% Instalment Plans</p>
              <p className="text-xs text-slate-500 mt-0.5">Up to 12 months with major SG banks</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-md bg-white">
            <ShieldCheck className="w-5 h-5 text-[#00338D] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Official Local Warranty</p>
              <p className="text-xs text-slate-500 mt-0.5">100% authentic Singapore distributor units</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
