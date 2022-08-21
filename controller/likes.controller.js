const likesModel = require("../model/likes.model");
const { v4: uuidv4 } = require('uuid');

const addLikes = async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;
    const newLikes = new likesModel({ ...videoItem, userId })

    newLikes.save()
        .then(async (savedItem) => {
            const likes = await likesModel.find({ userId: userId })
            res.json({ data: { likes: likes.slice(0).reverse() } })
        })
        .catch(async (error) => {
            res.json({ message: error })
        })
}

const removeLikes = async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const likeItem = await likesModel.findOneAndDelete({ userId: userId, _id: videoId })
        const likes = await likesModel.find({ userId })
        res.json({ data: { likes: likes.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

const getAllLikes = async (req, res) => {
    const { userId } = req.params;
    try {
        const likes = await likesModel.find({ userId });
        res.json({ data: { likes: likes.slice(0).reverse() } });
    }
    catch (err) {
        res.json({ message: err });
    }
}

const removeAllLikes = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedLikes = await likesModel.deleteMany({ userId });
        res.json({ data: { likes: [] } });
    }
    catch (error) {
        res.json({ message: error })
    }
}


module.exports = { addLikes, removeLikes, getAllLikes, removeAllLikes }


