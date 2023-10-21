const config = () => {
    return {
        jwtKey: process.env.KEY_JWT,
        jwtExpires: "5d",
        bcryptSalt: 10,
        dbPath: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    }
}

module.exports = config();
