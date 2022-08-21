const { v4: uuidv4 } = require('uuid');
const watchlaterModel = require('../model/watchlater.model');

const addWatchlater = async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;

    const newWatchlater = new watchlaterModel({ ...videoItem, userId })

    newWatchlater.save()
        .then(async (savedItem) => {
            const watchlater = await watchlaterModel.find({ userId: userId })
            res.json({ data: { watchlater: watchlater.slice(0).reverse() } })
        })
        .catch(async (error) => {
            res.json({ message: error })
        })
}

const removeWatchlater = async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const likeItem = await watchlaterModel.findOneAndDelete({ userId: userId, _id: videoId })
        const likes = await watchlaterModel.find({ userId })
        res.json({ data: { likes: likes.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

const getAllWatchlater = async (req, res) => {
    const { userId } = req.params;
    try {
        const watchlater = await watchlaterModel.find({ userId });
        res.json({ data: { watchlater: watchlater.slice(0).reverse() } });
    }
    catch (err) {
        res.json({ message: err });
    }
}

const removeAllWatchlater = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedWatchlater = await watchlaterModel.deleteMany({ userId });
        res.json({ data: { watchlater: [] } });
    }
    catch (error) {
        res.json({ message: error })
    }
}

module.exports = { addWatchlater, removeWatchlater, getAllWatchlater, removeAllWatchlater }