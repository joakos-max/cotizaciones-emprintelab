'use client';

import React from 'react';
import { Plus, Trash2, User, Package, Calendar, Hash, FileCheck } from 'lucide-react';
import { DocType, Currency } from '@/app/page';

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

interface QuoteFormProps {
  client: ClientInfo;
  items: QuoteItem[];
  docType: DocType;
  currency: Currency;
  docNumber: string;
  docDate: string;
  requiresAdvance: boolean;
  onClientChange: (client: ClientInfo) => void;
  onItemsChange: (items: QuoteItem[]) => void;
  onDocTypeChange: (type: DocType) => void;
  onCurrencyChange: (currency: Currency) => void;
  onDocNumberChange: (num: string) => void;
  onDocDateChange: (date: string) => void;
  onRequiresAdvanceChange: (val: boolean) => void;
}

export default function QuoteForm({ 
  client, 
  items, 
  docType,
  currency,
  docNumber,
  docDate,
  requiresAdvance,
  onClientChange, 
  onItemsChange,
  onDocTypeChange,
  onCurrencyChange,
  onDocNumberChange,
  onDocDateChange,
  onRequiresAdvanceChange
}: QuoteFormProps) {
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClientChange({ ...client, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: string, field: string, value: string | number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onItemsChange(newItems);
  };

  const addItem = () => {
    const newItem: QuoteItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onItemsChange(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Document Metadata */}
      <div className="premium-card">
        <h2 className="text-xl mb-6 flex items-center gap-2">
          <FileCheck size={20} className="text-primary" />
          Tipo de Documento y Datos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Tipo</label>
            <select 
              value={docType}
              onChange={(e) => onDocTypeChange(e.target.value as DocType)}
              className="input-field"
            >
              <option value="Presupuesto">Presupuesto</option>
              <option value="Nota">Nota</option>
              <option value="Factura">Factura</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Moneda</label>
            <select 
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="input-field"
            >
              <option value="USD">Dólares ($)</option>
              <option value="EUR">Euros (€)</option>
              <option value="VES">Bolívares (Bs.)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Número</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
              <input
                type="text"
                value={docNumber}
                onChange={(e) => onDocNumberChange(e.target.value)}
                className="input-field pl-9"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Fecha</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
              <input
                type="date"
                value={docDate}
                onChange={(e) => onDocDateChange(e.target.value)}
                className="input-field pl-9"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-outline flex items-center gap-2">
          <input 
            type="checkbox" 
            id="requiresAdvance" 
            checked={requiresAdvance}
            onChange={(e) => onRequiresAdvanceChange(e.target.checked)}
            className="w-4 h-4 text-primary rounded border-outline focus:ring-primary"
          />
          <label htmlFor="requiresAdvance" className="text-sm font-medium text-text-secondary cursor-pointer">
            Requerir abono del 50% para iniciar el servicio
          </label>
        </div>
      </div>

      {/* Client Details */}
      <div className="premium-card">
        <h2 className="text-xl mb-6 flex items-center gap-2">
          <User size={20} className="text-primary" />
          Detalles del Cliente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Nombre / Empresa</label>
            <input
              type="text"
              name="name"
              value={client.name}
              onChange={handleClientChange}
              placeholder="Ej. Juan Pérez"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">ID / RIF</label>
            <input
              type="text"
              name="id"
              value={client.id}
              onChange={handleClientChange}
              placeholder="Ej. J-12345678-9"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={handleClientChange}
              placeholder="email@ejemplo.com"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={client.phone}
              onChange={handleClientChange}
              placeholder="+58 412 1234567"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Dirección</label>
            <input
              type="text"
              name="address"
              value={client.address}
              onChange={handleClientChange}
              placeholder="Calle, Ciudad, Estado"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Service Items */}
      <div className="premium-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl flex items-center gap-2">
            <Package size={20} className="text-primary" />
            Servicios e Impresiones
          </h2>
          <button onClick={addItem} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
            <Plus size={16} /> Agregar Item
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-4 bg-surface-low rounded-lg border border-transparent hover:border-outline transition-all">
              <div className="col-span-1 border-r border-outline border-dashed flex items-center justify-center text-text-secondary font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="col-span-11 md:col-span-6 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Descripción</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  className="input-field text-sm"
                />
              </div>
              <div className="col-span-5 md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Cant.</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-5 md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Precio Unit.</label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-center pb-2">
                <button 
                  onClick={() => removeItem(item.id)}
                  disabled={items.length <= 1}
                  className="text-text-secondary hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
