import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadSubjectAreas() {
  try {
    const workbook = xlsx.readFile("subject_areas.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);
    for (const row of data) {
      const name = row["Subject Areas"];

      if (!name) {
        console.log("Skipping row without 'name' field.");
        continue;
      }

      const existingEntry = await prisma.subjectArea.findUnique({
        where: { name },
      });

      if (!existingEntry) {
        await prisma.subjectArea.create({
          data: { name },
        });
        console.log(`Added new subject area: ${name}`);
      } else {
        console.log(`Subject area '${name}' already exists, skipping.`);
      }
    }

    console.log("Upload process completed.");
  } catch (error) {
    console.error("Error uploading subject areas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadSubjectAreas();
