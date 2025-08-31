import mongoose, { Schema } from "mongoose";

const collegeSchema = new Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },
        shortName: {
            type: String,
            trim: true,
            maxlength: 20,
        },
        university: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },

        // Contact Information
        contactInfo: {
            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },
            phone: {
                type: String,
                required: true,
                match: /^[+]?[\d\s\-\(\)]+$/,
            },
            website: {
                type: String,
                default: "",
            },
            fax: {
                type: String,
                default: "",
            },
        },

        // Address
        address: {
            street: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            postalCode: {
                type: String,
                required: true,
                trim: true,
            },
            country: {
                type: String,
                required: true,
                default: 'India',
                trim: true,
            },
        },

        // Institutional Details
        establishedYear: {
            type: Number,
            required: true,
            min: 1800,
            max: new Date().getFullYear(),
        },
        collegeType: {
            type: String,
            enum: ['government', 'private', 'autonomous', 'deemed'],
            required: true,
            index: true,
        },
        affiliation: {
            type: String,
            required: true,
            trim: true,
        },
        accreditation: {
            naac: {
                grade: {
                    type: String,
                    enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C'],
                    default: null,
                },
                score: {
                    type: Number,
                    min: 0,
                    max: 4,
                    default: null,
                },
                validUntil: {
                    type: Date,
                    default: null,
                },
            },
            nba: {
                courses: [{
                    type: String,
                    trim: true,
                }],
                validUntil: {
                    type: Date,
                    default: null,
                },
            },
        },

        // Administrative
        collegeCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            index: true,
        },
        logo: {
            type: String,
            default: "",
        },

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'under-review'],
            default: 'active',
            index: true,
        },

        // Platform Settings
        platformSettings: {
            allowStudentRegistration: {
                type: Boolean,
                default: true,
            },
            allowProfessorRegistration: {
                type: Boolean,
                default: false,
            },
            requireAdminApproval: {
                type: Boolean,
                default: true,
            },
        },
    },
    { 
        timestamps: true,
        collection: 'colleges'
    }
);

// Indexes for performance optimization
collegeSchema.index({ name: 1 });
collegeSchema.index({ collegeCode: 1 }, { unique: true });
collegeSchema.index({ university: 1 });
collegeSchema.index({ status: 1 });
collegeSchema.index({ collegeType: 1 });

// Virtual for full address
collegeSchema.virtual('fullAddress').get(function() {
    const addr = this.address;
    return `${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}, ${addr.country}`;
});

// Method to check if college is accredited by NAAC
collegeSchema.methods.isNAACAccredited = function() {
    return this.accreditation.naac.grade && 
           this.accreditation.naac.validUntil && 
           new Date() < this.accreditation.naac.validUntil;
};

// Method to check if specific course is NBA accredited
collegeSchema.methods.isNBAAccredited = function(courseName) {
    return this.accreditation.nba.courses.includes(courseName) &&
           this.accreditation.nba.validUntil &&
           new Date() < this.accreditation.nba.validUntil;
};

// Static method to find colleges by university
collegeSchema.statics.findByUniversity = function(universityName) {
    return this.find({ 
        university: { $regex: universityName, $options: 'i' },
        status: 'active'
    });
};

export const College = mongoose.model("College", collegeSchema);
