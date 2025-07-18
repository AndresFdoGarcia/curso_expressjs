import prisma from "./lib/prisma.js";

async function main() {
    // Elimina todos los registros previos de TimeBlock
    await prisma.appointment.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.timeBlock.deleteMany();


    await prisma.usuario.createMany({
        data: [
            {
                id: '6872001d-f984-43e4-bb76-290e6baed792',
                name: 'Andres Admin',
                email: 'andres@example.com',
                role: 0,
                password:'$2b$10$CajsdSi4fnt1oEzreEht1.5AA4hEGmdjflrZywNjND1bh9Y1kA6l2'
            },
            {
                id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
                name: 'Claudia User',
                email: 'claudia@example.com',
                role: 1,
                password: '$2b$10$rJJyo7wl2DBwSm.O4TFCJ.MLvSMoRiXdS7LQXJHJ2n6XHxNu0YNz2'
            },
        ]
    });

    console.log('Usuarios insertados');

    // Inserta los nuevos bloques de tiempo
    await prisma.timeBlock.createMany({
        data: [
            {
                id: 'b1c2d3e4-f5a6-7890-bcde-1234567890ab',
                start: new Date('2025-05-01T09:00:00.000Z'),
                end: new Date('2025-05-01T10:00:00.000Z'),
            },
            {
                id: 'c2d3e4f5-a6b7-8901-cdef-2345678901bc',
                start: new Date('2025-05-01T10:00:00.000Z'),
                end: new Date('2025-05-01T11:00:00.000Z'),
            },
            {
                id: 'd4e5f6a7-b8c9-0123-def0-3456789012cd',
                start: new Date('2025-05-01T11:00:00.000Z'),
                end: new Date('2025-05-01T12:00:00.000Z'),
            },
            {
                id: 'e5f6a7b8-c9d0-1234-ef01-4567890123de',
                start: new Date('2025-05-01T12:00:00.000Z'),
                end: new Date('2025-05-01T13:00:00.000Z'),
            },
        ],
    });

    console.log('TimeBlocks insertados');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });