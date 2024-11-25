import mysql from "mysql2/promise";

export async function GET() {
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testdbnextjs",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM blogs");

    await connection.end();

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testdbnextjs",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    const { title, author, content } = await req.json();

    await connection.execute(
      "INSERT INTO blogs (title, author, content) VALUES (?, ?, ?)",
      [title, author, content]
    );

    await connection.end();

    return new Response(
      JSON.stringify({ message: "Blog created successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}
