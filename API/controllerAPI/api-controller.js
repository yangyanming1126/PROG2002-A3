const express = require('express');

var dbcon = require("../database");

var connection = dbcon.getconnection();

connection.connect();

var router = express.Router();

// Retrieve all active fundraisers including the category
router.get("/fundraisers", (req, res) => {
    connection.query("SELECT f.*, c.NAME AS category_name FROM Fundraiser f JOIN Category c ON f.category_id = c.CATEGORY_ID WHERE f.active = 1", (err, results) => {
        if (err) {
            console.error("Error while retrieving the data", err);
            res.status(500).send("Error while retrieving data");
        } else {
            res.json(results);
        }
    });
});
// POST: 创建新的筹款活动
router.post("/fundraiser", (req, res) => {
    const { organizer, caption, target_funding, current_funding, city, active, category_id } = req.body;

    // 校验必要字段
    if (!organizer || !caption || !target_funding || !city || !category_id) {
        return res.status(400).send("Missing required fields: organizer, caption, target_funding, city, category_id.");
    }

    const newFundraiser = {
        ORGANIZER: organizer,
        CAPTION: caption,
        TARGET_FUNDING: target_funding,
        CURRENT_FUNDING: current_funding || 0,
        CITY: city,
        ACTIVE: active || 1,
        CATEGORY_ID: category_id
    };

    connection.query("INSERT INTO fundraiser SET ?", newFundraiser, (err, results) => {
        if (err) {
            console.error("Error while inserting fundraiser", err);
            res.status(500).send("Error while creating fundraiser.");
        } else {
            res.status(201).send({ message: "Fundraiser created successfully", fundraiserId: results.insertId });
        }
    });
});

// PUT: 根据给定的ID更新现有的筹款活动
router.put("/fundraiser/:id", (req, res) => {
    const { id } = req.params;
    const { organizer, caption, target_funding, current_funding, city, active, category_id } = req.body;

    // 校验必要字段
    if (!organizer || !caption || !target_funding || !city || !category_id) {
        return res.status(400).send("Missing required fields: organizer, caption, target_funding, city, category_id.");
    }

    const updatedFundraiser = {
        ORGANIZER: organizer,
        CAPTION: caption,
        TARGET_FUNDING: target_funding,
        CURRENT_FUNDING: current_funding || 0,
        CITY: city,
        ACTIVE: active || 1,
        CATEGORY_ID: category_id
    };

    connection.query("UPDATE fundraiser SET ? WHERE FUNDRAISER_ID = ?", [updatedFundraiser, id], (err, results) => {
        if (err) {
            console.error("Error while updating fundraiser", err);
            res.status(500).send("Error while updating fundraiser.");
        } else if (results.affectedRows === 0) {
            res.status(404).send("Fundraiser not found.");
        } else {
            res.status(200).send({ message: "Fundraiser updated successfully" });
        }
    });
});

// DELETE: 根据给定的ID删除现有的筹款活动
router.delete("/fundraiser/:id", (req, res) => {
    const { id } = req.params;

    // 首先检查该筹款活动是否已收到任何捐款
    connection.query("SELECT COUNT(*) AS donationCount FROM donation WHERE FUNDRAISER_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Error while checking donations", err);
            res.status(500).send("Error while checking donations.");
        } else if (results[0].donationCount > 0) {
            res.status(400).send("Cannot delete fundraiser with existing donations.");
        } else {
            // 如果没有收到捐款，则删除该筹款活动
            connection.query("DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?", [id], (err, results) => {
                if (err) {
                    console.error("Error while deleting fundraiser", err);
                    res.status(500).send("Error while deleting fundraiser.");
                } else if (results.affectedRows === 0) {
                    res.status(404).send("Fundraiser not found.");
                } else {
                    res.status(200).send({ message: "Fundraiser deleted successfully" });
                }
            });
        }
    });
});

// Retrieve all categories from the database
router.get("/categories", (req, res) => {
    connection.query("SELECT * FROM Category", (err, results) => {
        if (err) {
            console.error("Error retrieving categories", err);
            res.status(500).send("Error while retrieving categories");
        } else {
            res.json(results);
        }
    });
});

// Retrieve fundraiser details by ID
router.get("/fundraiser/:id", (req, res) => {
    const { id } = req.params;
    connection.query("SELECT f.*, c.NAME AS category_name FROM Fundraiser f JOIN Category c ON f.category_id = c.CATEGORY_ID where f.active=1 and  f.FUNDRAISER_ID = ?", [id], (err, results) => {
        if (err) {
            console.error("Error retrieving fundraiser", err);
            res.status(500).send("Error while retrieving fundraiser");
        } else {
            res.json(results[0]);
        }
    });
});
// Add a new donation for a specific fundraiser
router.post("/fundraiser/:id/donate", (req, res) => {
    const { id } = req.params; // The fundraiser ID
    const { date, amount, giver } = req.body; // Donation details from request body

    // Validate required fields
    if (!date || !amount || !giver) {
        return res.status(400).send("Missing required donation fields: date, amount, giver.");
    }

    const donationData = {
        DATE: date,
        AMOUNT: amount,
        GIVER: giver,
        FUNDRAISER_ID: id
    };

    // Insert donation into the donation table
    connection.query("INSERT INTO donation SET ?", donationData, (err, results) => {
        if (err) {
            console.error("Error while inserting donation", err);
            res.status(500).send("Error while processing donation.");
        } else {
            // 获取当前筹款活动的名称
            connection.query("SELECT CAPTION FROM fundraiser WHERE FUNDRAISER_ID = ?", [id], (err, fundraiserResults) => {
                if (err) {
                    console.error("Error retrieving fundraiser name", err);
                    res.status(500).send("Error retrieving fundraiser name.");
                } else {
                    const fundraiserName = fundraiserResults[0].CAPTION;
                    // 返回成功消息以及筹款活动名称
                    res.status(201).send({ message: "Donation successful", fundraiserName: fundraiserName });
                }
            });
        }
    });
});

module.exports = router;

