import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadReports() {
  try {
    const workbook = xlsx.readFile("usecase.xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const {
        category = "",
        useCaseName = "",
        Region = "",
        SubjectArea = "",
        TherapyArea = "",
        DistributionModel = ""
      } = row;
      console.log(row)
      const trimmedData = {
        category: category.trim(),
        description: useCaseName.trim(),
        regionName: Region.trim(),
        subjectName: SubjectArea.trim(),
        therapyName: TherapyArea.trim(),
        distributionModelName: DistributionModel.trim(),
      };
      console.log(trimmedData)
    
        await prisma.standardUseCase.create({
          data: {
            category: category.trim(),
            description: useCaseName.trim(),
            region: { connect: { name: Region.trim() } },
            subjectArea: { connect: { name: SubjectArea.trim() } },
            therapyArea: { connect: { name: TherapyArea.trim() } },
            distributionModel: { connect: { name: DistributionModel.trim() } },
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
