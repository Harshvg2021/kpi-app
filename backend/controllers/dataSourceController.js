import prisma from "../config/db.js";

const getDataSources = async (req, res) => {
  const { subjectArea, distributionModel, therapyArea, region } = req.body;

  try {
    const dataSources = await prisma.dataSource.findMany({
      where: {
        subjectAreaName: subjectArea,
        distributionModelName: distributionModel,
        therapyAreaName: therapyArea,
        regionName: region,
      },
      include: {

        id: true,
        items: {
            select :{
                name : true,
                description : true
            }
        },
      },
    });

    if (!dataSources.length) {
      return res
        .status(404)
        .json({ message: "No DataSources found for the specified criteria." });
    }

    res.status(200).json(dataSources);
  } catch (error) {
    console.error("Error fetching DataSources:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching DataSources", error });
  }
};


const getVendorList = async (req,res) => {
    try{
        const {dataSourceId } = req.body;
        const vendorList = await prisma.dataSourceItem.findUnique({
            where : {
                dataSourceId : dataSourceId
            },
            include : {
                venderList : true
            }
        });

        if(!vendorList.length){
            return res.status(404).
                json({ message: "No vender list found for the specified criteria." });
        }

        res.status(200).json(vendorList);

    }catch (error){
        console.log("Error getting vendor list ", error.message);
        res.status(500).json({message: error.message})
    }
} ;

export  { getDataSources,getVendorList };
