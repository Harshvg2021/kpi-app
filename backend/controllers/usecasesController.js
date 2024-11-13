import prisma from "../config/db.js";

export const getUseCases = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
  } = req.body;

  const userId = req.user.userId;

  console.log(userId);
  try {
    const standardUseCases = await prisma.standardUseCase.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
      },
      select: {
        category: true,
        description: true,
      },
    });

    const customUseCases = await prisma.customUseCases.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        userId: userId,
      },
      select: {
        category: true,
        description: true,
      },
    });

    const useCases = {
      standardUseCases,
      customUseCases,
    };
    if (standardUseCases.length === 0 && customUseCases.length === 0) {
      return res
        .status(404)
        .json({ message: "No usecases found for the specified filters." });
    }

    res.status(200).json(useCases);
  } catch (error) {
    console.error("Error fetching use case:", error);
    res
      .status(500)
      .json({ message: "Error fetching use case", error: error.message });
  }
};

export const getUseCaseByCategory = async (req, res) => {
  const {
    therapyAreaName,
    regionName,
    subjectAreaName,
    distributionModelName,
    category,
  } = req.body;

  const userId = req.user.userId;

  console.log(userId);
  try {
    const standardUseCases = await prisma.standardUseCase.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        category,
      },
      select: {
        category: true,
        description: true,
      },
    });

    const customUseCases = await prisma.customUseCases.findMany({
      where: {
        therapyAreaName: therapyAreaName,
        regionName: regionName,
        subjectAreaName: subjectAreaName,
        distributionModelName: distributionModelName,
        userId: userId,
        category,
      },
      select: {
        category: true,
        description: true,
      },
    });

    const useCases = {
      standardUseCases,
      customUseCases,
    };
    if (standardUseCases.length === 0 && customUseCases.length === 0) {
      return res
        .status(404)
        .json({ message: "No usecases found for the specified filters." });
    }

    res.status(200).json(useCases);
  } catch (error) {
    console.error("Error fetching use case:", error);
    res
      .status(500)
      .json({ message: "Error fetching use case", error: error.message });
  }
};

export const addUseCase = async (req, res) => {
  try {
    const {
      category,
      description,
      therapyAreaName,
      regionName,
      subjectAreaName,
      distributionModelName,
    } = req.body;
    const userId = req.user.userId;

    const newCustomUseCase = await prisma.customUseCases.create({
      data: {
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
      message: "Custom use case added successfully",
      report: newCustomUseCase,
    });
  } catch (error) {
    console.error("Error adding use case:", error);
    res
      .status(500)
      .json({ message: "Error adding usecase", error: error.message });
  }
};
