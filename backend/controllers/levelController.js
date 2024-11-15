import prisma from "../config/db.js";

export const getLevels = async(req, res)=>{
    try{
        const levels = await prisma.level.findMany({
            select : {
                name : true
            }
        });
        res.status(200).json(levels);
    }catch(err){
        console.log(err.message)
        res.status(500).json({message : err.message})
    }
}