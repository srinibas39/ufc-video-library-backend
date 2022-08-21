const historyModel = require("../model/history.model");
const { v4: uuidv4 } = require('uuid');

const addHistory = async (req, res) => {
    const videoItem = req.body;
    const { userId } = req.params;
    const newHistory = new historyModel({ ...videoItem, userId })

    newHistory.save()
        .then(async (savedItem) => {
            const history = await historyModel.find({ userId: userId })
            res.json({ data: { history: history.slice(0).reverse() } })
        })
        .catch(async (error) => {
            const historyDelete = await historyModel.findOneAndDelete({ _id: videoItem._id })
            newHistory.save()
                .then(async (savedItem) => {

                    const history = await historyModel.find({ userId: userId })
                    res.json({ data: { history: history.slice(0).reverse() } })
                })



        })
}

const removeHistory = async (req, res) => {
    const { userId, videoId } = req.params;
    try {
        const videoItem = await historyModel.findOneAndDelete({ userId: userId, _id: videoId })
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
    catch (error) {
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
}

const getAllHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await historyModel.find({ userId: userId })
        res.json({ data: { history: history.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

const removeAllHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await historyModel.deleteMany({ userId: userId })
        res.json({ data: { history: [] } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

module.exports = { addHistory, removeHistory, getAllHistory, removeAllHistory }