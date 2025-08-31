import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            index: true,
        },
        shortName: {
            type: String,
            trim: true,
            maxlength: 10,
            uppercase: true,
        },
        branch: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        field: {
            type: String,
            required: true,
            enum: ['engineering', 'science', 'arts', 'commerce', 'management', 'law', 'medicine', 'pharmacy'],
            index: true,
        },

        // Academic Structure
        totalSemesters: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        degreeType: {
            type: String,
            required: true,
            enum: ['bachelor', 'master', 'doctorate', 'diploma', 'certificate'],
            index: true,
        },
        duration: {
            years: {
                type: Number,
                required: true,
                min: 1,
                max: 10,
            },
            months: {
                type: Number,
                default: 0,
                min: 0,
                max: 11,
            },
        },

        // College Reference
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
            index: true,
        },

        // Department Details
        departmentCode: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            maxlength: 2000,
        },
        vision: {
            type: String,
            default: "",
            maxlength: 1000,
        },
        mission: {
            type: String,
            default: "",
            maxlength: 1000,
        },

        // Head of Department
        hodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
            default: null,
            index: true,
        },

        // Capacity
        intake: {
            type: Number,
            required: true,
            min: 1,
        },

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'under-review'],
            default: 'active',
            index: true,
        },

        // Accreditation
        accreditation: {
            nba: {
                accredited: {
                    type: Boolean,
                    default: false,
                },
                validUntil: {
                    type: Date,
                    default: null,
                },
            },
            other: [{
                name: String,
                validUntil: Date,
            }],
        },
    },
    { 
        timestamps: true,
        collection: 'departments'
    }
);

// Compound indexes for performance optimization
departmentSchema.index({ collegeId: 1 });
departmentSchema.index({ departmentCode: 1, collegeId: 1 }, { unique: true });
departmentSchema.index({ field: 1 });
departmentSchema.index({ status: 1 });
departmentSchema.index({ hodId: 1 });
departmentSchema.index({ degreeType: 1 });

// Virtual for total duration in months
departmentSchema.virtual('totalDurationInMonths').get(function() {
    return (this.duration.years * 12) + this.duration.months;
});

// Virtual for department full name
departmentSchema.virtual('fullName').get(function() {
    return this.shortName ? `${this.name} (${this.shortName})` : this.name;
});

// Method to check if NBA accredited and valid
departmentSchema.methods.isNBAAccredited = function() {
    return this.accreditation.nba.accredited && 
           this.accreditation.nba.validUntil && 
           new Date() < this.accreditation.nba.validUntil;
};

// Method to get current semester for a given admission year
departmentSchema.methods.getCurrentSemester = function(admissionYear) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    
    const yearsPassed = currentYear - admissionYear;
    let semester = (yearsPassed * 2); // Assuming 2 semesters per year
    
    // If it's after June (semester starts), add 1
    if (currentMonth > 6) {
        semester += 1;
    }
    
    return Math.min(semester, this.totalSemesters);
};

// Static method to find departments by field
departmentSchema.statics.findByField = function(field) {
    return this.find({ 
        field: field,
        status: 'active'
    }).populate('collegeId', 'name shortName');
};

// Static method to find departments by college
departmentSchema.statics.findByCollege = function(collegeId) {
    return this.find({ 
        collegeId: collegeId,
        status: 'active'
    }).populate('hodId', 'userId employeeId designation');
};

// Pre-save middleware to generate departmentCode if not provided
departmentSchema.pre('save', function(next) {
    if (!this.departmentCode && this.shortName) {
        this.departmentCode = this.shortName.toUpperCase();
    }
    next();
});

export const Department = mongoose.model("Department", departmentSchema);
