import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadReports() {
  try {
    const workbook = xlsx.readFile("reports.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const {
        name = "",
        category = "",
        description = "",
        regionName = "",
        subjectName = "",
        therapyName = "",
        distributionModelName = ""
      } = row;

      const trimmedData = {
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        regionName: regionName.trim(),
        subjectName: subjectName.trim(),
        therapyName: therapyName.trim(),
        distributionModelName: distributionModelName.trim(),
      };
      console.log(trimmedData)
    
        await prisma.standardReport.create({
          data: {
            name: name.trim(),
            category: category.trim(),
            description: description.trim(),
            region: { connect: { name: regionName.trim() } },
            subjectArea: { connect: { name: subjectName.trim() } },
            therapyArea: { connect: { name: therapyName.trim() } },
            distributionModel: { connect: { name: distributionModelName.trim() } },
          },
        });
      
    }
  } catch (error) {
    console.error("Error uploading reports:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadReports();
