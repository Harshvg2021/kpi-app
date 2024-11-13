import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import pptxgen from "pptxgenjs";
import "jspdf-autotable";

interface useCase {
  id: number;
  description: string;
}

export const exportToExcel = (useCases: useCase[]) => {
  const worksheet = XLSX.utils.json_to_sheet(useCases);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "useCases");
  XLSX.writeFile(workbook, "use-case-summary.xlsx");
};
export const exportToPDF = (useCases: useCase[]) => {
  const doc = new jsPDF() as jsPDF & {
    autoTable: (options: unknown) => jsPDF;
  };

  // Add title
  doc.setFontSize(16);
  doc.text("Use-case Summary", 14, 15);

  // Prepare data for the table
  const tableData = useCases.map((useCase, index) => [
    index + 1, // Serial number
    useCase.description, // useCase description
  ]);

  // Add table
  doc.autoTable({
    startY: 20,
    head: [["SI", "use-case"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: "#336699" },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save("useCase-summary-pdf.pdf");
};

export const exportToPowerPoint = async (useCases: useCase[]) => {
  const pptx = new pptxgen();
  const slide = pptx.addSlide();

  slide.addText("use-case Summary", {
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
        { text: "use-case", options: { bold: true } },
      ],
      ...useCases.map((useCase, i) => [
        {
          text: String(i + 1),
        },
        {
          text: useCase.description,
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

  await pptx.writeFile({ fileName: "use-case-summary-ppt" });
};

interface useCaseData {
  SI: number;
  description: string;
}

export const parseExcelFile = (file: File): Promise<useCaseData[]> => {
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
        si: string;
        description: string;
      }>(worksheet);

      // Map to extract only `title` and `description`
      const parsedData: useCaseData[] = jsonData
        .map((row, i) => ({
          SI: i + 1,
          description: row.description || "",
        }))
        .filter((e) => e.description !== "");

      resolve(parsedData);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
