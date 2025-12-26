
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a high-quality A4 PDF from a DOM element.
 * Fixes text overlapping by ensuring the element is rendered in a standard A4 container during capture.
 */
export const generatePDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Create a temporary container to render the resume at full size (A4 at 96 DPI is ~794px x 1123px)
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.backgroundColor = '#ffffff';
  
  // Clone the element and remove any browser scaling/transforms
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Wait for images to load in the clone
    const images = Array.from(clone.getElementsByTagName('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    const canvas = await html2canvas(clone, {
      scale: 2.5, // High resolution balance (prevents huge files while maintaining sharpness)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // Standard A4 width in pixels at 96 DPI
      onclone: (clonedDoc) => {
        // Double check fonts and styles in the clone
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
    
    // Calculate aspect ratios
    const canvasRatio = canvas.height / canvas.width;
    const pageRatio = pdfHeight / pdfWidth;
    
    // If the resume is longer than one A4 page, we can add a new page or fit it
    // For standard resumes, we usually fit to page width. 
    // Here we ensure it matches A4 dimensions exactly.
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
    
    // Handle multi-page (if height exceeds A4 height)
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
