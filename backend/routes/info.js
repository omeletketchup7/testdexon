var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require('mongoose').Schema;
const infoSchema = Schema(
    {
        line_number: String,
        location: String,
        from: String,
        to: String,
        drawing_number: String,
        service: String,
        material: String,
        inservice_date: Date,
        pipe_size: Number,
        original_thickness: Number,
        stress: Number,
        joint_efficiency: Number,
        ca: Number,
        design_life: Number,
        design_pressure: Number,
        operating_pressure: Number,
        design_temperature: Number,
        operating_temperature: Number,
    },
    {
        collection: 'infos',
    }
);

let Info;

try {
    Info = mongoose.model('infos');
} catch (error) {
    Info = mongoose.model('infos', infoSchema);
}

const insertInfo = async (dataInfo) => {
    const new_info = new Info({
        line_number: dataInfo.line_number,
        location: dataInfo.location,
        from: dataInfo.from,
        to: dataInfo.to,
        drawing_number: dataInfo.drawing_number,
        service: dataInfo.service,
        material: dataInfo.material,
        inservice_date: dataInfo.inservice_date,
        pipe_size: dataInfo.pipe_size,
        original_thickness: dataInfo.original_thickness,
        stress: dataInfo.stress,
        joint_efficiency: dataInfo.joint_efficiency,
        ca: dataInfo.ca,
        design_life: dataInfo.design_life,
        design_pressure: dataInfo.design_pressure,
        operating_pressure: dataInfo.operating_pressure,
        design_temperature: dataInfo.design_temperature,
        operating_temperature: dataInfo.operating_temperature,
    });

    try {
        const data = await new_info.save(); // Use await for saving
        return { message: 'insert info successfully', data }; // You can include the saved data if needed
    } catch (err) {
        throw new Error('Cannot insert info!!'); // Throw error if saving fails
    }
};

router.route('/ins').post((req, res) => {
    const payload = {
        line_number: req.body.line_number,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        drawing_number: req.body.drawing_number,
        service: req.body.service,
        material: req.body.material,
        inservice_date: req.body.inservice_date,
        pipe_size: req.body.pipe_size,
        original_thickness: req.body.original_thickness,
        stress: req.body.stress,
        joint_efficiency: req.body.joint_efficiency,
        ca: req.body.ca,
        design_life: req.body.design_life,
        design_pressure: req.body.design_pressure,
        operating_pressure: req.body.operating_pressure,
        design_temperature: req.body.design_temperature,
        operating_temperature: req.body.operating_temperature,
    };

    console.log(payload);

    insertInfo(payload)
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err.message);
            console.log('at insert');
            res.status(500).json({ error: err.message });
        });
});


router.route('/all').get((req, res) => {
    Info.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: 'Cannot fetch data!' });
        });
});


router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id; // Extract the ID from the request parameters

    try {
        const result = await Info.findByIdAndDelete(id); // Find and delete the document by ID
        if (!result) {
            return res.status(404).json({ message: 'Data not found!' }); // If no document is found
        }
        res.status(200).json({ message: 'Data deleted successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete data!' }); // If an error occurs
    }
});

router.route('/update/:id').put(async (req, res) => {
    const id = req.params.id; // Extract the ID from the request parameters
    const updatedData = {
        line_number: req.body.line_number,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        drawing_number: req.body.drawing_number,
        service: req.body.service,
        material: req.body.material,
        inservice_date: req.body.inservice_date,
        pipe_size: req.body.pipe_size,
        original_thickness: req.body.original_thickness,
        stress: req.body.stress,
        joint_efficiency: req.body.joint_efficiency,
        ca: req.body.ca,
        design_life: req.body.design_life,
        design_pressure: req.body.design_pressure,
        operating_pressure: req.body.operating_pressure,
        design_temperature: req.body.design_temperature,
        operating_temperature: req.body.operating_temperature,
    };

    try {
        const result = await Info.findByIdAndUpdate(id, updatedData, { new: true }); // Update the document and return the updated version
        if (!result) {
            return res.status(404).json({ message: 'Data not found!' }); // If no document is found
        }
        res.status(200).json({ message: 'Data updated successfully!', data: result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update data!' }); // If an error occurs
    }
});
module.exports = router;
