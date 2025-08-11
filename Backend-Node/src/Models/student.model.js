import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
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

        // Academic Information
        studentId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
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
        currentSemester: {
            type: Number,
            min: 1,
            max: 8,
            required: true,
        },
        admissionYear: {
            type: Number,
            required: true,
        },
        graduationYear: {
            type: Number,
            required: true,
        },

        // Academic Performance
        results: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result', // Will be created later
        }],
        overallCGPA: {
            type: Number,
            min: 0,
            max: 10,
            default: null,
        },

        // Emergency Contact
        emergencyContact: {
            name: {
                type: String,
                default: "",
            },
            relationship: {
                type: String,
                default: "",
            },
            phoneNumber: {
                type: String,
                default: "",
            },
            email: {
                type: String,
                default: "",
            },
        },

        // Academic Status
        status: {
            type: String,
            enum: ['active', 'graduated', 'suspended', 'dropped'],
            default: 'active',
            index: true,
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
studentSchema.index({ studentId: 1 });
studentSchema.index({ collegeId: 1 });
studentSchema.index({ departmentId: 1 });
studentSchema.index({ currentSemester: 1 });
studentSchema.index({ status: 1 });

export const Student = mongoose.model("Student", studentSchema);
