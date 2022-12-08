import mongoose from "mongoose";

global.afterAll(async () => {
    await mongoose.connection.close();
});

global.beforeAll(async () => {
    try {
        const url = `mongodb://127.0.0.1:27017/ecommerce`;
        await mongoose.connect(url);
    } catch (error) {

    }
});

global.afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});


