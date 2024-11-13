import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";
import "jspdf-autotable";

interface Vendor {
  id: number;
  vendor: string;
}

export const exportToExcel = (vendor: Vendor[]) => {
  const worksheet = XLSX.utils.json_to_sheet(vendor);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor");
  XLSX.writeFile(workbook, "data-summary.xlsx");
};
export const exportToPDF = (vendor: Vendor[]) => {
  const doc = new jsPDF() as jsPDF & {
    autoTable: (options: unknown) => jsPDF;
  };

  // Add vendor
  doc.setFontSize(16);
  doc.text("Vendor Summary", 14, 15);

  // Prepare data for the table
  const tableData = vendor.map((vendor, index) => [
    index + 1, // Serial number
    vendor.vendor,
  ]);

  // Add table
  doc.autoTable({
    startY: 20,
    head: [["SI", "Vendor"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: "#336699" },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save("data-summary-pdf.pdf");
};

export const exportToPowerPoint = async (vendor: Vendor[]) => {
  const pptx = new pptxgen();
  const slide = pptx.addSlide();

  slide.addText("Vendor Summary", {
    x: 0.5,
    y: 0.5,
    fontSize: 24,
    bold: true,
  });

  // Add table
  slide.addTable(
    [
      [
        { text: "SI No.", options: { bold: true } },
        { text: "Vendor", options: { bold: true } },
      ],
      ...vendor.map((vendor, i) => [
        {
          text: String(i + 1),
        },
        {
          text: vendor.vendor,
        },
      ]),
    ],
    {
      x: 0.5,
      y: 1.5,
      w: 9,
      fill: { color: "F5F5F5" },
      border: { pt: 1, color: "CFCFCF" },
    }
  );

  await pptx.writeFile({ fileName: "data-summary-ppt" });
};

interface Vendor {
  id: number;
  vendor: string;
}

export const parseExcelFile = (file: File): Promise<Vendor[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json<{
        vendor: string;
      }>(worksheet);

      // Map to extract only `vendor` and `description`
      const parsedData: Vendor[] = jsonData
        .map((row, index) => ({
          id: index + 1,
          vendor: row.vendor,
        }))
        .filter((e) => e.vendor !== "");

      resolve(parsedData);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
