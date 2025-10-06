// Importing libraries
const { DataSource, EntitySchema } = require('typeorm');

// Defime modal
const User = new EntitySchema({
  name: 'User', // model name
  tableName: 'users', // existing table
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    name: { type: 'varchar' },
    address: { type: 'varchar', nullable: true },
    contact: { type: 'int', nullable: true },
    occupation: { type: 'varchar', nullable: true }
  }
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
});

AppDataSource.initialize()
  .then(() => console.log('✅ Database connected'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Then use repository pattern:
const userRepo = AppDataSource.getRepository('User');

// Fetch all users API
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.find();
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};
