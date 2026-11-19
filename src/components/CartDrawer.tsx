import { useEffect, useState, FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Store, Trash2, Truck, X } from 'lucide-react';
import { AirPurifierProduct, StoreLocation } from '../data/airPurifiers';
import { ProductImage } from './ProductImage';

export interface CartItem {
  product: AirPurifierProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  startInCheckout?: boolean;
  items: CartItem[];
  selectedStore: StoreLocation;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenStoreFinder: () => void;
}

export function CartDrawer({
  isOpen,
  startInCheckout = false,
  items,
  selectedStore,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenStoreFinder,
}: CartDrawerProps) {
  const [fulfilmentMode, setFulfilmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(startInCheckout);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setIsCheckingOut(startInCheckout);
      setConfirmedOrderId(null);
    }
  }, [isOpen, startInCheckout]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = fulfilmentMode === 'pickup' || subtotal >= 300 || subtotal === 0 ? 0 : 12;
  const promoDiscount = promoApplied && subtotal > 0 ? 10 : 0;
  const finalTotal = Math.max(0, subtotal + shippingFee - promoDiscount);
  const freeShippingRemaining = Math.max(0, 300 - subtotal);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'HN10' || code === 'CLEAN10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Invalid code. Try HN10 for S$10 off.');
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderNumber = `HN-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedTotal(finalTotal);
    setConfirmedOrderId(orderNumber);
    onClearCart();
    setIsCheckingOut(false);
    setPromoApplied(false);
    setPromoInput('');
  };

  const handleCloseReset = () => {
    setConfirmedOrderId(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div className="fixed inset-0 bg-slate-900/50" onClick={handleCloseReset} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00338D]" />
            <h2 className="font-display text-base font-bold text-slate-900">
              {confirmedOrderId ? 'Order Confirmation' : `Your Cart (${items.reduce((s, i) => s + i.quantity, 0)})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseReset}
            aria-label="Close cart"
            className="p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order Receipt */}
        {confirmedOrderId ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-700 mb-3" />
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
              Order #{confirmedOrderId} Confirmed
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {fulfilmentMode === 'pickup'
                ? `Preparing for Click & Collect at ${selectedStore.name}.`
                : 'Preparing for islandwide Singapore dispatch.'}
            </p>
            <div className="w-full bg-[#F5F7FA] border border-slate-200 rounded-md p-4 text-left text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer</span>
                <span className="font-medium text-slate-900">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact</span>
                <span className="font-medium text-slate-900 tabular-nums">{customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fulfilment</span>
                <span className="font-medium text-slate-900">
                  {fulfilmentMode === 'pickup' ? '2-Hr Click & Collect' : `Delivery (${postalCode})`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">Total Paid</span>
                <span className="font-bold text-[#00338D] tabular-nums">
                  S${confirmedTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCloseReset}
              className="w-full bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold py-2.5 rounded-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-12 h-12 text-slate-300 mb-3" strokeWidth={1.5} />
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
              Your cart is currently empty
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Add HEPA air purifiers or 2-in-1 purifier fans to compare delivery and store pickup options.
            </p>
            <button
              type="button"
              onClick={handleCloseReset}
              className="bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold px-6 py-2.5 rounded-md cursor-pointer"
            >
              Browse Air Purifiers
            </button>
          </div>
        ) : (
          /* Cart Items & Checkout */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Free shipping notice */}
              {fulfilmentMode === 'delivery' && (
                <div className="bg-[#F5F7FA] border border-slate-200 rounded-md p-3 text-xs text-slate-700">
                  {freeShippingRemaining === 0 ? (
                    <span className="font-semibold text-emerald-700">
                      Your order qualifies for FREE Islandwide Delivery.
                    </span>
                  ) : (
                    <span>
                      Add <strong className="tabular-nums">S${freeShippingRemaining}</strong> more for FREE Islandwide Delivery (orders S$300+).
                    </span>
                  )}
                </div>
              )}

              {/* Fulfilment Switch */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => setFulfilmentMode('delivery')}
                  className={`inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    fulfilmentMode === 'delivery'
                      ? 'bg-white text-[#00338D] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfilmentMode('pickup')}
                  className={`inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    fulfilmentMode === 'pickup'
                      ? 'bg-white text-[#00338D] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Click &amp; Collect</span>
                </button>
              </div>

              {fulfilmentMode === 'pickup' && (
                <div className="border border-slate-200 rounded-md p-3 flex items-center justify-between gap-2 text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{selectedStore.name}</p>
                    <p className="text-emerald-700">{selectedStore.pickupReadyText}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenStoreFinder}
                    className="text-[#00338D] font-semibold hover:underline shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Itemized List */}
              {!isCheckingOut ? (
                <div className="divide-y divide-slate-200">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex gap-3.5">
                      <div className="w-16 h-16 bg-[#F8FAFC] border border-slate-200 rounded shrink-0 flex items-center justify-center p-1.5">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#00338D] uppercase">
                          {product.brand}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="inline-flex items-center border border-slate-300 rounded">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              aria-label={`Decrease ${product.name} quantity`}
                              className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              aria-label={`Increase ${product.name} quantity`}
                              className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-900 tabular-nums">
                              S${(product.price * quantity).toLocaleString()}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="text-slate-400 hover:text-[#D91F26] cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Checkout Verification Form */
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="font-display text-sm font-bold text-slate-900">
                      Customer Verification
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs font-semibold text-[#00338D] hover:underline cursor-pointer"
                    >
                      Back to Items
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Wei Ming Tan"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00338D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Singapore Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+65 9123 4567"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00338D]"
                    />
                  </div>
                  {fulfilmentMode === 'delivery' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Delivery Street Address &amp; Unit
                        </label>
                        <input
                          type="text"
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="Blk 123 Tampines Street 11, #08-45"
                          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#00338D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{6}"
                          maxLength={6}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="521123"
                          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm tabular-nums focus:outline-none focus:border-[#00338D]"
                        />
                      </div>
                    </>
                  )}
                </form>
              )}

              {/* Promo Code */}
              {!isCheckingOut && (
                <div className="pt-2 border-t border-slate-200">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Promo Code (try <span className="font-mono-num font-semibold">HN10</span>)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#00338D]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-1.5 border border-slate-300 hover:border-[#00338D] text-xs font-semibold text-slate-800 rounded-md cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-700 mt-1 font-medium">
                      Promo HN10 applied (-S$10)
                    </p>
                  )}
                  {promoError && <p className="text-xs text-[#D91F26] mt-1">{promoError}</p>}
                </div>
              )}
            </div>

            {/* Footer Totals & Action */}
            <div className="border-t border-slate-200 p-5 bg-[#F5F7FA] space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums">S${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{fulfilmentMode === 'pickup' ? 'Click & Collect' : 'Islandwide Delivery'}</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'FREE' : `S$${shippingFee}`}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo (HN10)</span>
                    <span className="tabular-nums">-S${promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-bold text-slate-900">
                  <span>Total (incl. GST)</span>
                  <span className="tabular-nums">S${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold py-3 rounded-md transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-[#00338D] hover:bg-[#002569] text-white text-sm font-semibold py-3 rounded-md transition-colors cursor-pointer"
                >
                  Confirm Order · S${finalTotal.toLocaleString()}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
