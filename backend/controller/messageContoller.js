const conversationModel = require("../models/conversationModel")
const messageModel = require("../models/messageModel")

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} = req.body
        let getConversation = await conversationModel.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if (!getConversation) {
            getConversation = await conversationModel.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            getConversation.messages.push(newMessage._id)
        }
        await getConversation.save()

        return res.status(200).send({message: "Message send successfully!!"})

    } catch (error) {
        console.log("Error in sending messages..", error)
        res.status(400).send({message: "Error in sending messages"})
    }
}

const getMessage = async (req, res) => {
    try{
        const receiverId = req.params.id
        const senderId = req.id
        const conversation = await conversationModel.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages")
        res.status(200).send(conversation.messages)
    } catch(error) {
        console.log("Error in getting messages..", error)
        res.status(400).send({message: "Error in getting messages"})
    }
}

module.exports = {
    sendMessage,
    getMessage
}