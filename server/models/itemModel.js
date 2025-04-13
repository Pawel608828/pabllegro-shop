const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nazwa jest wymagana'],
        trim: true
    },
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: [true, 'Cena jest wymagana'],
        min: [0, 'Cena nie może być ujemna']
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.image;
            return ret;
        }
    }
});

module.exports = mongoose.model('Item', itemSchema);