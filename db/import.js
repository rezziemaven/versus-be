const { execSync } = require('child_process')
const dotenv = require('dotenv')

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_DATABASE } = process.env
const fileName = process.argv[2]

if (!fileName) {
  console.error('Error: please provide a filename. Usage: node db/import.js <filename>')
  process.exit(1)
}

try {
  execSync(`mariadb -u ${DB_USER} -p${DB_PASSWORD} ${DB_DATABASE} < db/${fileName}.sql`, {
    stdio: 'inherit',
  })
  console.log('Database imported successfully!')
} catch (error) {
  console.error('Import failed:', error.message)
  process.exit(1)
}
