import {
    createPlaceService,
    updatePlaceService,
    getPlaceByIdService,
} from "../services/place.service.js";


export const creatPlace = async (req, res) => {

    const place = await createPlaceService(req.body);

    res.status(201).json(place);
};



export const updatePlace = async ( req, res) => {
    const place = await updatePlaceService(req.params.id, req.body);
    res.json(place);
};


export const getPlaceById = async (req, res) => {
    const place = await getPlaceByIdService(req.params.id);
    res.json(place);
};