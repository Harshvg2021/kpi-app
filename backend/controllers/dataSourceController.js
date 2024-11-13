import prisma from "../config/db.js";

const getDataSources = async (req, res) => {
  const { subjectArea, distributionModel, therapyArea, region } = req.body;

  try {
    const dataSources = await prisma.dataSource.findFirst({
      where: {
        subjectAreaName: subjectArea,
        distributionModelName: distributionModel,
        therapyAreaName: therapyArea,
        regionName: region,
      },
      select: {
        id: true,
        items: {
          select: {
            id: true,
            name: true,
            vendorList: true,
            description: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    res.status(200).json(dataSources);
  } catch (error) {
    console.error("Error fetching DataSources:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching DataSources", error });
  }
};

const getVendorList = async (req, res) => {
  try {
    const { dataSourceItemId } = req.body;
    const vendorList = await prisma.dataSourceItem.findUnique({
      where: {
        id: dataSourceItemId,
      },
      select: {
        name: true,
        vendorList: true,
      },
    });
    console.log(vendorList);

    res.status(200).json(vendorList);
  } catch (error) {
    console.log("Error getting vendor list ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export { getDataSources, getVendorList };
