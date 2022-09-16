
const {db, syncAndSeed} = require('../server/db/index')


syncAndSeed().catch(err=>{
    db.close()
    console.log(`
    Error Seeding:
    ${err.message}
    ${err.stack}`)
})