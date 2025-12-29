
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.backgroundColor = '#ffffff';
  
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    const images = Array.from(clone.getElementsByTagName('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    const canvas = await html2canvas(clone, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
        }
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const canvasRatio = canvas.height / canvas.width;
    const pageRatio = pdfHeight / pdfWidth;
    
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
    
    let remainingHeight = imgHeight - pdfHeight;
    let position = -pdfHeight;
    
    while (remainingHeight > 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      remainingHeight -= pdfHeight;
      position -= pdfHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert("Failed to generate PDF. Please check your internet connection and try again.");
  } finally {
    document.body.removeChild(container);
  }
};
