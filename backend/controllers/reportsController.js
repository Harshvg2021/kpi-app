import prisma from "../config/db.js";

export const getReports = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
  } = req.body;
  const userId = req.user.userId;
  console.log(userId);
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
        id: true,
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
        id: true,
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

export const getReportsByCategory = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
    categoryName,
  } = req.body;

  const userId = req.user.userId;
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

export const getReportsKpis = async (req, res) => {
  try {
    const { isCustom } = req.query;
    const kpis = await prisma.customKPIList.findMany({
      where: {
        OR: [
          {
            customReportId: {
              has: req.params.id,
            },
          },
          {
            standardReportId: {
              has: req.params.id,
            },
          },
        ],
        userId: req.user.userId,
      },
      select: {
        title: true,
        description: true,
        levelName: true,
        id: true,
      },
    });
    console.log(kpis)
    if (!isCustom) {
      const standardKpi = await prisma.kpiList.findMany({
        where: {
          standardReportId: req.params.id,
        },
        select: {
          title: true,
          description: true,
          levelName: true,
          id: true,
        },
      });
      kpis.concat(standardKpi);
    }
    return res.status(200).json(kpis);
  } catch (error) {}
};

export const addReport = async (req, res) => {
  try {
    const {
      name,
      description,
      therapyAreaName,
      regionName,
      subjectAreaName,
      distributionModelName,
    } = req.body;
    const userId = req.user.userId;
    const newCustomReport = await prisma.customReport.create({
      data: {
        name,
        description,
        user: {
          connect: { id: userId },
        },
        region: {
          connect: { name: regionName },
        },
        subjectArea: {
          connect: { name: subjectAreaName },
        },
        distributionModel: {
          connect: { name: distributionModelName },
        },
        therapyArea: {
          connect: { name: therapyAreaName },
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

export const addReportKpi = async (req, res) => {
  try {
    const { reportId, title, description } = req.body;
    let { isCustom } = req.query;

    isCustom = (isCustom === 'true')
    let reportData;

    if (isCustom) {
      reportData = await prisma.customReport.findFirst({
        where: {
          id: reportId,
          userId: req.user.userId,
        },
        select: {
          regionName: true,
          therapyAreaName: true,
          distributionModelName: true,
          subjectAreaName: true,
        },
      });
    } else {
      reportData = await prisma.standardReport.findFirst({
        where: {
          id: reportId,
        },
        select: {
          regionName: true,
          therapyAreaName: true,
          distributionModelName: true,
          subjectAreaName: true,
        },
      });
    }

    if (!reportData) {
      return res.status(404).json({
        message: `${isCustom ? 'Custom' : 'Standard'} report not found`
      });
    }

    let customKPI = await prisma.customKPI.findFirst({
      where: {
        userId: req.user.userId,
        regionName: reportData.regionName,
        therapyAreaName: reportData.therapyAreaName,
        distributionModelName: reportData.distributionModelName,
        subjectAreaName: reportData.subjectAreaName,
      },
    });

    if (!customKPI) {
      customKPI = await prisma.customKPI.create({
        data: {
          userId: req.user.userId,
          regionName: reportData.regionName,
          therapyAreaName: reportData.therapyAreaName,
          distributionModelName: reportData.distributionModelName,
          subjectAreaName: reportData.subjectAreaName,
        },
      });
    }

    const customKPIList = await prisma.customKPIList.create({
      data: {
        title,
        description,
        categoryName: "Custom",
        userId: req.user.userId,
        customKpisId: customKPI.id,
        customReportId: isCustom ? [reportId] : [],
        standardReportId: isCustom ? [] : [reportId],
      },
    });

    if (isCustom) {
      await prisma.customReport.update({
        where: {
          id: reportId,
        },
        data: {
          kpiListId: {
            push: customKPIList.id,
          },
        },
      });
    } else {
      await prisma.standardReport.update({
        where: {
          id: reportId,
        },
        data: {
          customKpiListId: {
            push: customKPIList.id,
          },
        },
      });
    }

    return res.status(201).json({
      data: {
        customKPI,
        customKPIList,
      },
    });

  } catch (error) {
    console.error('Error in addReportKpi:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
export const addKpiWithReportFilter = async (req, res) => {
  const {
    regionName,
    therapyAreaName,
    subjectAreaName,
    distributionModelName,
    reportId,
    levelName,
    kpi_name,
    kpi_description,
  } = req.body;

  const userId = req.user.userId;
  try {
    console.log("hel");
    const kpis = await prisma.customKPI.findFirst({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        distributionModelName: distributionModelName,
        subjectAreaName: subjectAreaName,
        userId: userId,
        reportId: reportId,
      },
      select: {
        id: true,
      },
    });
    console.log(kpis);

    if (kpis?.id) {
      await prisma.customKPIList.create({
        data: {
          userId,
          title: kpi_name,
          description: kpi_description,
          customKpisId: kpis.id,
          levelName: levelName,
        },
      });
    } else {
      await prisma.customKPI.create({
        data: {
          regionName: regionName,
          subjectAreaName: subjectAreaName,
          therapyAreaName: therapyAreaName,
          distributionModelName: distributionModelName,
          userId,
          reportId: reportId,
          kpiLists: {
            create: {
              userId,
              title: kpi_name,
              description: kpi_description,
              levelName: level,
            },
          },
        },
      });
    }

    res.status(200).json({
      message: "added new KPI",
    });
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    res.status(500).json({ error: "An error occurred while fetching KPIs" });
  }
};
