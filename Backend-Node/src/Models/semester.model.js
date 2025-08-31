import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema(
    {
        // Basic Information
        number: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        name: {
            type: String,
            trim: true,
            default: function() {
                return `Semester ${this.number}`;
            },
        },

        // Department Reference
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            index: true,
        },

        // Academic Structure
        subjects: [{
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                required: true,
            },
            isCore: {
                type: Boolean,
                default: true,
            },
            isElective: {
                type: Boolean,
                default: false,
            },
        }],

        // Semester Details
        totalCredits: {
            type: Number,
            required: true,
            min: 1,
        },
        minCreditsRequired: {
            type: Number,
            required: true,
            min: 1,
        },

        // Timeline
        duration: {
            months: {
                type: Number,
                default: 6,
                min: 1,
                max: 12,
            },
        },

        // Elective Groups
        electiveGroups: [{
            groupName: {
                type: String,
                required: true,
                trim: true,
            },
            minSelection: {
                type: Number,
                default: 1,
                min: 0,
            },
            maxSelection: {
                type: Number,
                default: 1,
                min: 1,
            },
            subjects: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
            }],
        }],

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'under-revision'],
            default: 'active',
            index: true,
        },
    },
    { 
        timestamps: true,
        collection: 'semesters'
    }
);

// Compound indexes for performance optimization
semesterSchema.index({ departmentId: 1, number: 1 }, { unique: true });
semesterSchema.index({ status: 1 });

// Virtual for core subjects count
semesterSchema.virtual('coreSubjectsCount').get(function() {
    return this.subjects.filter(subject => subject.isCore).length;
});

// Virtual for elective subjects count  
semesterSchema.virtual('electiveSubjectsCount').get(function() {
    return this.subjects.filter(subject => subject.isElective).length;
});

// Virtual for total elective groups
semesterSchema.virtual('totalElectiveGroups').get(function() {
    return this.electiveGroups.length;
});

// Method to get core subjects
semesterSchema.methods.getCoreSubjects = function() {
    return this.subjects
        .filter(subject => subject.isCore)
        .map(subject => subject.subjectId);
};

// Method to get elective subjects
semesterSchema.methods.getElectiveSubjects = function() {
    return this.subjects
        .filter(subject => subject.isElective)
        .map(subject => subject.subjectId);
};

// Method to check if minimum credits requirement is met
semesterSchema.methods.isMinCreditsValid = function() {
    return this.minCreditsRequired <= this.totalCredits;
};

// Method to validate elective group selections for a student
semesterSchema.methods.validateElectiveSelections = function(selectedSubjects) {
    for (const group of this.electiveGroups) {
        const selectedFromGroup = selectedSubjects.filter(subjectId =>
            group.subjects.some(groupSubject => 
                groupSubject.toString() === subjectId.toString()
            )
        );

        if (selectedFromGroup.length < group.minSelection || 
            selectedFromGroup.length > group.maxSelection) {
            return {
                valid: false,
                message: `Invalid selection for elective group "${group.groupName}". Select between ${group.minSelection} and ${group.maxSelection} subjects.`,
                group: group.groupName
            };
        }
    }

    return { valid: true };
};

// Static method to find semester by department and number
semesterSchema.statics.findByDepartmentAndNumber = function(departmentId, number) {
    return this.findOne({ 
        departmentId: departmentId,
        number: number,
        status: 'active'
    }).populate('subjects.subjectId', 'name subjectCode credits subjectType')
      .populate('electiveGroups.subjects', 'name subjectCode credits');
};

// Static method to find all semesters for a department
semesterSchema.statics.findByDepartment = function(departmentId) {
    return this.find({ 
        departmentId: departmentId,
        status: 'active'
    }).sort({ number: 1 })
      .populate('subjects.subjectId', 'name subjectCode credits subjectType');
};

// Pre-save middleware to validate credits
semesterSchema.pre('save', function(next) {
    if (this.minCreditsRequired > this.totalCredits) {
        return next(new Error('Minimum credits required cannot be greater than total credits'));
    }

    // Validate elective groups
    for (const group of this.electiveGroups) {
        if (group.minSelection > group.maxSelection) {
            return next(new Error(`Invalid elective group "${group.groupName}": minimum selection cannot be greater than maximum selection`));
        }
    }

    next();
});

export const Semester = mongoose.model("Semester", semesterSchema);
