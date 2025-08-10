import mongoose, { Schema } from "mongoose";

const professorSchema = new Schema(
    {
        // User Reference
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },

        // Personal Information
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer-not-to-say'],
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            match: /^[+]?[\d\s\-\(\)]+$/,
        },
        alternatePhoneNumber: {
            type: String,
            match: /^[+]?[\d\s\-\(\)]+$/,
        },

        // Address Information
        address: {
            street: {
                type: String,
                default: "",
            },
            city: {
                type: String,
                default: "",
            },
            state: {
                type: String,
                default: "",
            },
            postalCode: {
                type: String,
                default: "",
            },
            country: {
                type: String,
                default: "",
            },
        },

        // Professional Information
        employeeId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        designation: {
            type: String,
            required: true,
            enum: ['assistant-professor', 'associate-professor', 'professor', 'head-of-department', 'dean', 'visiting-faculty'],
            index: true,
        },
        qualification: {
            type: String,
            required: true,
        },
        specialization: [{
            type: String,
            default: [],
        }],

        // Projects (Reference to Project Schema)
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }],

        // Research Work (Reference to ResearchWork Schema)
        researchWork: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ResearchWork',
        }],

        // Experience
        experience: {
            totalYears: {
                type: Number,
                required: true,
                min: 0,
            },
            // Organizations (Reference to ExperienceOrganization Schema)
            organizations: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ExperienceOrganization',
            }],
        },

        // Academic Information
        subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject', // Will be created later
        }],
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: false, // Set to false initially as department schema will be created later
            default: null,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: false, // Set to false initially as college schema will be created later
            default: null,
        },

        // Professional Status
        status: {
            type: String,
            enum: ['active', 'on-leave', 'retired', 'terminated'],
            default: 'active',
            index: true,
        },
        joiningDate: {
            type: Date,
            required: true,
        },

        // Preferences
        preferences: {
            emailNotifications: {
                type: Boolean,
                default: true,
            },
            smsNotifications: {
                type: Boolean,
                default: false,
            },
            theme: {
                type: String,
                enum: ['light', 'dark', 'auto'],
                default: 'auto',
            },
        },
    },
    { timestamps: true }
);

// Indexes for performance optimization
professorSchema.index({ employeeId: 1 });
professorSchema.index({ collegeId: 1 });
professorSchema.index({ departmentId: 1 });
professorSchema.index({ designation: 1 });
professorSchema.index({ status: 1 });

export const Professor = mongoose.model("Professor", professorSchema);
