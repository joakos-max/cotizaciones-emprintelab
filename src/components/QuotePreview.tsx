import React from 'react';
import { branding } from '@/config/branding';
import { DocType, Currency } from '@/app/page';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface QuotePreviewProps {
  client: {
    name: string;
    id: string;
    email: string;
    phone: string;
    address: string;
  };
  items: QuoteItem[];
  docType: DocType;
  currency: Currency;
  docNumber: string;
  docDate: string;
  requiresAdvance?: boolean;
}

const QuotePreview: React.FC<QuotePreviewProps> = ({ client, items, docType, currency, docNumber, docDate, requiresAdvance }) => {
  const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    VES: 'Bs.'
  };

  const symbol = currencySymbols[currency] || '$';
  const subtotal = items.reduce((acc, item) => acc + ((item.quantity || 0) * (item.unitPrice || 0)), 0);
  
  // Format date for display if it's in YYYY-MM-DD
  const dateObj = docDate ? new Date(docDate + 'T12:00:00') : null;
  const formattedDate = (dateObj && !isNaN(dateObj.getTime())) 
    ? dateObj.toLocaleDateString('es-VE') 
    : '---';

  return (
    <div id="quote-to-pdf" className="bg-white shadow-2xl rounded-sm overflow-hidden min-h-[1000px] flex flex-col font-sans border border-outline relative">
      
      {/* REFINED CMYK HEADER */}
      <div className="flex w-full overflow-hidden min-h-[192px] shrink-0 border-b-4 border-rich-black">
        {/* LEFT AREA: WHITE (BRAND) */}
        <div className="w-[55%] bg-white p-8 flex flex-col justify-center items-center relative">
          <img src={branding.logoUrl} alt={branding.companyName} className="h-28 w-auto object-contain mb-2" />
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan leading-tight italic">
              "{branding.tagline}"
            </p>
          </div>
          <div className="mt-4 text-[9px] text-center text-text-secondary leading-tight max-w-[300px] font-bold uppercase tracking-wider">
            {branding.address}
          </div>
        </div>

        {/* RIGHT AREA: BLACK (DOC DATA) */}
        <div className="w-[45%] bg-rich-black p-8 flex flex-col justify-center items-end text-white relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-magenta opacity-10 blur-3xl -mr-12 -mt-12 group-hover:opacity-20 transition-opacity"></div>
          
          <h1 className="text-4xl font-black tracking-tight mb-2 text-cyan uppercase">{docType}</h1>
          <div className="space-y-1 text-right">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-magenta tracking-[0.2em] mb-1">Número</span>
              <span className="text-xl font-mono leading-none"># {docNumber || '---'}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-[10px] uppercase font-bold text-magenta tracking-[0.2em] mb-1">Fecha</span>
              <span className="text-lg font-mono leading-none">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-12 flex-grow relative z-10">
        {/* WATERMARK */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden -z-10 select-none">
          <img 
            src={branding.logoUrl} 
            alt="Emprinte Lab Watermark" 
            className="w-[80%] max-w-[600px] h-auto object-contain opacity-[0.03] grayscale -rotate-12" 
          />
        </div>

        {/* CLIENT INFO SECTION (CENTERED) */}
        <div className="mb-12 flex justify-center">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="relative inline-block px-12 pb-2">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-magenta mb-4">Información del Cliente</h3>
              <div className="text-2xl font-black text-rich-black tracking-tight uppercase">{client.name || '---'}</div>
              <div className="mt-2 text-sm font-medium text-text-secondary">
                <span className="font-bold text-rich-black uppercase text-xs tracking-wider">CI / RIF:</span> {client.id || '---'}
              </div>
              <div className="w-16 h-1 bg-cyan mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-2 mt-6 text-[11px] font-medium text-text-secondary uppercase tracking-widest text-center">
              <div className="break-all px-2">{client.email || '---'}</div>
              <div className="px-2">{client.phone || '---'}</div>
              {client.address && <div className="px-2 mt-2 leading-relaxed opacity-80">{client.address}</div>}
            </div>
          </div>
        </div>

        {/* CMYK TABLE */}
        <div className="mb-8 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rich-black text-white text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-6 py-4 border-r border-slate-700/50">Cant.</th>
                <th className="px-6 py-4">Descripción del Servicio</th>
                <th className="px-6 py-4 text-right border-l border-slate-700/50">Precio Unit.</th>
                <th className="px-6 py-4 text-right border-l border-slate-700/50 bg-cyan">Monto</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-rich-black">
              {items.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`
                    transition-colors duration-200 border-b border-slate-100
                    ${index % 2 === 1 ? 'bg-[#FFF9C4]/30' : 'bg-white'}
                    hover:bg-cyan/5
                  `}
                >
                  <td className="px-6 py-5 border-r border-slate-100 font-mono text-center">{(item.quantity || 0).toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-rich-black">{item.description || 'Describa el servicio...'}</div>
                  </td>
                  <td className="px-6 py-5 text-right border-l border-slate-100 font-mono">
                    {symbol}{(item.unitPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 text-right font-black border-l border-slate-100">
                    {symbol}{((item.quantity || 0) * (item.unitPrice || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {items.length < 5 && Array.from({ length: 5 - items.length }).map((_, i) => (
                <tr key={`empty-${i}`} className="h-12 border-b border-slate-50">
                  <td colSpan={4}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OBSERVATIONS & TOTALS */}
        <div className="flex justify-between items-start gap-12 mt-12 bg-slate-50/50 p-8 rounded-xl border border-dashed border-slate-200">
          <div className="flex-grow">
            <h4 className="text-[10px] uppercase font-bold text-magenta tracking-[0.2em] mb-4">Condiciones Comerciales:</h4>
            <ul className="text-[10px] text-text-secondary leading-relaxed space-y-2 uppercase font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan rounded-full"></span>
                Los precios NO incluyen IVA.
              </li>
              {requiresAdvance && (
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-magenta rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Este documento requiere un abono del 50% para iniciar el servicio o producción.</span>
                </li>
              )}
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-yellow rounded-full"></span>
                Validez de la cotización: 5 días continuos.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Tiempo de entrega: A convenir según disponibilidad y confirmación del abono.</span>
              </li>
            </ul>
          </div>

          <div className="w-72 bg-[#1D1D1B] p-8 rounded-lg shadow-xl relative overflow-hidden flex flex-col justify-center border-l-8 border-cyan">
            <div className="absolute top-0 right-0 w-1 h-full bg-magenta"></div>
            <div className="absolute top-0 right-1 w-1 h-full bg-yellow opacity-50"></div>
            
            <div className="flex justify-between items-center text-white relative z-10">
              <div className="flex flex-col">
                <span className="uppercase tracking-[0.3em] text-[10px] font-black text-cyan">Total Final</span>
                <span className="text-4xl font-black mt-2 leading-none tracking-tighter text-white">
                  {symbol}{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {requiresAdvance && (
                  <div className="mt-4 pt-4 border-t border-white/20 flex flex-col">
                    <span className="uppercase tracking-[0.2em] text-[8px] font-bold text-magenta">Monto a Abonar (50%)</span>
                    <span className="text-xl font-black mt-1 text-white">
                      {symbol}{(subtotal * 0.5).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <span className="text-[8px] uppercase tracking-widest text-white/40 mt-4">Moneda: {currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLOR AUDIT BAR (THE PRINTER TOUCH) */}
      <div className="absolute bottom-6 left-12 flex gap-1 opacity-20">
        <div className="w-4 h-12 bg-cyan"></div>
        <div className="w-4 h-12 bg-magenta"></div>
        <div className="w-4 h-12 bg-yellow"></div>
        <div className="w-4 h-12 bg-[#1D1D1B]"></div>
        <div className="ml-2 text-[8px] flex flex-col justify-center text-slate-300 font-bold uppercase tracking-widest">
          <span>Audit</span>
          <span>CMYK</span>
        </div>
      </div>

      <div className="p-8 text-center text-[9px] text-slate-300 uppercase tracking-widest font-bold">
        © {new Date().getFullYear()} {branding.companyName}. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default QuotePreview;
