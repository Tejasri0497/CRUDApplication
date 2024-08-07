const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://new-user-teja:India123@cluster0.vc6fgqo.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0",  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option
});

app.post("/insert", async (req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName, daysSinceIAte: days});
    try {
        await food.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    try {
        const result = await FoodModel.find({});
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

app.put("/update", async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        });
    } catch (err) {
        console.error(err);
    }
});


app.listen(3001, () => {
    console.log("Server running on port 3001...")
});



