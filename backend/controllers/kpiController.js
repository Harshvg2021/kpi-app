const KPI = require('../models/KPI');

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
module.exports = { getKPIs,createKPI };
