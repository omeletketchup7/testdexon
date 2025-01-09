var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

const Info = require('./info');

const cmlSchema = Schema(
    {
        cml_number: Number,
        cml_description: String,
        actual_outside_diameter: Number,
        design_thickness: Number,
        structural_thickness: Number,
        required_thickness: Number,
        info_id: {
            type: Schema.Types.ObjectId,
            ref: 'infos',
        },
    },
    {
        collection: 'cmls',
    }
);

let Cml;

try {
    Cml = mongoose.model('cmls');
} catch (error) {
    Cml = mongoose.model('cmls', cmlSchema);
}

const insertCml = async (dataCml) => {
    const new_cml = new Cml({
        cml_number: dataCml.cml_number,
        cml_description: dataCml.cml_description,
        actual_outside_diameter: dataCml.actual_outside_diameter,
        design_thickness: dataCml.design_thickness,
        structural_thickness: dataCml.structural_thickness,
        required_thickness: dataCml.required_thickness,
        info_id: dataCml.info_id,

    });

    try {
        const data = await new_cml.save(); // Use await for saving
        return { message: 'insert CML successfully', data }; // You can include the saved data if needed
    } catch (err) {
        throw new Error('Cannot insert CML!!'); // Throw error if saving fails
    }
};

router.route('/ins').post((req, res) => {
    const payload = {
        cml_number: req.body.cml_number,
        cml_description: req.body.cml_description,
        actual_outside_diameter: req.body.actual_outside_diameter,
        design_thickness: req.body.design_thickness,
        structural_thickness: req.body.structural_thickness,
        required_thickness: req.body.required_thickness,
        info_id: req.body.info_id,
    };

    console.log(payload);

    insertCml(payload)
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err.message);
            console.log('at insert CML');
            res.status(500).json({ error: err.message });
        });
});


router.route('/all').get((req, res) => {
    Cml.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: 'Cannot fetch CML data!' });
        });
});


router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id; // Extract the ID from the request parameters

    try {
        const result = await Cml.findByIdAndDelete(id); // Find and delete the document by ID
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
        cml_number: req.body.cml_number,
        cml_description: req.body.cml_description,
        actual_outside_diameter: req.body.actual_outside_diameter,
        design_thickness: req.body.design_thickness,
        structural_thickness: req.body.structural_thickness,
        required_thickness: req.body.required_thickness,
        info_id: req.body.info_id,
    };

    try {
        const result = await Cml.findByIdAndUpdate(id, updatedData, { new: true }); // Update the document and return the updated version
        if (!result) {
            return res.status(404).json({ message: 'Data not found!' }); // If no document is found
        }
        res.status(200).json({ message: 'Data updated successfully!', data: result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update data!' }); // If an error occurs
    }
});

router.route('/get/:info_id').get(async (req, res) => {
    const infoId = req.params.info_id;

    try {
        // Find all CML documents that reference the info_id
        const cmls = await Cml.find({ info_id: infoId }).populate('info_id'); // Use populate to get related Info data

        if (!cmls || cmls.length === 0) {
            return res.status(404).json({ message: 'No CML data found for this Info ID!' });
        }

        res.status(200).json(cmls); // Return the CML data with populated Info data
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch CML data by Info ID!' });
    }
});
module.exports = router;
