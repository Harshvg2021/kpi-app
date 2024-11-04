const KPI = require("../models/KPI");
const TherapyArea = require("../models/TherapyArea");
const DistributionModel = require("../models/DistributionModel");
const Region = require("../models/Region");
const SubjectArea = require("../models/SubjectArea");
const User = require("../models/user");
const Category = require("../models/Category");

const getKPIs = async (req, res) => {
  const { therapy_area, region, distribution_model, subject_area } = req.body;
  const userId = req.user.userId;

  console.log("Request received:", req.body);

  try {
    console.log("inside KPI route");

    const kpis = await KPI.find({
      therapy_area,
      region,
      distribution_model,
      subject_area,
    });
    console.log(kpis);
    const user = await User.findById(userId).select("customKPIs");
    let customKPIList = [];

    if (user) {
      const customKPIs = user.customKPIs.filter(
        (customKPI) =>
          customKPI.therapy_area === therapy_area &&
          customKPI.region === region &&
          customKPI.distribution_model === distribution_model &&
          customKPI.subject_area === subject_area
      );

      customKPIList = customKPIs.flatMap((customKPI) =>
        customKPI.KPIs.map((kpi) => ({
          title: kpi.name,
          description: kpi.description,
          category: kpi.category,
        }))
      );
    }

    const standardKPIList = kpis.flatMap((kpi) =>
      kpi.KPI_list.map((kpiItem) => ({
        title: kpiItem.name,
        description: kpiItem.description,
        category: kpiItem.category,
      }))
    );
    const allKPIs = [...standardKPIList, ...customKPIList];
    console.log(allKPIs);

    if (allKPIs.length === 0) {
      return res.status(200).json([]);
    }

    res.json(allKPIs);
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
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
    const therapyAreas = await TherapyArea.distinct("name");
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
    const distributionModels = await DistributionModel.distinct("name");
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
    const regions = await Region.distinct("name");
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
    const categories = await Category.distinct("name");
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
    const subjectAreas = await SubjectArea.distinct("name");
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

  try {
    const userId = req.user.userId;
    console.log("user id : ", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let customKPIEntry = user.customKPIs.find(
      (kpi) =>
        kpi.therapy_area === therapy_area &&
        kpi.region === region &&
        kpi.distribution_model === distribution_model &&
        kpi.subject_area === subject_area
    );

    if (customKPIEntry) {
      customKPIEntry.KPIs.push({
        name: kpi_name,
        description: kpi_description,
        category: "Custom",
      });
    } else {
      customKPIEntry = {
        therapy_area,
        region,
        distribution_model,
        subject_area,
        KPIs: [
          {
            name: kpi_name,
            description: kpi_description,
            category: "Custom",
          },
        ],
      };
      user.customKPIs.push(customKPIEntry);
    }

    await user.save();

    res.status(201).json({
      message: "Custom KPI added successfully",
      customKPI: customKPIEntry,
    });
  } catch (error) {
    console.error("Error adding custom KPI:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getKPIs,
  createKPI,
  getTherapyAreas,
  getDistributionModels,
  getRegions,
  getSubjectAreas,
  addCustomKPI,
  getCategories,
};
