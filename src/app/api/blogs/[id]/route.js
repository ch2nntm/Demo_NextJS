import mysql from "mysql2/promise";

export async function GET(req, { params }) {
  console.log("Params:", params);
  const { id } = params;
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testdbnextjs",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT * FROM blogs WHERE id = ?",
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  const { title, author, content } = await req.json();

  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testdbnextjs",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "UPDATE blogs SET title = ?, author = ?, content = ? WHERE id = ?",
      [title, author, content, id]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: "Blog not found or no changes made" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Blog updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testdbnextjs",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "DELETE FROM blogs WHERE id = ?",
      [id]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: "Blog not found or no changes made" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Blog deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 }
    );
  }
}
