import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";
import "jspdf-autotable";

interface KPI {
  id: number;
  title: string;
  description: string;
}

export const exportToExcel = (kpis: KPI[]) => {
  const worksheet = XLSX.utils.json_to_sheet(kpis);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "KPIs");
  XLSX.writeFile(workbook, "kpi-summary.xlsx");
};
export const exportToPDF = (kpis: KPI[]) => {
  const doc = new jsPDF() as jsPDF & {
    autoTable: (options: unknown) => jsPDF;
  };

  // Add title
  doc.setFontSize(16);
  doc.text("KPI Summary", 14, 15);

  // Prepare data for the table
  const tableData = kpis.map((kpi, index) => [
    index + 1, // Serial number
    kpi.title, // KPI title
    kpi.description, // KPI description
  ]);

  // Add table
  doc.autoTable({
    startY: 20,
    head: [["SI", "KPI", "Description"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: "#336699" },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save("kpi-summary-pdf.pdf");
};

export const exportToPowerPoint = async (kpis: KPI[]) => {
  const pptx = new pptxgen();
  const slide = pptx.addSlide();

  slide.addText("KPI Summary", {
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
        { text: "KPI", options: { bold: true } },
        { text: "Description", options: { bold: true } },
      ],
      ...kpis.map((kpi, i) => [
        {
          text: String(i + 1),
        },
        {
          text: kpi.title,
        },
        {
          text: kpi.description,
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

  await pptx.writeFile({ fileName: "kpi-summary-ppt" });
};

interface KpiData {
  title: string;
  description: string;
}

export const parseExcelFile = (file: File): Promise<KpiData[]> => {
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
        title: string;
        description: string;
      }>(worksheet);

      // Map to extract only `title` and `description`
      const parsedData: KpiData[] = jsonData
        .map((row) => ({
          title: row.title || "",
          description: row.description || "",
        }))
        .filter((e) => e.title !== "" && e.description !== "");

      resolve(parsedData);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
