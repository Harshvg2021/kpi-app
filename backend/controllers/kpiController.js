// import KPI from "../models/KPI.js";
// import TherapyArea from "../models/TherapyArea.js";
// import DistributionModel from "../models/DistributionModel.js";
// import Region from "../models/Region.js";
// import SubjectArea from "../models/SubjectArea.js";
// import User from "../models/user.js";
// import Category from "../models/Category.js";
import prisma from "../config/db.js";

const getKPIs = async (req, res) => {
  const { therapy_area, region, distribution_model, subject_area } = req.body;
  const userId = req.user.userId;

  try {
    const standardKPI = await prisma.kpi.findFirst({
      where: {
        distributionModelName: distribution_model,
        therapyAreaName: therapy_area,
        subjectAreaName: subject_area,
        regionName: region,
      },
      select: {
        _count: {
          select: {
            kpiLists: true,
          },
        },
        kpiLists: {
          select: {
            id: true,
            categoryName: true,
            description: true,
            title: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    const customKPI = await prisma.customKPI.findFirst({
      where: {
        distributionModelName: distribution_model,
        therapyAreaName: therapy_area,
        subjectAreaName: subject_area,
        regionName: region,
        userId,
      },
      select: {
        _count: {
          select: {
            kpiLists: true,
          },
        },
        kpiLists: {
          select: {
            id: true,
            categoryName: true,
            description: true,
            title: true,
          },
        },
      },
    });
    return res.status(200).json({ data: { standardKPI, customKPI } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error?.message });
  }
};

const createKPI = async (req, res) => {
  try {
    const { therapy_area, region, distribution_model, subject_area, KPI_list } =
      req.body;

    const newKPI = new KPI({
      therapy_area,
      region,
      distribution_model,
      subject_area,
      KPI_list,
    });

    const savedKPI = await newKPI.save();
    res.status(201).json(savedKPI);
  } catch (error) {
    console.error("Error creating KPI:", error);
    res.status(500).json({ message: "Error creating KPI entry", error });
  }
};

const getTherapyAreas = async (req, res) => {
  try {
    const therapyAreas = await prisma.therapyArea.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(therapyAreas);
  } catch (error) {
    console.error("Error fetching therapy areas:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

const getDistributionModels = async (req, res) => {
  try {
    const distributionModels = await prisma.distributionModel.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(distributionModels);
  } catch (error) {
    console.error("Error fetching distribution models:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

const getRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

const getSubjectAreas = async (req, res) => {
  try {
    const subjectAreas = await prisma.subjectArea.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json(subjectAreas);
  } catch (error) {
    console.error("Error fetching subject areas:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

const addCustomKPI = async (req, res) => {
  const {
    therapy_area,
    region,
    distribution_model,
    subject_area,
    kpi_name,
    kpi_description,
  } = req.body;

  if (!kpi_name || !kpi_description) {
    return res
      .status(400)
      .json({ message: "Both KPI name and description are required." });
  }
  const userId = req.user.userId;
  try {
    const customKPI = await prisma.customKPI.findFirst({
      where: {
        regionName: region,
        subjectAreaName: subject_area,
        therapyAreaName: therapy_area,
        distributionModelName: distribution_model,
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (customKPI?.id) {
      await prisma.customKPIList.create({
        data: {
          userId,
          title: kpi_name,
          description: kpi_description,
          customKpisId: customKPI.id,
        },
      });
    } else {
      await prisma.customKPI.create({
        data: {
          regionName: region,
          subjectAreaName: subject_area,
          therapyAreaName: therapy_area,
          distributionModelName: distribution_model,
          userId,
          kpiLists: {
            create: {
              userId,
              title: kpi_name,
              description: kpi_description,
            },
          },
        },
      });
    }
    return res.status(200).json({ message: "Successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message });
  }
};

const addManyCustomKPI = async (req, res) => {
  const { therapy_area, region, distribution_model, subject_area, kpiList } =
    req.body;

  if (!Array.isArray(kpiList) || kpiList.length == 0) {
    return res.status(400).json({ message: "Please provide at least one KPI" });
  }
  const userId = req.user.userId;
  try {
    const customKPI = await prisma.customKPI.findFirst({
      where: {
        regionName: region,
        subjectAreaName: subject_area,
        therapyAreaName: therapy_area,
        distributionModelName: distribution_model,
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (customKPI?.id) {
      try {
        await Promise.all(
          kpiList.map(async (kpi) => {
            await prisma.customKPIList.create({
              data: {
                userId,
                title: kpi.kpi_name,
                description: kpi.kpi_description,
                customKpisId: customKPI.id,
              },
            });
          })
        );
      } catch (error) {}
    } else {
      const kpiId = await prisma.customKPI.create({
        data: {
          regionName: region,
          subjectAreaName: subject_area,
          therapyAreaName: therapy_area,
          distributionModelName: distribution_model,
          userId,
        },
      });
      try {
        await Promise.all(
          kpiList.map(async (kpi) => {
            await prisma.customKPIList.create({
              data: {
                userId,
                title: kpi.kpi_name,
                description: kpi.kpi_description,
                customKpisId: kpiId.id,
              },
            });
          })
        );
      } catch (error) {}
    }
    return res.status(200).json({ message: "Successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message });
  }
};

const deleteCustomKPI = async (req, res) => {
  try {
    const { KPIListId } = req.body;
    const user_id = req.user.userId;
    await prisma.customKPIList.delete({
      where: { id: KPIListId, userId: user_id },
    });

    res.status(200).json({ message: "KPI deleted successfully" });
  } catch (error) {
    console.error("Error deleting KPI:", error);
    res.status(500).json({ message: "Error deleting KPI", error });
  }
};

const editCustomKPI = async (req, res) => {
  try {
    const { kpiListId, title, description } = req.body;
    const user_id = req.user.userId;

    await prisma.customKPIList.update({
      where: {
        id: kpiListId,
        userId: user_id,
      },
      data: {
        title,
        description,
      },
    });

    res.status(200).json({ message: "KPI description updated successfully" });
  } catch (error) {
    console.error("Error updating KPI:", error);
    res.status(500).json({ message: "Error updating KPI", error });
  }
};

export {
  getKPIs,
  createKPI,
  getTherapyAreas,
  getDistributionModels,
  getRegions,
  getSubjectAreas,
  addCustomKPI,
  deleteCustomKPI,
  editCustomKPI,
  addManyCustomKPI,
  getCategories,
};
