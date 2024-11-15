import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const prisma = new PrismaClient();
const DATABASE_URL = 'mongodb+srv://harshvg2021:U3UM8ab00C3GuEgS@cluster0.cea3k.mongodb.net/main'
const collectionName = 'kpis';

const addUser = async ()=>{
    const email = "test4@gmail.com";
    let pass = "test4"
    pass = await bcrypt.hash(pass,10);
    console.log(pass)
    await prisma.user.create({
        data: {
            email ,
            password : pass
        }
    })
}

const addReport = async ()=>{
    const name = "test report 2";
    const category = "test"
    const description = "to be declared"
    const region = "US"
    const subjectArea = "Commercial"
    const therapyArea = "Rare Diseases"
    const distributionModel = "Specialty Pharmacy"

    await prisma.standardReport.create({
        data : { 
            name,
            category,
            description,
            regionName : region ,
            distributionModelName : distributionModel ,
            subjectAreaName : subjectArea,
            therapyAreaName : therapyArea
        }
    })
}

const addusecase = async ()=>{
    const category = "test1 "
    const description = "to be declared 2"
    const region = "US"
    const subjectArea = "Commercial"
    const therapyArea = "Rare Diseases"
    const distributionModel = "Specialty Pharmacy"

    await prisma.standardUseCase.create({
        data : { 
            category,
            description,
            regionName : region ,
            distributionModelName : distributionModel ,
            subjectAreaName : subjectArea,
            therapyAreaName : therapyArea
        }
    })
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define a simple schema for the Kpi collection if not already defined
const kpiSchema = new mongoose.Schema({
  levelName: { type: String, default: null },
  standardReportId: { type: mongoose.Schema.Types.ObjectId, default: null }
}, { strict: false });  // strict: false allows fields not specified in the schema

const Kpi = mongoose.model(collectionName, kpiSchema);

// Update all documents to add levelName and standardReportId with null values if they don't exist
const updateDocuments = async () => {
  try {
    const result = await Kpi.updateMany(
      {},
      {
        $setOnInsert: {
          levelName: null,
          standardReportId: null
        }
      },
      { upsert: false } // Do not create new documents
    );

    console.log(`Documents matched: ${result.matchedCount}`);
    console.log(`Documents modified: ${result.modifiedCount}`);
  } catch (error) {
    console.error('Error updating documents:', error);
  } finally {
    mongoose.connection.close();
    console.log('Connection closed');
  }
};

updateDocuments();
addusecase();
// addReport()
// addUser()