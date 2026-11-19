import { useState } from 'react';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { PurifierType } from '../data/airPurifiers';

export interface NavCategoryAction {
  type?: PurifierType;
  promoOnly?: boolean;
  climateOnly?: boolean;
  sectionId?: string;
  openStores?: boolean;
  resetAll?: boolean;
}

interface DropdownColumn {
  heading: string;
  items: Array<{
    label: string;
    action: NavCategoryAction;
  }>;
}

interface NavMenuItem {
  id: string;
  label: string;
  isActive?: boolean;
  defaultAction: NavCategoryAction;
  columns: DropdownColumn[];
}

const NAV_MENUS: NavMenuItem[] = [
  {
    id: 'home-appliances',
    label: 'Home Appliances',
    defaultAction: { resetAll: true, sectionId: 'catalog-section' },
    columns: [
      {
        heading: 'Air Treatment',
        items: [
          { label: 'All Air Purifiers', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: '2-in-1 Purifier Fans', action: { type: '2-in-1 Purifier Fan', sectionId: 'catalog-section' } },
          { label: 'Dedicated HEPA H13', action: { type: 'Dedicated HEPA', sectionId: 'catalog-section' } },
          { label: 'Humidifying Purifiers', action: { type: 'Humidifying Purifier', sectionId: 'catalog-section' } },
          { label: 'Pet & Allergen Care', action: { type: 'Pet & Allergen Care', sectionId: 'catalog-section' } },
        ],
      },
      {
        heading: 'Kitchen & Laundry',
        items: [
          { label: 'Refrigerators & Freezers', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Washing Machines & Dryers', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Ovens, Hobs & Hoods', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Coffee & Espresso Machines', action: { resetAll: true, sectionId: 'catalog-section' } },
        ],
      },
      {
        heading: 'Floorcare & Living',
        items: [
          { label: 'Cordless Stick Vacuums', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Robot Vacuums & Mops', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Promotional Deals', action: { promoOnly: true, sectionId: 'catalog-section' } },
          { label: 'NEA Climate Voucher Units', action: { climateOnly: true, sectionId: 'catalog-section' } },
        ],
      },
    ],
  },
  {
    id: 'air-conditioning',
    label: 'Air Conditioning',
    defaultAction: { resetAll: true, sectionId: 'catalog-section' },
    columns: [
      {
        heading: 'Air Treatment & Cooling',
        items: [
          { label: 'Air Purifiers', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: '2-in-1 Purifier Tower Fans', action: { type: '2-in-1 Purifier Fan', sectionId: 'catalog-section' } },
          { label: 'Humidifying Purifiers', action: { type: 'Humidifying Purifier', sectionId: 'catalog-section' } },
          { label: 'Climate Voucher Eligible', action: { climateOnly: true, sectionId: 'catalog-section' } },
        ],
      },
      {
        heading: 'Home Cooling',
        items: [
          { label: 'Inverter Multi-Split Systems', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Portable Air Conditioners', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: 'Standing & Tower Fans', action: { type: '2-in-1 Purifier Fan', sectionId: 'catalog-section' } },
        ],
      },
    ],
  },
  {
    id: 'air-purifiers',
    label: 'Air Purifiers',
    isActive: true,
    defaultAction: { resetAll: true, sectionId: 'catalog-section' },
    columns: [
      {
        heading: 'Shop by Purifier Type',
        items: [
          { label: 'All Air Purifiers', action: { resetAll: true, sectionId: 'catalog-section' } },
          { label: '2-in-1 Purifier Fans', action: { type: '2-in-1 Purifier Fan', sectionId: 'catalog-section' } },
          { label: 'Dedicated HEPA', action: { type: 'Dedicated HEPA', sectionId: 'catalog-section' } },
          { label: 'Humidifying Purifier', action: { type: 'Humidifying Purifier', sectionId: 'catalog-section' } },
          { label: 'Pet & Allergen Care', action: { type: 'Pet & Allergen Care', sectionId: 'catalog-section' } },
        ],
      },
      {
        heading: 'Offers & Vouchers',
        items: [
          { label: 'Current Promotional Deals', action: { promoOnly: true, sectionId: 'catalog-section' } },
          { label: 'NEA Climate Voucher Eligible', action: { climateOnly: true, sectionId: 'catalog-section' } },
        ],
      },
    ],
  },
  {
    id: 'buying-guide',
    label: 'Buying Guide',
    defaultAction: { sectionId: 'buying-guide' },
    columns: [
      {
        heading: 'Guides & Services',
        items: [
          { label: 'Room Coverage & CADR Guide', action: { sectionId: 'buying-guide' } },
          { label: 'HEPA H13 vs Carbon Filters', action: { sectionId: 'buying-guide' } },
          { label: 'NEA Climate Voucher Units', action: { climateOnly: true, sectionId: 'catalog-section' } },
          { label: '2-Hour Click & Collect Outlets', action: { openStores: true } },
        ],
      },
    ],
  },
  {
    id: 'stores',
    label: 'Stores',
    defaultAction: { openStores: true },
    columns: [
      {
        heading: 'Singapore Superstores',
        items: [
          { label: 'Millenia Walk Flagship', action: { openStores: true } },
          { label: 'Parkway Parade (East)', action: { openStores: true } },
          { label: 'VivoCity (South)', action: { openStores: true } },
          { label: 'Northpoint City & Jurong Point', action: { openStores: true } },
        ],
      },
    ],
  },
];

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onSelectCategoryAction: (action: NavCategoryAction) => void;
}

export function Header({
  cartCount,
  cartSubtotal,
  onOpenCart,
  onSelectCategoryAction,
}: HeaderProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAction = (action: NavCategoryAction) => {
    setOpenMenuId(null);
    onSelectCategoryAction(action);
  };

  return (
    <header
      className="sticky top-0 z-40 bg-white border-b border-slate-200"
      onMouseLeave={() => setOpenMenuId(null)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8 relative">
        {/* Zone 1: Single-line Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleAction({ resetAll: true, sectionId: 'top' });
          }}
          className="flex items-center gap-2.5 text-[#00338D] font-display font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00338D] rounded"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 bg-[#00338D] text-white text-sm font-extrabold tracking-tighter">
            HN
          </span>
          <span>Harvey Norman</span>
        </a>

        {/* Zone 2: 5 concise single-line text links with hover category dropdowns */}
        <nav
          aria-label="Primary categories"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 h-full"
        >
          {NAV_MENUS.map((menu) => {
            const isOpen = openMenuId === menu.id;
            return (
              <div
                key={menu.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenuId(menu.id)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => handleAction(menu.defaultAction)}
                  onFocus={() => setOpenMenuId(menu.id)}
                  className={`inline-flex items-center gap-1 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    menu.isActive || isOpen
                      ? 'text-[#00338D] font-semibold underline underline-offset-4'
                      : 'hover:text-[#00338D] hover:underline underline-offset-4'
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-[#00338D]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Hover Category Dropdown Panel */}
                {isOpen && (
                  <div
                    role="menu"
                    className="absolute top-full left-0 bg-white border border-slate-200 rounded-b-lg shadow-xl p-5 z-50 min-w-[260px]"
                    style={{
                      width:
                        menu.columns.length >= 3
                          ? '620px'
                          : menu.columns.length === 2
                            ? '440px'
                            : '260px',
                    }}
                  >
                    <div
                      className={`grid gap-6 ${
                        menu.columns.length >= 3
                          ? 'grid-cols-3'
                          : menu.columns.length === 2
                            ? 'grid-cols-2'
                            : 'grid-cols-1'
                      }`}
                    >
                      {menu.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-2 mb-2 border-b border-slate-100">
                            {col.heading}
                          </p>
                          <ul className="space-y-1.5">
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <button
                                  type="button"
                                  role="menuitem"
                                  onClick={() => handleAction(item.action)}
                                  className="w-full text-left text-xs font-medium text-slate-700 hover:text-[#00338D] hover:underline underline-offset-2 py-1 transition-colors cursor-pointer"
                                >
                                  {item.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
