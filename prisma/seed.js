const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "BookAuthor",
      "Loan",
      "Book",
      "Author",
      "User"
    RESTART IDENTITY CASCADE;
  `);

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const member = await prisma.user.create({
    data: {
      email: "member@example.com",
      password: hashedPassword,
      role: "MEMBER",
    },
  });

  const author1 = await prisma.author.create({
    data: {
      firstName: "J.R.R.",
      lastName: "Tolkien",
      bio: "Author of The Hobbit and The Lord of the Rings.",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      firstName: "C.S.",
      lastName: "Lewis",
      bio: "Author of The Chronicles of Narnia.",
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "The Hobbit",
      isbn: "9780547928227",
      publishedYear: 1937,
      genre: "Fantasy",
      copiesAvailable: 4,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "The Lion, the Witch and the Wardrobe",
      isbn: "9780064471046",
      publishedYear: 1950,
      genre: "Fantasy",
      copiesAvailable: 3,
    },
  });

  await prisma.bookAuthor.createMany({
    data: [
      {
        bookId: book1.id,
        authorId: author1.id,
      },
      {
        bookId: book2.id,
        authorId: author2.id,
      },
    ],
  });

  await prisma.loan.create({
    data: {
      userId: member.id,
      bookId: book1.id,
      loanDate: new Date(),
      dueDate: new Date("2026-05-15"),
      status: "ACTIVE",
    },
  });

  console.log("Seed data created successfully.");
  console.log("Admin login: admin@example.com / Password123!");
  console.log("Member login: member@example.com / Password123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });