const KPI = require('../models/KPI');
const TherapyArea = require('../models/TherapyArea'); // Adjust the path as necessary
const DistributionModel = require('../models/DistributionModel'); // Adjust the path as necessary
const Region = require('../models/Region'); // Adjust the path as necessary
const SubjectArea = require('../models/SubjectArea')


const getKPIs = async (req, res) => {
    
    const { therapy_area, region, distribution_model, subject_area } = req.body;

    console.log("Request received:", req.body); 
    try {
        console.log("inside KPi route")
        const kpis = await KPI.find({
            therapy_area,
            region,
            distribution_model,
            subject_area
        });

        if (kpis.length === 0) {
            return res.status(200).json({ message: 'No KPIs found for the provided criteria' });
        }

        res.json(kpis);
    } catch (error) {
        console.error('Error fetching KPIs:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

const createKPI = async (req, res) => {
    try {
        
        const { therapy_area, region, distribution_model, subject_area, KPI_list } = req.body;

        const newKPI = new KPI({
            therapy_area,
            region,
            distribution_model,
            subject_area,
            KPI_list
        });

        const savedKPI = await newKPI.save();
        res.status(201).json(savedKPI); 
    } catch (error) {
        console.error('Error creating KPI:', error);
        res.status(500).json({ message: 'Error creating KPI entry', error });
    }
};

const getTherapyAreas = async (req, res) => {
    try {
        const therapyAreas = await TherapyArea.distinct('name');
        res.json(therapyAreas);
    } catch (error) {
        console.error('Error fetching therapy areas:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

const getDistributionModels = async (req, res) => {
    try {
        const distributionModels = await DistributionModel.distinct('name');
        res.json(distributionModels);
    } catch (error) {
        console.error('Error fetching distribution models:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

const getRegions = async (req, res) => {
    try {
        const regions = await Region.distinct('name');
        res.json(regions);
    } catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

const getSubjectAreas = async (req, res) => {
    try {
        const subjectAreas = await SubjectArea.distinct('name');
        res.json(subjectAreas);
    } catch (error) {
        console.error('Error fetching subject areas:', error);
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

module.exports = { getKPIs,
    createKPI,
    getTherapyAreas,
    getDistributionModels,
    getRegions,
    getSubjectAreas };
