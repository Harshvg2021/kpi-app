import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadDistributionModels() {
  try {
    const workbook = xlsx.readFile("distribution_model.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);
    for (const row of data) {
      const name = row["Distribution Model"];

      if (!name) {
        console.log("Skipping row without 'name' field.");
        continue;
      }

      const existingEntry = await prisma.distributionModel.findUnique({
        where: { name },
      });

      if (!existingEntry) {
        await prisma.distributionModel.create({
          data: { name },
        });
        console.log(`Added new distribution model: ${name}`);
      } else {
        console.log(`Distribution model '${name}' already exists, skipping.`);
      }
    }

    console.log("Upload process completed.");
  } catch (error) {
    console.error("Error uploading distribution models:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadDistributionModels();
