const config = () => {
    return {
        jwtKey: process.env.KEY_JWT,
        jwtExpires: "5d",
        dbPath: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&authSource=admin`
    }
}

module.exports = config();
