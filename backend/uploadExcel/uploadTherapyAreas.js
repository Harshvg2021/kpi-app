import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadTherapyAreas() {
  try {
    const workbook = xlsx.readFile("therapy_area.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);
    for (const row of data) {
      const name = row["Therapy Area"];

      if (!name) {
        console.log("Skipping row without 'name' field.");
        continue;
      }

      const existingEntry = await prisma.therapyArea.findUnique({
        where: { name },
      });

      if (!existingEntry) {
        await prisma.therapyArea.create({
          data: { name },
        });
        console.log(`Added new therapy area: ${name}`);
      } else {
        console.log(`Therapy area '${name}' already exists, skipping.`);
      }
    }

    console.log("Upload process completed.");
  } catch (error) {
    console.error("Error uploading therapy areas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadTherapyAreas();
