import mongoose, { Schema } from "mongoose";

const researchWorkSchema = new Schema(
    {
        // Professor Reference
        professorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
            required: true,
            index: true,
        },

        // Research Information
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
            index: true,
        },
        type: {
            type: String,
            enum: ['journal', 'conference', 'book', 'chapter', 'patent', 'thesis', 'workshop'],
            required: true,
            index: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 2000,
        },
        abstract: {
            type: String,
            default: "",
            trim: true,
            maxlength: 1000,
        },
        publicationDate: {
            type: Date,
            default: null,
            index: true,
        },
        venue: {
            type: String,
            default: "",
            trim: true,
            maxlength: 200,
        },
        volume: {
            type: String,
            default: "",
            trim: true,
        },
        issue: {
            type: String,
            default: "",
            trim: true,
        },
        pages: {
            from: {
                type: Number,
                min: 1,
            },
            to: {
                type: Number,
                min: 1,
            },
        },
        doi: {
            type: String,
            default: "",
            trim: true,
        },
        isbn: {
            type: String,
            default: "",
            trim: true,
        },
        issn: {
            type: String,
            default: "",
            trim: true,
        },
        url: {
            type: String,
            default: "",
            trim: true,
        },
        pdfUrl: {
            type: String,
            default: "",
            trim: true,
        },

        // Citation and Impact
        citations: {
            type: Number,
            default: 0,
            min: 0,
        },
        impactFactor: {
            type: Number,
            default: 0,
            min: 0,
        },
        hIndex: {
            type: Number,
            default: 0,
            min: 0,
        },

        // Classification
        keywords: [{
            type: String,
            trim: true,
            lowercase: true,
        }],
        researchArea: {
            type: String,
            default: "",
            trim: true,
        },
        subjectArea: {
            type: String,
            default: "",
            trim: true,
        },

        // Authors and Collaboration
        authors: [{
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
            email: {
                type: String,
                default: "",
                trim: true,
                lowercase: true,
            },
            isCorresponding: {
                type: Boolean,
                default: false,
            },
            order: {
                type: Number,
                required: true,
                min: 1,
            },
        }],
        
        // Publication Status
        status: {
            type: String,
            enum: ['draft', 'submitted', 'under-review', 'accepted', 'published', 'rejected'],
            default: 'draft',
            index: true,
        },
        submissionDate: {
            type: Date,
            default: null,
        },
        acceptanceDate: {
            type: Date,
            default: null,
        },

        // Quality Metrics
        peerReviewed: {
            type: Boolean,
            default: false,
        },
        openAccess: {
            type: Boolean,
            default: false,
        },
        indexed: [{
            database: {
                type: String,
                enum: ['scopus', 'web-of-science', 'pubmed', 'ieee', 'acm', 'google-scholar', 'other'],
            },
            id: String,
        }],

        // Associated Project
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },

        // Funding Information
        funding: {
            agency: {
                type: String,
                default: "",
                trim: true,
            },
            grantNumber: {
                type: String,
                default: "",
                trim: true,
            },
            amount: {
                type: Number,
                default: 0,
                min: 0,
            },
        },

        // Files and Resources
        attachments: [{
            filename: {
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
                enum: ['pdf', 'document', 'presentation', 'dataset', 'code', 'other'],
                default: 'pdf',
            },
            size: {
                type: Number, // in bytes
                min: 0,
            },
        }],
    },
    { 
        timestamps: true,
        collection: 'researchworks'
    }
);

// Indexes for performance optimization
researchWorkSchema.index({ professorId: 1 });
researchWorkSchema.index({ type: 1 });
researchWorkSchema.index({ status: 1 });
researchWorkSchema.index({ publicationDate: -1 });
researchWorkSchema.index({ citations: -1 });

// Text index for search functionality
researchWorkSchema.index({ 
    title: 'text', 
    description: 'text',
    abstract: 'text',
    keywords: 'text',
    'authors.name': 'text'
});

