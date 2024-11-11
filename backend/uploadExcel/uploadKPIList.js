import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function uploadKPIList() {
  try {
    const workbook = xlsx.readFile('KPI_List.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
        const regionName = row.Region ? row.Region.trim() : '';
        const therapyAreaName = row['Therapy Area'] ? row['Therapy Area'].trim() : '';
        const distributionModelName = row['Distribution Model'] ? row['Distribution Model'].trim() : '';
        const subjectAreaName = row['Subject Area'] ? row['Subject Area'].trim() : '';
        const categoryName = row.Category ? row.Category.trim() : '';
        const kpiTitle = row.KPI ? row.KPI.trim() : '';
        const definition = row.Definition ? row.Definition.trim() : ''; 
        
    
      
      const region = await prisma.region.findUnique({ where: { name: regionName } });

      if (!region) {
        console.log(`Region ${regionName} not found, skipping row.`);
        continue;
      }

      const therapyArea = await prisma.therapyArea.findUnique({ where: { name: therapyAreaName } });

      if (!therapyArea) {
        console.log(`Therapy Area ${therapyAreaName} not found, skipping row.`);
        continue;
      }

      const distributionModel = await prisma.distributionModel.findUnique({ where: { name: distributionModelName } });

      if (!distributionModel) {
        console.log(`Distribution Model ${distributionModelName} not found, skipping row.`);
        continue;
      }

      const subjectArea = await prisma.subjectArea.findUnique({ where: { name: subjectAreaName } });

      if (!subjectArea) {
        console.log(`Subject Area ${subjectAreaName} not found, skipping row.`);
        continue;
      }

      const category = await prisma.category.findUnique({ where: { name: categoryName } });

      if (!category) {
        console.log(`Category ${categoryName} not found, skipping row.`);
        continue;
      }

      const existingKpi = await prisma.kpi.findFirst({
        where: {
          regionName,
          therapyAreaName,
          distributionModelName,
          subjectAreaName,
        },
      });

      let kpi;

      if (!existingKpi) {
        kpi = await prisma.kpi.create({
          data: {
            regionName,
            therapyAreaName,
            distributionModelName,
            subjectAreaName,
          },
        });
        console.log(`Created new KPI for ${regionName}, ${therapyAreaName}, ${distributionModelName}, ${subjectAreaName}`);
      } else {
        kpi = existingKpi;
        console.log(`KPI already exists, skipping creation for ${regionName}, ${therapyAreaName}, ${distributionModelName}, ${subjectAreaName}`);
      }

      const existingKpiList = await prisma.kpiList.findUnique({
        where: { title_description_categoryName: { title: kpiTitle, description: definition, categoryName } },
      });

      if (!existingKpiList) {
        await prisma.kpiList.create({
          data: {
            title: kpiTitle,
            description: definition,
            kpiId: kpi.id,
            categoryName,   
          },
        });
        console.log(`Added KPI List: ${kpiTitle} in Category ${categoryName}`);
      } else {
        console.log(`KPI List for ${kpiTitle} already exists, skipping.`);
      }
    }

    console.log("Upload process completed.");
  } catch (error) {
    console.error("Error uploading KPI List:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadKPIList();
