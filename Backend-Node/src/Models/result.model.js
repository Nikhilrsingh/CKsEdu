import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
    {
        // Academic Information
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
            index: true,
        },
        academicYear: {
            type: String,
            required: true,
            match: /^\d{4}-\d{4}$/,
            index: true,
        },

        // Performance Metrics
        cgpa: {
            type: Number,
            min: 0,
            max: 10,
            required: true,
        },
        sgpa: {
            type: Number,
            min: 0,
            max: 10,
            required: true,
        },
        percentage: {
            type: Number,
            min: 0,
            max: 100,
            default: null,
        },

        // Subject-wise Marks
        subjectResults: [{
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                required: true,
            },
            internalMarks: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
            externalMarks: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
            practicalMarks: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
            totalMarks: {
                type: Number,
                min: 0,
                max: 100,
                required: true,
            },
            grade: {
                type: String,
                enum: ['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'AB'],
                required: true,
            },
            gradePoints: {
                type: Number,
                min: 0,
                max: 10,
                required: true,
            },
            credits: {
                type: Number,
                required: true,
                min: 1,
            },
            passed: {
                type: Boolean,
                required: true,
            },
        }],

        // References
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
            index: true,
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
            index: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
            index: true,
        },

        // Result Status
        resultStatus: {
            type: String,
            enum: ['pass', 'fail', 'pending', 'withheld'],
            required: true,
            index: true,
        },

        // Additional Information
        totalCreditsEarned: {
            type: Number,
            required: true,
            min: 0,
        },
        totalCreditsAttempted: {
            type: Number,
            required: true,
            min: 0,
        },
        backlogs: {
            count: {
                type: Number,
                default: 0,
                min: 0,
            },
            subjects: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
            }],
        },

        // Publication Details
        publishedDate: {
            type: Date,
            required: true,
            index: true,
        },
        resultType: {
            type: String,
            enum: ['regular', 'supplementary', 'improvement'],
            default: 'regular',
            index: true,
        },

        // Verification
        verified: {
            type: Boolean,
            default: false,
            index: true,
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
            default: null,
        },
        verificationDate: {
            type: Date,
            default: null,
        },
    },
    { 
        timestamps: true,
        collection: 'results'
    }
);

// Compound indexes for performance optimization
resultSchema.index({ studentId: 1, semester: 1, academicYear: 1 }, { unique: true });
resultSchema.index({ collegeId: 1 });
resultSchema.index({ departmentId: 1 });
resultSchema.index({ resultStatus: 1 });
resultSchema.index({ publishedDate: -1 });
resultSchema.index({ verified: 1 });

// Virtual for pass percentage
resultSchema.virtual('passPercentage').get(function() {
    const totalSubjects = this.subjectResults.length;
    const passedSubjects = this.subjectResults.filter(result => result.passed).length;
    return totalSubjects > 0 ? (passedSubjects / totalSubjects) * 100 : 0;
});

// Virtual for distinction status
resultSchema.virtual('hasDistinction').get(function() {
    return this.percentage >= 75 || this.cgpa >= 8.5;
});

// Virtual for first class status
resultSchema.virtual('isFirstClass').get(function() {
    return this.percentage >= 60 || this.cgpa >= 6.5;
});

// Method to calculate SGPA from subject results
resultSchema.methods.calculateSGPA = function() {
    const totalGradePoints = this.subjectResults.reduce((sum, result) => {
        return sum + (result.gradePoints * result.credits);
    }, 0);
    
    const totalCredits = this.subjectResults.reduce((sum, result) => {
        return sum + result.credits;
    }, 0);
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
};

// Method to get failed subjects
resultSchema.methods.getFailedSubjects = function() {
    return this.subjectResults
        .filter(result => !result.passed)
        .map(result => result.subjectId);
};

// Method to get grade point for a specific grade
resultSchema.statics.getGradePoints = function(grade) {
    const gradeMapping = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C+': 5,
        'C': 4,
        'D': 3,
        'F': 0,
        'AB': 0
    };
    return gradeMapping[grade] || 0;
};

// Method to determine grade from marks
resultSchema.statics.getGradeFromMarks = function(marks) {
    if (marks >= 90) return 'O';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 55) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 45) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
};

// Static method to find results by student
resultSchema.statics.findByStudent = function(studentId) {
    return this.find({ studentId: studentId })
        .sort({ semester: 1, academicYear: 1 })
        .populate('subjectResults.subjectId', 'name subjectCode credits')
        .populate('verifiedBy', 'userId employeeId');
};

// Static method to find results by semester and academic year
resultSchema.statics.findBySemesterAndYear = function(semester, academicYear, departmentId) {
    const query = { semester, academicYear };
    if (departmentId) query.departmentId = departmentId;
    
    return this.find(query)
        .populate('studentId', 'userId studentId')
        .populate('subjectResults.subjectId', 'name subjectCode');
};

// Pre-save middleware to calculate backlogs
resultSchema.pre('save', function(next) {
    // Calculate backlogs
    const failedSubjects = this.subjectResults.filter(result => !result.passed);
    this.backlogs.count = failedSubjects.length;
    this.backlogs.subjects = failedSubjects.map(result => result.subjectId);
    
    // Set result status based on backlogs
    if (this.backlogs.count === 0) {
        this.resultStatus = 'pass';
    } else if (this.resultStatus !== 'pending' && this.resultStatus !== 'withheld') {
        this.resultStatus = 'fail';
    }
    
    // Calculate percentage from CGPA if not provided
    if (!this.percentage && this.cgpa) {
        this.percentage = (this.cgpa * 10).toFixed(2);
    }
    
    next();
});

export const Result = mongoose.model("Result", resultSchema);
