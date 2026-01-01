import AccessibilityProfile from "../models/AccessibilityProfile.js";

export const createProfile = async (req, res) => {
  try {
    const existing = await AccessibilityProfile.findOne({
      user: req.user.id
    });

    if (existing) {
      return res.status(400).json({
        message: "Accessibility profile already exists"
      });
    }
    
    
    export const getProfile = async (req, res) => {
  try {
    const profile = await AccessibilityProfile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({
        message: "Accessibility profile not found"
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const profile = await AccessibilityProfile.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        message: "Accessibility profile not found"
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








    
    

    const profile = await AccessibilityProfile.create({
      user: req.user.id,
      ...req.body
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};