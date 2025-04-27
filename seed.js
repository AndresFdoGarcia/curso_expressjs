import prisma from "./lib/prisma.js";

async function main() {
    await prisma.usuario.deleteMany();
}

main ()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });