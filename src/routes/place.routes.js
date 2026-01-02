import express from "express";

import {
    creatPlace,
    updatePlace,
    getPlaceById
} from "../controllers/place.controller.js";

const router = express.Router();

router.post("/places/create", creatPlace);
router.put("/places/update/:id", updatePlace);
router.get("/places/:id", getPlaceById);

export default router;