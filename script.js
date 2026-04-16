const PAGE_IDS = ["page1", "page2", "page3", "page4"];
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

async function capturePageAsImage(pageId) {
  const pageElement = document.getElementById(pageId);

  const canvas = await html2canvas(pageElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  return canvas.toDataURL("image/jpeg", 1.0);
}

async function generatePDF() {
  const button = document.getElementById("downloadPdf");
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Generating PDF...";

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    for (let i = 0; i < PAGE_IDS.length; i += 1) {
      const pageImage = await capturePageAsImage(PAGE_IDS[i]);

      if (i > 0) {
        pdf.addPage("a4", "portrait");
      }

      pdf.addImage(pageImage, "JPEG", 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, undefined, "FAST");
    }

    pdf.save("Exam_Form.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Failed to generate PDF. Please refresh and try again.");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

document.getElementById("downloadPdf").addEventListener("click", generatePDF);
