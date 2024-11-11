import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadCategory() {
  try {
    const workbook = xlsx.readFile("category.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const categoryName = row.Category;

      const existingCategory = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (!existingCategory) {
        await prisma.category.create({
          data: {
            name: categoryName,
          },
        });
        console.log(`Category "${categoryName}" created.`);
      } else {
        console.log(`Category "${categoryName}" already exists, skipping.`);
      }
    }

    console.log("Category upload process completed.");
  } catch (error) {
    console.error("Error uploading categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadCategory();
