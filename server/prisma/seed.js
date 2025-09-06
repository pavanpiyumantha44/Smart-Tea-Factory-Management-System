import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

async function seed(){
    // const person = await prisma.person.create({
    //     data:{
    //         personCode:"ADM1",
    //         firstName:"Sys",
    //         lastName:"Admin",
    //         nicNumber:"99897787671",
    //         email:"sysadmin@ct.com",
    //         phone:"077678676",
    //         address:"Hatale, Kandy",
    //         gender:"M",
    //         roleId:"d768cac0-c6f3-43c4-898e-bb9798e96267",
    //     }
    // })
    // const role = await prisma.role.createMany({
    //     data:[
    //         {
    //             userRole:"ADMIN",
    //             description:"Admin",
    //             isDeleted:'N'
    //         },
    //         {
    //             userRole:"MANAGER",
    //             description:"Manager",
    //             isDeleted:'N'
    //         },
    //         {
    //             userRole:"SUPERVISOR",
    //             description:"Supervisor",
    //             isDeleted:'N'
    //         },
    //         {
    //             userRole:"TEA-PLUCKER",
    //             description:"Tea Plucker",
    //             isDeleted:'N'
    //         }, 
    //         {
    //             userRole:"CLEANER",
    //             description:"Cleaner",
    //             isDeleted:'N'
    //         },
    //         {
    //             userRole:"SECURITY",
    //             description:"Security",
    //             isDeleted:'N'
    //         }
    //     ]
    // })
    const hashPassword = await bcrypt.hash("sup@123",10);

    // const account = await prisma.account.create({
    //     data:{
    //         personId:"561416e6-5653-4fd4-8ba3-354634ad3789",
    //         username:"sysadmin",
    //         password:hashPassword,
    //     }
    // })
    // const account = await prisma.account.create({
    //     data:{
    //         personId:"d1daf799-7d5c-416e-95ea-7c2c4f467059",
    //         username:"mang",
    //         password:hashPassword,
    //     }
    // })
    //  const account = await prisma.account.create({
    //     data:{
    //         personId:"a71b34b2-7123-4829-a8e3-1b8809fd3fde",
    //         username:"supv",
    //         password:hashPassword,
    //     }
    // })
    // const stockTransaction = await prisma.stockTransaction.create({
    //     data:{
    //         itemId:"f969d4ff-2716-4535-8edd-09f77bf4a490",
    //         taskId:"11",
    //         date:new Date(),
    //         type:"TOOL",
    //         quantity:3,
    //         reference:"Clean A21 Tea Area"
    //     }
    // })
    // const team = await prisma.team.createMany({
    //     data:
    //     [
    //         {
    //         name:"SUPERVISORS",
    //         description:"Supervisors"
    //         },
    //         {
    //         name:"TEA-PLUCKING",
    //         description:"Tea Plucking"
    //         },
    //         {
    //         name:"CLEANERS",
    //         description:"Cleaners"
    //         },
    //         {
    //         name:"DRIVERS",
    //         description:"Drivers"
    //         },
    //         {
    //         name:"SECURITY",
    //         description:"Security"
    //         },
    //         {
    //         name:"PROCESSING",
    //         description:"Processing"
    //         },
    //         {
    //         name:"PACKAGING",
    //         description:"Packaging"
    //         },
    //         {
    //         name:"QUALITY-CONTROL",
    //         description:"Quality Control"
    //         },
    //         {
    //         name:"SALES",
    //         description:"Sales"
    //         }
    //     ]
    // })
    const definedSalaries = await prisma.definedSalaries.createMany({
        data:[
            {
                roleId:"7d8feca0-6e66-46d2-8096-a81d4fb52937",
                basicSalary:50000,
            },
            {
                roleId:"a8b7e33c-d941-4103-9f41-043953ff10b6",
                basicSalary:30000,
            },
            {
                roleId:"d0f7791d-5eef-4fde-9351-bb248767cfd7",
                basicSalary:20000,
            },
            {
                roleId:"f289ac80-c8b9-4ee8-9a25-a556c2d0448e",
                basicSalary:15000,
            }
        ]
    })
    
}

seed().then(()=>prisma.$disconnect());