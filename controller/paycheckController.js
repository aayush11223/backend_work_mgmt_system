import prisma from '../db.js';

const UNIT_RATE = 100;
const WORKING_DAYS_IN_MONTH = 22;

function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getPaycheck(req, res) {
    const userId = parseInt(req.query.userId);
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    prisma.employee.findUnique({ where: { userId } })
        .then((employee) => {
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            prisma.attendance.findMany({ where: { userId } })
                .then((attendance) => {
                    let attendanceDays = 0;
                    for (const record of attendance) {
                        const recordDate = new Date(record.date);
                        if (
                            recordDate >= startDate && recordDate <= endDate && record.status.toLowerCase() === 'present') {
                            attendanceDays++;
                        }
                    }

                    prisma.leave.findMany({
                        where: {
                            userId,
                            status: 'approved',
                            fromDate: { gte: toDateString(startDate) },
                            toDate: { lte: toDateString(endDate) }
                        }
                    }).then((leaves) => {
                        let approvedLeaveDays = 0;
                        for (const leave of leaves) {
                            const oneDay = 24 * 60 * 60 * 1000;
                            const days = (new Date(leave.toDate) - new Date(leave.fromDate)) / oneDay + 1;
                            approvedLeaveDays += days;
                        }

                        prisma.workLog.findMany({
                            where: {
                                userId,
                                date: { gte: toDateString(startDate), lte: toDateString(endDate) }
                            }
                        }).then((worklogs) => {
                            let totalUnits = 0;
                            for (const log of worklogs) {
                                totalUnits += log.units;
                            }

                            const baseSalary = employee.salary;
                            const earnedBaseSalary = (baseSalary / WORKING_DAYS_IN_MONTH) * (attendanceDays + approvedLeaveDays);
                            const unitsBonus = totalUnits * UNIT_RATE;
                            const grossPay = earnedBaseSalary + unitsBonus;
                            const taxDeduction = grossPay * 0.10;
                            const netPay = grossPay - taxDeduction;

                            res.status(200).json({
                                baseSalary,
                                attendanceDays,
                                approvedLeaveDays,
                                totalUnits,
                                earnedBaseSalary: Math.round(earnedBaseSalary),
                                unitsBonus: Math.round(unitsBonus),
                                grossPay: Math.round(grossPay),
                                taxDeduction: Math.round(taxDeduction),
                                netPay: Math.round(netPay),
                            });
                        });
                    });
                });
        });
}