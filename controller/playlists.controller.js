const playlistsModel = require("../model/playlists.model");
const { v4: uuidv4 } = require('uuid');

const addPlaylist = async (req, res) => {
    const playlist = req.body;
    const { userId } = req.params;
    const newPlaylist = new playlistsModel({ ...playlist, _id: uuidv4(), userId })
    newPlaylist.save()
        .then(async (savedPlaylist) => {
            const playlists = await playlistsModel.find({ userId })
            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        })
        .catch((error) => {
            res.json({
                message: error
            })
        })
}

const addVideosPlaylist = async (req, res) => {
    const video = req.body;
    const { playlistId, userId } = req.params;
    try {
        const playlist = await playlistsModel.findOne({ _id: playlistId });
        const updatePlaylist = await playlistsModel.updateOne({ _id: playlistId }, { videos: [...playlist.videos, video] })
        // const updatePlaylist=await playlistsModel.updateOne({videos:[]})
        const playlists = await playlistsModel.find({ userId: userId })
        res.json({ data: { playlists: playlists.slice(0).reverse() } })


    }
    catch (error) {
        res.json({ message: error })
    }
}

const removePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await playlistsModel.findOneAndDelete({ _id: playlistId });
        const playlists = await playlistsModel.find({ userId: deletedPlaylist.userId })
        if (playlists.length) {

            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        }
        else {
            res.json({ data: { playlists: [] } })
        }

    }
    catch (error) {
        res.json({ message: error })
    }
}

const removeVideosPlaylist = async (req, res) => {
    const { playlistId, videoId } = req.params;
    try {
        const playlist = await playlistsModel.findOne({ _id: playlistId });
        if (playlist.videos.length) {
            const videos = playlist.videos.filter((vid) => vid._id !== videoId);
            const updatedPlaylist = await playlistsModel.findOneAndUpdate({ _id: playlistId }, { videos })
        }
        const playlists = await playlistsModel.find({ userId: playlist.userId })
        if (playlists.length) {

            res.json({ data: { playlists: playlists.slice(0).reverse() } })
        }
        else {
            res.json({ data: { playlists: [] } })
        }

    }
    catch (error) {
        res.json({ message: error })
    }
}

const getAllPlaylist = async (req, res) => {
    const { userId } = req.params;
    try {
        const playlists = await playlistsModel.find({ userId })
        res.json({ data: { playlists: playlists.slice(0).reverse() } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

const removeAllPlaylist = async (req, res) => {
    const { userId } = req.params;
    try {
        const playlists = await playlistsModel.deleteMany({ userId })
        res.json({ data: { playlists: [] } })
    }
    catch (error) {
        res.json({ message: error })
    }
}

module.exports = { addPlaylist, addVideosPlaylist, removePlaylist, removeVideosPlaylist, getAllPlaylist, removePlaylist, removeAllPlaylist }