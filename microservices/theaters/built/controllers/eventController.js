export const respondToEvent = async (req, res) => {
    try {
        console.log("***TEMP*** Theaters Controller Event Received", req.body);
        res.status(200).send("success");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
