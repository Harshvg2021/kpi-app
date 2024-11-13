import prisma from "../config/db.js";

export const getReports = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
  } = req.body;

  try {
    const standardReports = await prisma.standardReport.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
      },
      select: {
        category: true,
        description: true,
        name: true,
      },
    });

    const customReports = await prisma.customReport.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        userId: req?.user?.userId,
      },
      select: {
        category: true,
        description: true,
        name: true,
      },
    });

    const reports = {
      standardReports,
      customReports,
    };

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

export const getReportsByCategory = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
    categoryName,
    userId,
  } = req.body;

  try {
    const standardReports = await prisma.standardReport.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        category: categoryName,
      },
      select: {
        category: true,
        description: true,
        name: true,
      },
    });

    const customReports = await prisma.customReport.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        category: categoryName,
        userId: userId,
      },
      select: {
        category: true,
        description: true,
        name: true,
      },
    });

    const reports = {
      standardReports,
      customReports,
    };
    if (standardReports.length === 0 && customReports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for the specified filters." });
    }
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

export const addReport = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      therapyAreaName,
      regionName,
      subjectAreaName,
      distributionModelName,
      userId,
    } = req.body;
    const newCustomReport = await prisma.customReport.create({
      data: {
        name,
        category,
        description,
        therapyAreaName,
        regionName,
        subjectAreaName,
        distributionModelName,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json({
      message: "Custom report added successfully",
      report: newCustomReport,
    });
  } catch (error) {
    console.error("Error adding report:", error);
    res
      .status(500)
      .json({ message: "Error adding report", error: error.message });
  }
};
