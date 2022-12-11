export const respondToEvent = async (req, res) => {
    try {
        res.status(200).send("success");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
