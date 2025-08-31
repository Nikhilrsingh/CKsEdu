import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            index: true,
        },
        subjectCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            index: true,
        },

        // Academic Information
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            index: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
            index: true,
        },

        // Subject Details
        credits: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        subjectType: {
            type: String,
            enum: ['core', 'elective', 'lab', 'project', 'internship'],
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: ['theory', 'practical', 'both'],
            default: 'theory',
            index: true,
        },

        // Content Information
        syllabus: {
            type: String,
            default: "",
            maxlength: 5000,
        },
        description: {
            type: String,
            default: "",
            maxlength: 1000,
        },
        objectives: [{
            type: String,
            trim: true,
            maxlength: 500,
        }],
        outcomes: [{
            type: String,
            trim: true,
            maxlength: 500,
        }],

        // Prerequisites
        prerequisites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
        }],

        // Assessment
        assessment: {
            internal: {
                type: Number,
                min: 0,
                max: 100,
                default: 30,
            },
            external: {
                type: Number,
                min: 0,
                max: 100,
                default: 70,
            },
            practicalMarks: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
        },

        // Instructors
        instructors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
        }],

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'deprecated'],
            default: 'active',
            index: true,
        },
    },
    { 
        timestamps: true,
        collection: 'subjects'
    }
);

// Compound indexes for performance optimization
subjectSchema.index({ departmentId: 1 });
subjectSchema.index({ subjectCode: 1, departmentId: 1 }, { unique: true });
subjectSchema.index({ semester: 1 });
subjectSchema.index({ subjectType: 1 });
subjectSchema.index({ status: 1 });
subjectSchema.index({ category: 1 });

// Text index for search functionality
subjectSchema.index({ 
    name: 'text', 
    description: 'text', 
    syllabus: 'text' 
});

// Virtual for total marks
subjectSchema.virtual('totalMarks').get(function() {
    return this.assessment.internal + this.assessment.external + this.assessment.practicalMarks;
});

// Virtual for subject display name
subjectSchema.virtual('displayName').get(function() {
    return `${this.subjectCode} - ${this.name}`;
});

// Method to check if subject has practical component
subjectSchema.methods.hasPractical = function() {
    return this.category === 'practical' || this.category === 'both' || this.assessment.practicalMarks > 0;
};

// Method to check if subject is elective
subjectSchema.methods.isElective = function() {
    return this.subjectType === 'elective';
};

// Method to check if all prerequisites are met by a student
subjectSchema.methods.canStudentEnroll = async function(studentResults) {
    if (this.prerequisites.length === 0) {
        return true;
    }
    
    const passedSubjects = studentResults
        .filter(result => result.resultStatus === 'pass')
        .map(result => result.subjectResults)
        .flat()
        .filter(subjectResult => subjectResult.passed)
        .map(subjectResult => subjectResult.subjectId.toString());
    
    return this.prerequisites.every(prereq => 
        passedSubjects.includes(prereq.toString())
    );
};

// Static method to find subjects by semester and department
subjectSchema.statics.findBySemesterAndDepartment = function(semester, departmentId) {
    return this.find({ 
        semester: semester,
        departmentId: departmentId,
        status: 'active'
    }).populate('instructors', 'userId employeeId designation')
      .populate('prerequisites', 'name subjectCode');
};

// Static method to find elective subjects
subjectSchema.statics.findElectives = function(departmentId, semester) {
    return this.find({ 
        departmentId: departmentId,
        semester: semester,
        subjectType: 'elective',
        status: 'active'
    });
};

// Static method to find subjects by instructor
subjectSchema.statics.findByInstructor = function(professorId) {
    return this.find({ 
        instructors: professorId,
        status: 'active'
    }).populate('departmentId', 'name shortName');
};

// Pre-save middleware to validate assessment percentages
subjectSchema.pre('save', function(next) {
    const total = this.assessment.internal + this.assessment.external + this.assessment.practicalMarks;
    if (total !== 100) {
        return next(new Error('Assessment percentages must total 100'));
    }
    next();
});

export const Subject = mongoose.model("Subject", subjectSchema);
