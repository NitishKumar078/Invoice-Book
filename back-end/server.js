const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { promisify } = require("util");

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS and JSON middlewares
app.use(cors());
app.use(express.json());

// Connect to the database
const db = new sqlite3.Database(path.resolve(__dirname, "data.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    // Create tables if they don't exist
    db.run(`
            CREATE TABLE IF NOT EXISTS invoice (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoiceId INTEGER,
                date TEXT,
                customer TEXT,
                gstNo TEXT,
                contactno TEXT,
                address TEXT,
                gstAmt REAL,
                totalAmt REAL
            )
        `);
    db.run(`
            CREATE TABLE IF NOT EXISTS tableInfo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                invoiceId INTEGER,
                item TEXT,
                quantity TEXT,
                unit REAL,
                price REAL,
                amount REAL,
                FOREIGN KEY(invoiceId) REFERENCES invoice(invoiceId) ON DELETE CASCADE
            )
        `);
  }
});

// Convert callbacks to promises for async/await usage
const runQuery = (db, query, params = []) =>
  promisify(db.run.bind(db))(query, params);
const allQuery = (db, query, params = []) =>
  promisify(db.all.bind(db))(query, params);

app.post("/invoices", async (req, res) => {
  const {
    invoiceId,
    date,
    customer,
    gstNo,
    contactno,
    address,
    gstAmt,
    tableInfo,
    totalAmt,
  } = req.body;

  if (
    !invoiceId ||
    !customer ||
    !tableInfo ||
    !Array.isArray(tableInfo) ||
    tableInfo.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields or tableInfo" });
  }

  const db = new sqlite3.Database(path.resolve(__dirname, "data.db"));

  try {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      // Insert invoice data first
      db.run(
        "INSERT INTO invoice (  invoiceId, date, customer, gstNo, contactno, address, gstAmt, totalAmt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          invoiceId,
          date,
          customer,
          gstNo,
          contactno,
          address,
          gstAmt,
          totalAmt,
        ],
        function (err) {
          if (err) {
            db.run("ROLLBACK");
            return res.status(500).json({ error: "Error inserting invoice" });
          }

          // Now insert the items in tableInfo
          const insertItemStmt = db.prepare(
            "INSERT INTO tableInfo (invoiceId, item, quantity, unit, price, amount) VALUES (?, ?, ?, ?, ?, ?)",
          );

          for (const item of tableInfo) {
            insertItemStmt.run(
              [
                invoiceId,
                item.item,
                item.quantity,
                item.unit,
                item.price,
                item.amount,
              ],
              (err) => {
                if (err) {
                  db.run("ROLLBACK");
                  return res
                    .status(500)
                    .json({ error: "Error inserting table item" });
                }
              },
            );
          }

          insertItemStmt.finalize((err) => {
            if (err) {
              db.run("ROLLBACK");
              return res
                .status(500)
                .json({ error: "Error finalizing table item insert" });
            }

            // Commit transaction after successful insertions
            db.run("COMMIT", (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Transaction commit failed" });
              }

              res.json({ invoiceId });
            });
          });
        },
      );
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Fetch invoice with items
app.get("/invoices/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;

  try {
    // Fetch invoice details
    const invoice = await allQuery(
      db,
      "SELECT * FROM invoice WHERE invoiceId = ?",
      [invoiceId],
    );

    if (invoice.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Fetch associated items
    const items = await allQuery(
      db,
      "SELECT * FROM tableInfo WHERE invoiceId = ?",
      [invoiceId],
    );

    res.json({ ...invoice[0], items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// thi
app.get("/invoice/new", async (req, res) => {
  try {
    // Query to get the most recent invoice, assuming invoiceId is the key
    const rows = await allQuery(
      db,
      "SELECT invoiceId, customer, gstNo, contactno, address, gstAmt, totalAmt FROM invoice ORDER BY invoiceId DESC LIMIT 1",
    );

    if (rows.length > 0) {
      res.json(rows[0]); // Send only the top row
    } else {
      res.status(404).json({ error: "No invoices found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Update an invoice and its items
app.put("/invoices/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;
  const { customer, gstNo, contactno, address, gstAmt, totalAmt, items } =
    req.body;

  if (!customer || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Missing required fields or items" });
  }

  try {
    // Update the invoice
    await runQuery(
      db,
      "UPDATE invoice SET customer = ?, gstNo = ?, contactno = ?, address = ?, gstAmt = ?, totalAmt = ? WHERE invoiceId = ?",
      [customer, gstNo, contactno, address, gstAmt, totalAmt, invoiceId],
    );

    // Delete old items and insert new ones
    await runQuery(db, "DELETE FROM tableInfo WHERE invoiceId = ?", [
      invoiceId,
    ]);

    for (const item of items) {
      await runQuery(
        db,
        "INSERT INTO tableInfo (invoiceId, item, unit, price, amount) VALUES (?, ?, ?, ?, ?)",
        [invoiceId, item.name, item.price, item.details],
      );
    }

    res.json({ message: "Invoice updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Delete an invoice and its items
app.delete("/invoices/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;

  try {
    // First, delete the items from tableInfo that are linked to this invoice
    await runQuery(db, "DELETE FROM tableInfo WHERE invoiceId = ?", [
      invoiceId,
    ]);

    // Then, delete the invoice
    await runQuery(db, "DELETE FROM invoice WHERE invoiceId = ?", [invoiceId]);

    res.json({ message: "Invoice and its items deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// feach all invoice in the data-base
// app.get('/invoices', async (req, res) => {
//   const db = new sqlite3.Database(path.resolve(__dirname, 'data.db'));

//   try {
//       db.all(
//           `SELECT invoice.invoiceId, invoice.customer, invoice.gstNo, invoice.contactno, invoice.address,
//                   invoice.gstAmt, invoice.totalAmt,
//                   tableInfo.item, tableInfo.price, tableInfo.details
//            FROM invoice
//            LEFT JOIN tableInfo ON invoice.invoiceId = tableInfo.invoiceId`,
//           (err, rows) => {
//               if (err) {
//                   console.error(err.message);
//                   return res.status(500).json({ error: 'Error fetching invoices' });
//               }

//               // Structure the result to group items under each invoice
//               const invoices = {};
//               rows.forEach(row => {
//                   const { invoiceId, customer, gstNo, contactno, address, gstAmt, totalAmt, item, price, details } = row;

//                   if (!invoices[invoiceId]) {
//                       invoices[invoiceId] = {
//                           invoiceId,
//                           customer,
//                           gstNo,
//                           contactno,
//                           address,
//                           gstAmt,
//                           totalAmt,
//                           items: []
//                       };
//                   }

//                   if (item) {
//                       invoices[invoiceId].items.push({ item, price, details });
//                   }
//               });

//               // Convert the object into an array
//               const invoiceList = Object.values(invoices);

//               res.json(invoiceList);
//           }
//       );
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// GET: Fetch all invoices
app.get("/invoices", async (req, res) => {
  try {
    // res.send("going to send all invoice")
    const rows = await allQuery(
      db,
      "SELECT invoiceId, date, customer, gstNo, contactno, address, gstAmt, totalAmt FROM invoice",
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
