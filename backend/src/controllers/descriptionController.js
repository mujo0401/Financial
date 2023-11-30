import descriptionRepository from '../repositories/descriptionRepository';

const getDescriptions = (req, res) => {
  try {
    const descriptions = descriptionRepository.getDescriptions();
    res.json(descriptions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching descriptions' });
  }
};

export default {
  getDescriptions,
};
