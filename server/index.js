const port = process.env.DATABASE_URL || 3000;
const app = require('./app');
const db = require('./db/index')

const init = async () => {
    await db.syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
}

;

init();
