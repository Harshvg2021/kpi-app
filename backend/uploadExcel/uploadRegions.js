import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadRegions() {
  try {
    const workbook = xlsx.readFile("regions.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);
    for (const row of data) {
      const name = row.Region;

      if (!name) {
        console.log("Skipping row without 'name' field.");
        continue;
      }

      const existingEntry = await prisma.region.findUnique({
        where: { name },
      });

      if (!existingEntry) {
        await prisma.region.create({
          data: { name },
        });
        console.log(`Added new region: ${name}`);
      } else {
        console.log(`Region '${name}' already exists, skipping.`);
      }
    }

    console.log("Upload process completed.");
  } catch (error) {
    console.error("Error uploading regions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadRegions();
