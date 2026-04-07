'use client';

import React, { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFDownloadBtnProps {
  clientName: string;
}

export default function PDFDownloadBtn({ clientName }: PDFDownloadBtnProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById('quote-to-pdf');
    if (!element) {
      alert('Error: No se encontró el área de cotización.');
      return;
    }

    setIsGenerating(true);

    try {
      // Temporarily scroll to top to prevent html2canvas window bounds issues
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
        height: element.scrollHeight,
        windowHeight: element.scrollHeight,
      });

      // Restore scroll
      window.scrollTo(0, originalScrollY);

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      const fileName = `Cotizacion_EmprinteLab_${clientName.replace(/\s+/g, '_') || 'Cliente'}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, intente de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={downloadPDF} 
      disabled={isGenerating}
      className="btn-primary flex items-center gap-2 group"
    >
      {isGenerating ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
      )}
      {isGenerating ? 'Generando PDF...' : 'Descargar Cotización (PDF)'}
    </button>
  );
}
