import xlsx from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadVendors() {
  try {
    const workbook = xlsx.readFile("vendorList.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    const targetDataSourceId = "67339cf482b61a305d59061a"; 

    for (const row of data) {
      const dataSourceName = row["DataSourceName"];
      const vendorsString = row["Vendors"];

      if (!dataSourceName || !vendorsString) {
        console.log("Skipping row with missing DataSourceName or Vendors.");
        continue;
      }

      // Split vendors into an array (split by comma and trim any extra spaces)
      const vendors = vendorsString.split(",").map(vendor => vendor.trim());
      console.log(vendors);
      // Find the DataSourceItem that matches the DataSource and name
      const dataSourceItem = await prisma.dataSourceItem.findFirst({
        where: {
          dataSourceId: targetDataSourceId,
          name: dataSourceName,
        },
      });

      if (dataSourceItem) {
        // Update the existing DataSourceItem's vendor list
        await prisma.dataSourceItem.update({
          where: { id: dataSourceItem.id },
          data: {
            venderList: {
              push: vendors, // Append new vendors to the existing venderList
            },
          },
        });
        console.log(`Updated vendor list for data source item: ${dataSourceName}`);
      } else {
        console.log(`DataSourceItem not found for name: ${dataSourceName}`);
      }
    }

    console.log("Vendor upload process completed.");
  } catch (error) {
    console.error("Error uploading vendors:", error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadVendors();