// Virtual for page count
researchWorkSchema.virtual('pageCount').get(function() {
    if (this.pages.from && this.pages.to) {
        return this.pages.to - this.pages.from + 1;
    }
    return null;
});

// Virtual for full citation
researchWorkSchema.virtual('citation').get(function() {
    const authors = this.authors
        .sort((a, b) => a.order - b.order)
        .map(author => author.name)
        .join(', ');
    
    const year = this.publicationDate ? this.publicationDate.getFullYear() : 'N/A';
    const venue = this.venue || 'Unknown Venue';
    
    return `${authors} (${year}). ${this.title}. ${venue}.`;
});

// Virtual for is recent publication (within last 2 years)
researchWorkSchema.virtual('isRecent').get(function() {
    if (!this.publicationDate) return false;
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    return this.publicationDate >= twoYearsAgo;
});

// Method to check if research work is high impact
researchWorkSchema.methods.isHighImpact = function() {
    return this.impactFactor >= 2.0 || this.citations >= 50;
};

// Method to get corresponding author
researchWorkSchema.methods.getCorrespondingAuthor = function() {
    return this.authors.find(author => author.isCorresponding);
};

// Method to add citation
researchWorkSchema.methods.addCitation = function() {
    this.citations += 1;
    return this.save();
};

// Method to update status with validation
researchWorkSchema.methods.updateStatus = function(newStatus) {
    const validTransitions = {
        'draft': ['submitted'],
        'submitted': ['under-review', 'rejected'],
        'under-review': ['accepted', 'rejected'],
        'accepted': ['published'],
        'published': [],
        'rejected': ['submitted']
    };
    
    if (validTransitions[this.status].includes(newStatus)) {
        this.status = newStatus;
        
        // Set appropriate dates
        if (newStatus === 'submitted' && !this.submissionDate) {
            this.submissionDate = new Date();
        } else if (newStatus === 'accepted' && !this.acceptanceDate) {
            this.acceptanceDate = new Date();
        } else if (newStatus === 'published' && !this.publicationDate) {
            this.publicationDate = new Date();
        }
        
        return this.save();
    } else {
        throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
    }
};

// Static method to find research works by professor
researchWorkSchema.statics.findByProfessor = function(professorId, type = null) {
    const query = { professorId };
    if (type) query.type = type;
    
    return this.find(query)
        .sort({ publicationDate: -1 })
        .populate('projectId', 'title status');
};

// Static method to find recent publications
researchWorkSchema.statics.findRecent = function(months = 12) {
    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - months);
    
    return this.find({ 
        publicationDate: { $gte: dateLimit },
        status: 'published'
    }).sort({ publicationDate: -1 })
      .populate('professorId', 'userId employeeId designation');
};

// Static method to get publication statistics
researchWorkSchema.statics.getPublicationStats = function(professorId) {
    return this.aggregate([
        { $match: { professorId: mongoose.Types.ObjectId(professorId) } },
        {
            $group: {
                _id: '$type',
                count: { $sum: 1 },
                totalCitations: { $sum: '$citations' },
                avgImpactFactor: { $avg: '$impactFactor' }
            }
        }
    ]);
};

// Pre-save middleware to validate and set defaults
researchWorkSchema.pre('save', function(next) {
    // Validate page numbers
    if (this.pages.from && this.pages.to && this.pages.from > this.pages.to) {
        return next(new Error('Starting page cannot be greater than ending page'));
    }
    
    // Sort authors by order
    this.authors.sort((a, b) => a.order - b.order);
    
    // Ensure only one corresponding author
    const correspondingAuthors = this.authors.filter(author => author.isCorresponding);
    if (correspondingAuthors.length > 1) {
        return next(new Error('Only one corresponding author is allowed'));
    }
    
    next();
});

export const ResearchWork = mongoose.model("ResearchWork", researchWorkSchema);
