// Mongo to PSQL migration script

// Importing Libraries
import { MongoClient } from "mongodb";
import pkg from "pg";
import dotenv from "dotenv";

// Config env file
dotenv.config({path: './config.env'});

const { Client: PgClient } = pkg;

// Map of MongoDB collection → PostgreSQL table
const COLLECTION_MAP = {
  users: "users",
};

// mongoField → postgresColumn
const COLLECTION_FIELD_MAP = {
  users: {
    firstName: "name",  // Mongo firstName → PostgreSQL name
    userEmail: "address",
    id: "contact",
    userRole: "occupation"
  }
};

// ---------- MIGRATION FUNCTION ----------
async function migrate() {
  const mongo = new MongoClient(process.env.MONGO_URI);
  const pg = new PgClient({ connectionString: process.env.PG_URI });

  try {
    await mongo.connect();
    await pg.connect();

    console.log("Connected to MongoDB and PostgreSQL.");

    for (const [mongoCol, pgTable] of Object.entries(COLLECTION_MAP)) {
      const collection = mongo.db(process.env.MONGO_DB).collection(mongoCol);
      const docs = await collection.find().toArray();

      console.log(`Migrating ${docs.length} documents from '${mongoCol}' → '${pgTable}'`);

      for (const doc of docs) {
        //     // Remove MongoDB _id if not needed or map to a column
        //     const { _id, ...rest } = doc;

        //     const columns = Object.keys(rest).map(c => `"${c}"`).join(", ");
        //     const values = Object.values(rest);
        //     const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

        //     const query = `INSERT INTO "${pgTable}" (${columns}) VALUES (${placeholders})`;
        //     await pg.query(query, values);

        const fieldMap = COLLECTION_FIELD_MAP[mongoCol];
        const checkColumn = fieldMap["firstName"];
        const mongoValue = doc["firstName"];

        const columns = [];
        const values = [];
        const placeholders = [];

        let i = 1;
        for (const [mongoField, pgColumn] of Object.entries(fieldMap)) {
            if (doc[mongoField] !== undefined) { // only include existing fields
            columns.push(`"${pgColumn}"`);
            values.push(doc[mongoField]);
            placeholders.push(`$${i}`);
            i++;
            }
        }

        const query = `INSERT INTO "${pgTable}" (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
        console.log('QUERY = ', query, ' Doc = ', doc);

        // If record already present skipping, else saving
        const exists = await pg.query(
            `SELECT 1 FROM "${pgTable}" WHERE ${checkColumn} = $1`,
            [mongoValue]
        );
        console.log('Existing query = ', exists);

        if (exists.rowCount === 0) {
            await pg.query(query, values);
            console.log('Data written successfully!');
        } else {
            console.log('Duplicate data - skipping ...');
        }
        
      }
      console.log(`Migrated ${docs.length} documents from '${mongoCol}'.`);
    }

    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await mongo.close();
    await pg.end();
  }
}

// Run migration
migrate();
