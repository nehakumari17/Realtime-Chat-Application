const sendMessage = (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} = req.body
    } catch (error) {
        console.log("Error in sending messages..", error)
    }
}

module.exports = {
    sendMessage
}