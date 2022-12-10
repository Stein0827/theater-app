export const respondToEvent = async (req, res) => {
    try {
        console.log("***TEMP*** Movies Controller Event Received", req);
        res.status(200).send("success");
    }
    catch (err) {
        res.status(400).send(err);
    }
};
