import { Wind, Gauge, Volume2 } from 'lucide-react';

interface BuyingGuideProps {
  onSelectCoveragePreset: (range: 'up-to-35' | '36-55' | 'over-55') => void;
}

export function BuyingGuide({ onSelectCoveragePreset }: BuyingGuideProps) {
  return (
    <section id="buying-guide" className="bg-[#F5F7FA] border-t border-slate-200 py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold text-[#00338D] uppercase tracking-wider mb-1.5">
            Harvey Norman Buying Guide
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Choosing the Right Air Purifier for Your Room
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Match Clean Air Delivery Rate (CADR) and HEPA H13 filtration capacity to your Singapore HDB flat, condominium bedroom, or open-plan living area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <Wind className="w-6 h-6 text-[#00338D] mb-4" />
              <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                01. Match Coverage Area
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Common HDB bedrooms (12–20 m²) work comfortably with 240 m³/h CADR units, while open living spaces (45–80 m²) benefit from dual-suction or 360° tower purifiers.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectCoveragePreset('up-to-35')}
                className="text-xs font-semibold text-[#00338D] hover:underline cursor-pointer"
              >
                Filter Bedroom (&le;35 m²) →
              </button>
              <button
                type="button"
                onClick={() => onSelectCoveragePreset('over-55')}
                className="text-xs font-semibold text-[#00338D] hover:underline cursor-pointer"
              >
                Filter Living Room (56+ m²) →
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <Gauge className="w-6 h-6 text-[#00338D] mb-4" />
            <h3 className="font-display text-base font-bold text-slate-900 mb-2">
              02. True HEPA H13 &amp; Carbon
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              For seasonal haze and VOC protection, choose sealed HEPA H13 media paired with activated carbon pellets to trap 0.1–0.3 micron smoke particulates and cooking odours.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <Volume2 className="w-6 h-6 text-[#00338D] mb-4" />
            <h3 className="font-display text-base font-bold text-slate-900 mb-2">
              03. Acoustic Sleep Comfort
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Look for brushless DC motors with dedicated Night Modes under 24 dB and dimmable PM2.5 displays so air purification runs continuously without disturbing sleep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
