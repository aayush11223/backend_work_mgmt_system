require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});

async function main() {
    console.log(" Seeding database");

    const saltRounds = 10;
    const adminHashedPassword = await bcrypt.hash("admin123", saltRounds);
    const employeeHashedPassword = await bcrypt.hash("employee123", saltRounds);

    // 1. Create or update Admin
    const admin = await prisma.user.upsert({
        where: { username: "admin" },
        update: {
            name: "Admin User",
            email: "admin@gmail.com",
            password: adminHashedPassword,
            role: "admin",
            department: "Management",
        },
        create: {
            name: "Admin User",
            username: "admin",
            email: "admin@gmail.com",
            password: adminHashedPassword,
            role: "admin",
            department: "Management",
        },
    });

    // 2. Create or update Employee Users
    const emp1User = await prisma.user.upsert({
        where: { username: "aayush" },
        update: {
            name: "Aayush",
            email: "aayush@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "IT",
        },
        create: {
            name: "Aayush",
            username: "aayush",
            email: "aayush@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "IT",
        },
    });

    const emp2User = await prisma.user.upsert({
        where: { username: "bikash" },
        update: {
            name: "Bikash Thapa",
            email: "bikash@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "HR",
        },
        create: {
            name: "Bikash Thapa",
            username: "bikash",
            email: "bikash@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "HR",
        },
    });

    const emp3User = await prisma.user.upsert({
        where: { username: "sita" },
        update: {
            name: "Sita Rai",
            email: "sita@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "Finance",
        },
        create: {
            name: "Sita Rai",
            username: "sita",
            email: "sita@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "Finance",
        },
    });

    const emp4User = await prisma.user.upsert({
        where: { username: "ramesh" },
        update: {
            name: "Ramesh Adhikari",
            email: "ramesh@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "IT",
        },
        create: {
            name: "Ramesh Adhikari",
            username: "ramesh",
            email: "ramesh@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "IT",
        },
    });

    const emp5User = await prisma.user.upsert({
        where: { username: "priya" },
        update: {
            name: "Priya Gurung",
            email: "priya@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "Marketing",
        },
        create: {
            name: "Priya Gurung",
            username: "priya",
            email: "priya@gmail.com",
            password: employeeHashedPassword,
            role: "employee",
            department: "Marketing",
        },
    });

    // 3. Create or update Employee Profiles
    const emp1 = await prisma.employee.upsert({
        where: { userId: emp1User.id },
        update: {
            name: emp1User.name,
            email: emp1User.email,
            department: "IT",
            role: "Developer",
            salary: 50000,
            phone: "9800000001",
        },
        create: {
            userId: emp1User.id,
            name: emp1User.name,
            email: emp1User.email,
            department: "IT",
            role: "Developer",
            salary: 50000,
            phone: "9800000001",
        },
    });

    await prisma.employee.upsert({
        where: { userId: emp2User.id },
        update: {
            name: emp2User.name,
            email: emp2User.email,
            department: "HR",
            role: "HR Officer",
            salary: 45000,
            phone: "9800000002",
        },
        create: {
            userId: emp2User.id,
            name: emp2User.name,
            email: emp2User.email,
            department: "HR",
            role: "HR Officer",
            salary: 45000,
            phone: "9800000002",
        },
    });

    await prisma.employee.upsert({
        where: { userId: emp3User.id },
        update: {
            name: emp3User.name,
            email: emp3User.email,
            department: "Finance",
            role: "Accountant",
            salary: 48000,
            phone: "9800000003",
        },
        create: {
            userId: emp3User.id,
            name: emp3User.name,
            email: emp3User.email,
            department: "Finance",
            role: "Accountant",
            salary: 48000,
            phone: "9800000003",
        },
    });

    await prisma.employee.upsert({
        where: { userId: emp4User.id },
        update: {
            name: emp4User.name,
            email: emp4User.email,
            department: "IT",
            role: "QA Engineer",
            salary: 47000,
            phone: "9800000004",
        },
        create: {
            userId: emp4User.id,
            name: emp4User.name,
            email: emp4User.email,
            department: "IT",
            role: "QA Engineer",
            salary: 47000,
            phone: "9800000004",
        },
    });

    await prisma.employee.upsert({
        where: { userId: emp5User.id },
        update: {
            name: emp5User.name,
            email: emp5User.email,
            department: "Marketing",
            role: "Marketing Executive",
            salary: 43000,
            phone: "9800000005",
        },
        create: {
            userId: emp5User.id,
            name: emp5User.name,
            email: emp5User.email,
            department: "Marketing",
            role: "Marketing Executive",
            salary: 43000,
            phone: "9800000005",
        },
    });

    // Remove old seed data for emp1 so this script is idempotent
    await prisma.attendance.deleteMany({ where: { userId: emp1User.id } });
    await prisma.leave.deleteMany({ where: { userId: emp1User.id } });
    await prisma.workLog.deleteMany({ where: { userId: emp1User.id } });

    // 4. Create Attendance for emp1
    await prisma.attendance.createMany({
        data: [
            {
                userId: emp1User.id,
                date: "2026-06-01",
                checkIn: "09:00",
                checkOut: "17:00",
                status: "present",
            },
            {
                userId: emp1User.id,
                date: "2026-06-02",
                checkIn: "09:10",
                checkOut: "17:05",
                status: "present",
            },
            {
                userId: emp1User.id,
                date: "2026-06-03",
                checkIn: "09:30",
                checkOut: "17:00",
                status: "present",
            },
        ],
    });

    // 5. Create Leave for emp1
    await prisma.leave.create({
        data: {
            userId: emp1User.id,
            type: "sick",
            fromDate: "2026-06-10",
            toDate: "2026-06-12",
            reason: "Fever",
            status: "pending",
        },
    });

    // 6. Create WorkLogs for emp1
    await prisma.workLog.createMany({
        data: [
            {
                userId: emp1User.id,
                date: "2026-06-01",
                description: "Backend API development",
                units: 3,
                hours: 5.5,
            },
            {
                userId: emp1User.id,
                date: "2026-06-02",
                description: "Bug fixing and testing",
                units: 2,
                hours: 2,
            },
            {
                userId: emp1User.id,
                date: "2026-06-03",
                description: "Code review and documentation",
                units: 2,
                hours: 3,
            },
        ],
    });

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

