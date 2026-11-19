interface FooterProps {
  onOpenStoreFinder: () => void;
  onScrollTop: () => void;
}

export function Footer({ onOpenStoreFinder, onScrollTop }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-white font-display font-extrabold text-lg tracking-tight mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-[#00338D] text-white text-xs font-extrabold">
                HN
              </span>
              <span>Harvey Norman Singapore</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leading electrical, computer, furniture, and bedding retailer in Singapore with official distributor warranties and islandwide delivery.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Air Treatment
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  HEPA Air Purifiers
                </button>
              </li>
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  2-in-1 Purifier Tower Fans
                </button>
              </li>
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  Humidifying Air Purifiers
                </button>
              </li>
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  Pet &amp; Allergen Care Units
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Services &amp; Stores
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={onOpenStoreFinder} className="hover:text-white cursor-pointer">
                  2-Hour Click &amp; Collect
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenStoreFinder} className="hover:text-white cursor-pointer">
                  Store Locator (Singapore)
                </button>
              </li>
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  NEA Climate Vouchers
                </button>
              </li>
              <li>
                <button type="button" onClick={onScrollTop} className="hover:text-white cursor-pointer">
                  0% Instalment Payment Plans
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Accepted Payments
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Visa · Mastercard · American Express · PayNow · GrabPay · Atome 3-Month Split
            </p>
            <p className="text-xs text-slate-500">
              Customer Care: 1800-311-9989 (Daily 10 AM – 7 PM)
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Harvey Norman Ossia (Asia) Pte Ltd. All prices in SGD inclusive of GST.</p>
          <p>Singapore Retail Category Showcase — Air Purifiers</p>
        </div>
      </div>
    </footer>
  );
}
