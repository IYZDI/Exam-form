async function generatePDF() {

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const pages = ["page1", "page2", "page3", "page4"];

  for (let i = 0; i < pages.length; i++) {

    const element = document.getElementById(pages[i]);

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    if (i > 0) pdf.addPage();

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  }

  pdf.save("Exam_Form.pdf");
}
