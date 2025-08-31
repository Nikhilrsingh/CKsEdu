import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        // Professor Reference
        professorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
            required: true,
            index: true,
        },

        // Project Information
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 2000,
        },
        status: {
            type: String,
            enum: ['ongoing', 'completed', 'on-hold', 'cancelled'],
            default: 'ongoing',
            index: true,
        },
        startDate: {
            type: Date,
            default: null,
            index: true,
        },
        endDate: {
            type: Date,
            default: null,
        },
        fundingAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        fundingAgency: {
            type: String,
            default: "",
            trim: true,
        },
        collaborators: [{
            name: {
                type: String,
                required: true,
                trim: true,
            },
            institution: {
                type: String,
                default: "",
                trim: true,
            },
            role: {
                type: String,
                default: "",
                trim: true,
            },
        }],
        tags: [{
            type: String,
            trim: true,
            lowercase: true,
        }],

        // Project Category
        category: {
            type: String,
            enum: ['research', 'development', 'consultancy', 'industrial', 'government', 'academic'],
            default: 'research',
            index: true,
        },
        domain: {
            type: String,
            default: "",
            trim: true,
        },

        // Deliverables and Outcomes
        deliverables: [{
            title: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                default: "",
                trim: true,
            },
            dueDate: Date,
            status: {
                type: String,
                enum: ['pending', 'in-progress', 'completed', 'delayed'],
                default: 'pending',
            },
        }],
        outcomes: [{
            type: String,
            trim: true,
        }],

        // Publications from this project
        publications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ResearchWork',
        }],

        // Project Team (Students involved)
        studentTeam: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
            role: {
                type: String,
                default: "Research Assistant",
                trim: true,
            },
            joinDate: {
                type: Date,
                default: Date.now,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        }],

        // External Links and Resources
        resources: [{
            title: {
                type: String,
                required: true,
                trim: true,
            },
            url: {
                type: String,
                required: true,
                trim: true,
            },
            type: {
                type: String,
                enum: ['document', 'website', 'repository', 'presentation', 'video'],
                default: 'document',
            },
        }],
    },
    { 
        timestamps: true,
        collection: 'projects'
    }
);

// Indexes for performance optimization
projectSchema.index({ professorId: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ startDate: -1 });

// Text index for search functionality
projectSchema.index({ 
    title: 'text', 
    description: 'text',
    domain: 'text',
    tags: 'text'
});

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
    if (!this.startDate) return null;
    
    const endDate = this.endDate || new Date();
    const diffTime = Math.abs(endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
        days: diffDays,
        months: Math.floor(diffDays / 30),
        years: Math.floor(diffDays / 365)
    };
});

// Virtual for completion percentage
projectSchema.virtual('completionPercentage').get(function() {
    if (this.deliverables.length === 0) return 0;
    
    const completedDeliverables = this.deliverables.filter(d => d.status === 'completed').length;
    return Math.round((completedDeliverables / this.deliverables.length) * 100);
});

// Virtual for active team members count
projectSchema.virtual('activeTeamMembersCount').get(function() {
    return this.studentTeam.filter(member => member.isActive).length;
});

// Method to check if project is overdue
projectSchema.methods.isOverdue = function() {
    return this.endDate && new Date() > this.endDate && this.status !== 'completed';
};

// Method to get pending deliverables
projectSchema.methods.getPendingDeliverables = function() {
    return this.deliverables.filter(d => d.status === 'pending' || d.status === 'in-progress');
};

// Method to add team member
projectSchema.methods.addTeamMember = function(studentId, role = "Research Assistant") {
    const existingMember = this.studentTeam.find(member => 
        member.studentId.toString() === studentId.toString()
    );
    
    if (existingMember) {
        existingMember.isActive = true;
        existingMember.role = role;
    } else {
        this.studentTeam.push({
            studentId: studentId,
            role: role,
            joinDate: new Date(),
            isActive: true
        });
    }
    
    return this.save();
};

// Method to remove team member
projectSchema.methods.removeTeamMember = function(studentId) {
    const member = this.studentTeam.find(member => 
        member.studentId.toString() === studentId.toString()
    );
    
    if (member) {
        member.isActive = false;
    }
    
    return this.save();
};

// Static method to find projects by professor
projectSchema.statics.findByProfessor = function(professorId, status = null) {
    const query = { professorId };
    if (status) query.status = status;
    
    return this.find(query)
        .sort({ startDate: -1 })
        .populate('studentTeam.studentId', 'userId studentId')
        .populate('publications', 'title type publicationDate');
};

// Static method to find ongoing projects
projectSchema.statics.findOngoing = function() {
    return this.find({ status: 'ongoing' })
        .populate('professorId', 'userId employeeId designation')
        .sort({ startDate: -1 });
};

// Pre-save middleware to validate dates
projectSchema.pre('save', function(next) {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
        return next(new Error('Start date cannot be after end date'));
    }
    
    // Auto-complete project if all deliverables are completed
    if (this.deliverables.length > 0) {
        const allCompleted = this.deliverables.every(d => d.status === 'completed');
        if (allCompleted && this.status === 'ongoing') {
            this.status = 'completed';
        }
    }
    
    next();
});

export const Project = mongoose.model("Project", projectSchema);
