const { db } = require("./db");
const { todos } = require("./schema/todos");

const sampleData = [
  { title: "Belajar Express.js" },
  { title: "Membuat REST API" },
  { title: "Belajar Drizzle ORM" },
  { title: "Deploy ke Railway" },
];

async function seed() {
  console.log("Menambahkan data contoh...");
  for (const item of sampleData) {
    await db.insert(todos).values(item);
    console.log(`  ✔ ${item.title}`);
  }
  console.log("Seed selesai!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
