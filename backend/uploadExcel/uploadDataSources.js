import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadDataSources() {
  try {
    const workbook = xlsx.readFile("data_source.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data);

    for (const row of data) {
      let therapyAreaName = row["TherapyArea"];
      let distributionModelName = row["DistributionModel"];
      let regionName = row["Region"];
      let subjectAreaName = row["SubjectArea"];
      let dataSourceName = row["DataSourceName"];
      let description = row["Description"];

      therapyAreaName = therapyAreaName.trim();
      distributionModelName = distributionModelName.trim();
      regionName = regionName.trim();
      subjectAreaName = subjectAreaName.trim();
      dataSourceName = dataSourceName.trim();
      description = description.trim();

      if (
        !therapyAreaName ||
        !distributionModelName ||
        !regionName ||
        !subjectAreaName ||
        !dataSourceName
      ) {
        console.log("Skipping row with missing required fields.");
        continue;
      }

      const existingDataSource = await prisma.dataSource.findFirst({
        where: {
          therapyAreaName,
          distributionModelName,
          regionName,
          subjectAreaName,
        },
      });

      if (existingDataSource) {
        await prisma.dataSourceItem.create({
          data: {
            dataSourceId: existingDataSource.id,
            name: dataSourceName,
            description,
            venderList: [], 
          },
        });
        console.log(
          `Added new item to existing data source: ${dataSourceName}`
        );
      } else {
        await prisma.dataSource.create({
          data: {
            therapyAreaName,
            distributionModelName,
            regionName,
            subjectAreaName,
            items: {
              create: {
                name: dataSourceName,
                description,
                venderList: [], 
              },
            },
          },
        });
        console.log(`Added new data source with item: ${dataSourceName}`);
      }
    }

    console.log("Data source upload process completed.");
  } catch (error) {
    console.error("Error uploading data sources:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadDataSources();
