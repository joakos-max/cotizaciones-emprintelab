'use client';

import React, { useState, useEffect } from 'react';
import QuoteForm from '@/components/QuoteForm';
import QuotePreview from '@/components/QuotePreview';
import PDFDownloadBtn from '@/components/PDFDownloadBtn';
import { FileText } from 'lucide-react';
import { branding } from '@/config/branding';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface ClientInfo {
  name: string;
  id: string;
  email: string;
  phone: string;
  address: string;
}

export type DocType = 'Presupuesto' | 'Nota' | 'Factura';
export type Currency = 'USD' | 'EUR' | 'VES';

export default function Home() {
  const [client, setClient] = useState<ClientInfo>({
    name: '',
    id: '',
    email: '',
    phone: '',
    address: '',
  });

  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: '1',
      description: 'Impresión Cama Plana UV en Acrílico',
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  // Dynamic Metadata
  const [docType, setDocType] = useState<DocType>('Presupuesto');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [docNumber, setDocNumber] = useState<string>('00156');
  const [docDate, setDocDate] = useState<string>('');
  const [requiresAdvance, setRequiresAdvance] = useState<boolean>(false);

  useEffect(() => {
    // Set current date as default
    const today = new Date().toISOString().split('T')[0];
    setDocDate(today);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-outline sticky top-0 z-[60]">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div 
              style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
              className="bg-white rounded-lg flex items-center justify-center overflow-hidden border border-outline"
            >
              <img 
                src={branding.logoUrl} 
                alt="Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">{branding.companyName}</h1>
              <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Generador de Documentos</p>
            </div>
          </div>
          
          <PDFDownloadBtn clientName={client.name} />
        </div>
      </div>

      <div className="container py-10">
        <div className="grid-layout">
          {/* Left: Input Sidebar */}
          <div className="flex flex-col gap-6">
            <QuoteForm 
              client={client} 
              items={items} 
              docType={docType}
              currency={currency}
              docNumber={docNumber}
              docDate={docDate}
              requiresAdvance={requiresAdvance}
              onClientChange={setClient} 
              onItemsChange={setItems}
              onDocTypeChange={setDocType}
              onCurrencyChange={setCurrency}
              onDocNumberChange={setDocNumber}
              onDocDateChange={setDocDate}
              onRequiresAdvanceChange={setRequiresAdvance}
            />
            
            <div className="premium-card bg-primary text-white overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <FileText size={180} />
              </div>
              <h3 className="text-lg mb-2 relative z-10">Servicio Premium</h3>
              <p className="text-sm opacity-90 leading-relaxed mb-4 relative z-10">
                {branding.tagline}
              </p>
              <div className="flex gap-2 relative z-10">
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] uppercase font-bold">Calidad</span>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] uppercase font-bold">Confianza</span>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] uppercase font-bold">Rapidez</span>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-28 self-start flex flex-col gap-6 w-full overflow-hidden">
            <h2 className="text-xl flex items-center gap-2 px-4 md:px-0">
              <FileText size={20} className="text-accent" />
              Vista Previa en Vivo
            </h2>
            <div className="preview-container">
              <div className="preview-wrapper">
                <QuotePreview 
                  client={client} 
                  items={items} 
                  docType={docType}
                  currency={currency}
                  docNumber={docNumber}
                  docDate={docDate}
                  requiresAdvance={requiresAdvance}
                />
              </div>
            </div>
            
            {/* BIG DOWNLOAD BUTTON UNDER PREVIEW */}
            <div className="flex justify-center w-full pb-10">
              <PDFDownloadBtn clientName={client.name} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20 border-t border-outline py-10 bg-white">
        <div className="container text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} {branding.companyName}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
