import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();


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
addusecase();
// addReport()
// addUser()