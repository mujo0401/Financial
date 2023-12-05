import Description from '../models/descriptionModel.js'; 

const getDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.find({});
    res.json(descriptions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching descriptions' });
  }
};

export default {
  getDescriptions,
};
