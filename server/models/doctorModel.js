import mongoose from "mongoose";

export const VISIT_TYPES = ["in person", "video"];

const avaliabilitySchema = new mongoose.Schema (
    {
        dayOfWeek: {type: Number, min:0 , max: 6, required: true},
        start: {type: String, required: true},
        end: {type: String, required: true},
    },
    {_id: false}
);

const timeOffSchema = new mongoose.Schema (
    {
        start: {type: String, required: true},
        end: {type: String, required: true},
        reason:{type: String, default: "", trim: true, maxlength: 200},
    },
    {_id: false}
);

const doctorSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', unique: true, sparse: true},
        name: {type: String, required: true, trim: true},
        specialty: {type: String, required: true, trim: true},
        bio: {type: String, default:'', trim: true},
        fee: {type: Number, required: true, min: 0, default: 5000},

        location:{type: String, default: '', trim: true, maxlength: 100},
        address: {type: String, default: '', trim: true, maxlength: 200},
        yearsExperience: {type: Number, min: 0, max: 70, default: 0},
        qualifications: {type: [{type: String, trim: true, maxlength: 100}], default: []},
        mdcnNumber: {type: String, trim: true, uppercase: true, default: '', select: false},
        visitTypes: {
            type:[{type: String, enum: VISIT_TYPES}],
            default: ['in_person'],
            validate: {validator: (v) => v.length > 0, message: 'Choose at least one visist type'},
        },
        timeOff: {type: [timeOffSchema], default: [] },

        rating: {
            average: {type:Number, default: 0, min: 0, max: 5},
            count: {type: Number, default: 0, min: 0},
        },
        approved: {type:Boolean, default: false},

        rejection: {
            reason: {type: String, trim: true, maxlength: 300},
            at: {type: Date},
        },
        availability: {type: [avaliabilitySchema], default: []},
        slotMinutes: {type: Number, default: 30, min: 10, max: 120},
    },
    {timestamps: true},
);

export default mongoose.model ('Doctor', doctorSchema);
