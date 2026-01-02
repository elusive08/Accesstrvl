import Place from "../models/place.model.js";
export const createPlaceService = (data) => {
    return Place.create(data);


};

export const updatePlaceService = (id, data) => {
    return  Place.findByIDandUpdate(id, data, {new: true});


};

export const getPlaceByIdService = (id) => {
    return Place.findById(id);
};