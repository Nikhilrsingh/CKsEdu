import mongoose, { Schema } from "mongoose";

const experienceOrganizationSchema = new Schema(
    {
        // Professor Reference
        professorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
            required: true,
            index: true,
        },

        // Organization Information
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },
        type: {
            type: String,
            enum: ['educational', 'corporate', 'government', 'ngo', 'research', 'startup', 'other'],
            default: 'educational',
            index: true,
        },
        industry: {
            type: String,
            default: "",
            trim: true,
            maxlength: 100,
        },
        
        // Position Details
        position: {
            type: String,
            default: "",
            trim: true,
            maxlength: 100,
        },
        department: {
            type: String,
            default: "",
            trim: true,
            maxlength: 100,
        },
        level: {
            type: String,
            enum: ['entry', 'junior', 'mid', 'senior', 'executive', 'director'],
            default: 'mid',
        },

        // Duration
        startDate: {
            type: Date,
            default: null,
            index: true,
        },
        endDate: {
            type: Date,
            default: null,
        },
        isCurrentPosition: {
            type: Boolean,
            default: false,
            index: true,
        },

        // Job Details
        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 2000,
        },
        responsibilities: [{
            type: String,
            trim: true,
            maxlength: 500,
        }],
        achievements: [{
            type: String,
            trim: true,
            maxlength: 500,
        }],
        skills: [{
            type: String,
            trim: true,
            lowercase: true,
        }],

        // Location
        location: {
            city: {
                type: String,
                default: "",
                trim: true,
            },
            state: {
                type: String,
                default: "",
                trim: true,
            },
            country: {
                type: String,
                default: "",
                trim: true,
            },
        },

        // Employment Type
        employmentType: {
            type: String,
            enum: ['full-time', 'part-time', 'contract', 'internship', 'consulting', 'visiting'],
            default: 'full-time',
        },

        // Verification
        verified: {
            type: Boolean,
            default: false,
        },
        verificationDocument: {
            type: String,
            default: "",
        },

        // Contact Information (if still connected)
        contactPerson: {
            name: {
                type: String,
                default: "",
                trim: true,
            },
            position: {
                type: String,
                default: "",
                trim: true,
            },
            email: {
                type: String,
                default: "",
                trim: true,
                lowercase: true,
            },
            phone: {
                type: String,
                default: "",
                trim: true,
            },
        },

        // Organization Details
        organizationSize: {
            type: String,
            enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
            default: 'medium',
        },
        website: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { 
        timestamps: true,
        collection: 'experienceorganizations'
    }
);

// Indexes for performance optimization
experienceOrganizationSchema.index({ professorId: 1 });
experienceOrganizationSchema.index({ startDate: -1 });
experienceOrganizationSchema.index({ isCurrentPosition: 1 });
experienceOrganizationSchema.index({ type: 1 });
experienceOrganizationSchema.index({ employmentType: 1 });

// Text index for search functionality
experienceOrganizationSchema.index({ 
    name: 'text', 
    position: 'text',
    description: 'text',
    industry: 'text'
});

// Virtual for experience duration
experienceOrganizationSchema.virtual('duration').get(function() {
    const startDate = this.startDate;
    const endDate = this.isCurrentPosition ? new Date() : this.endDate;
    
    if (!startDate) return null;
    if (!endDate) return null;
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    return {
        days: diffDays,
        months: months + (years * 12),
        years: years,
        displayText: years > 0 ? `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`
    };
});

// Virtual for full location
experienceOrganizationSchema.virtual('fullLocation').get(function() {
    const parts = [];
    if (this.location.city) parts.push(this.location.city);
    if (this.location.state) parts.push(this.location.state);
    if (this.location.country) parts.push(this.location.country);
    return parts.join(', ');
});

// Virtual for is recent experience (within last 5 years)
experienceOrganizationSchema.virtual('isRecent').get(function() {
    if (!this.startDate) return false;
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    return this.startDate >= fiveYearsAgo;
});

// Method to calculate experience in months
experienceOrganizationSchema.methods.getExperienceInMonths = function() {
    const startDate = this.startDate;
    const endDate = this.isCurrentPosition ? new Date() : this.endDate;
    
    if (!startDate || !endDate) return 0;
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.floor(diffDays / 30);
};

// Method to check if experience overlaps with another experience
experienceOrganizationSchema.methods.overlapsWith = function(otherExperience) {
    const thisStart = this.startDate;
    const thisEnd = this.isCurrentPosition ? new Date() : this.endDate;
    const otherStart = otherExperience.startDate;
    const otherEnd = otherExperience.isCurrentPosition ? new Date() : otherExperience.endDate;
    
    if (!thisStart || !thisEnd || !otherStart || !otherEnd) return false;
    
    return thisStart <= otherEnd && otherStart <= thisEnd;
};

// Method to mark as current position
experienceOrganizationSchema.methods.setAsCurrent = function() {
    this.isCurrentPosition = true;
    this.endDate = null;
    return this.save();
};

// Method to end current position
experienceOrganizationSchema.methods.endPosition = function(endDate = new Date()) {
    this.isCurrentPosition = false;
    this.endDate = endDate;
    return this.save();
};

// Static method to find experiences by professor
experienceOrganizationSchema.statics.findByProfessor = function(professorId, includeRoles = true) {
    const query = { professorId };
    
    return this.find(query)
        .sort({ startDate: -1, isCurrentPosition: -1 });
};

// Static method to find current positions
experienceOrganizationSchema.statics.findCurrentPositions = function(professorId = null) {
    const query = { isCurrentPosition: true };
    if (professorId) query.professorId = professorId;
    
    return this.find(query)
        .populate('professorId', 'userId employeeId designation');
};

// Static method to calculate total experience for a professor
experienceOrganizationSchema.statics.getTotalExperience = function(professorId) {
    return this.find({ professorId })
        .then(experiences => {
            let totalMonths = 0;
            
            experiences.forEach(exp => {
                const months = exp.getExperienceInMonths();
                totalMonths += months;
            });
            
            const years = Math.floor(totalMonths / 12);
            const remainingMonths = totalMonths % 12;
            
            return {
                totalMonths,
                years,
                months: remainingMonths,
                displayText: `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
            };
        });
};

// Pre-save middleware to validate dates and current position
experienceOrganizationSchema.pre('save', function(next) {
    // Validate dates
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
        return next(new Error('Start date cannot be after end date'));
    }
    
    // If current position, endDate should be null
    if (this.isCurrentPosition) {
        this.endDate = null;
    }
    
    // If endDate is provided, isCurrentPosition should be false
    if (this.endDate) {
        this.isCurrentPosition = false;
    }
    
    next();
});

// Post-save middleware to update professor's total experience
experienceOrganizationSchema.post('save', async function() {
    try {
        const Professor = mongoose.model('Professor');
        const totalExp = await this.constructor.getTotalExperience(this.professorId);
        
        await Professor.findByIdAndUpdate(
            this.professorId,
            { 'experience.totalYears': totalExp.years }
        );
    } catch (error) {
        console.error('Error updating professor total experience:', error);
    }
});

export const ExperienceOrganization = mongoose.model("ExperienceOrganization", experienceOrganizationSchema);
