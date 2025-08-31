import mongoose, { Schema } from "mongoose";

const eLibrarySchema = new Schema(
    {
        // Basic Information
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        subtitle: {
            type: String,
            maxlength: 200,
            default: "",
        },
        abstract: {
            type: String,
            maxlength: 2000,
            default: "",
        },

        // Book/Document Details
        isbn: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            index: true,
        },
        isbn13: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        doi: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        edition: {
            type: String,
            default: "",
            trim: true,
        },
        publicationYear: {
            type: Number,
            min: 1400,
            max: new Date().getFullYear() + 1,
            index: true,
        },
        language: {
            type: String,
            default: 'English',
            trim: true,
        },
        pageCount: {
            type: Number,
            min: 1,
        },

        // Authors and Publishers
        authors: [{
            name: {
                type: String,
                required: true,
                trim: true,
            },
            bio: {
                type: String,
                maxlength: 1000,
                default: "",
            },
            nationality: {
                type: String,
                default: "",
                trim: true,
            },
            birthYear: {
                type: Number,
                min: 1000,
                max: new Date().getFullYear(),
            },
            expertise: [{
                type: String,
                trim: true,
            }],
        }],
        publisher: {
            name: {
                type: String,
                default: "",
                trim: true,
            },
            location: {
                type: String,
                default: "",
                trim: true,
            },
            website: {
                type: String,
                default: "",
                trim: true,
            },
            established: {
                type: Number,
                min: 1400,
                max: new Date().getFullYear(),
            },
        },

        // Content Classification
        contentType: {
            type: String,
            enum: ['book', 'journal', 'research-paper', 'thesis', 'magazine', 'newspaper', 'reference', 'manual', 'guide', 'encyclopedia'],
            required: true,
            index: true,
        },
        format: {
            type: String,
            enum: ['pdf', 'epub', 'mobi', 'doc', 'docx', 'txt', 'html', 'djvu'],
            required: true,
            index: true,
        },
        quality: {
            type: String,
            enum: ['low', 'medium', 'high', 'original'],
            default: 'medium',
        },

        // File Information
        fileUrl: {
            type: String,
            required: true,
            trim: true,
        },
        fileSize: {
            type: Number, // in bytes
            min: 0,
        },
        totalPages: {
            type: Number,
            min: 1,
        },
        
        // Legacy field (for backward compatibility)
        pdfLink: {
            type: String,
            default: "",
        },

        // Additional Files
        coverImage: {
            type: String,
            default: "",
        },
        thumbnailImage: {
            type: String,
            default: "",
        },
        previewPages: [{
            pageNumber: {
                type: Number,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
        }],

        // Classification and Categorization
        tags: [{
            type: String,
            trim: true,
            lowercase: true,
        }],
        subjects: [{
            type: String,
            trim: true,
        }],
        topics: [{
            type: String,
            trim: true,
        }],
        keywords: [{
            type: String,
            trim: true,
            lowercase: true,
        }],
        targetAudience: [{
            type: String,
            enum: ['undergraduate', 'graduate', 'postgraduate', 'researcher', 'faculty', 'general'],
            default: ['undergraduate'],
        }],
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            default: 'intermediate',
        },

        // Academic Context
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            default: null,
            index: true,
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
            index: true,
        },
        subjectIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
        }],
        semester: {
            type: Number,
            min: 1,
            max: 10,
            default: null,
        },

        // Library Classification Systems
        deweyDecimal: {
            type: String,
            default: "",
            trim: true,
        },
        libraryOfCongress: {
            type: String,
            default: "",
            trim: true,
        },
        universalDecimal: {
            type: String,
            default: "",
            trim: true,
        },
        libraryCode: {
            type: String,
            default: "",
            trim: true,
        },
        shelfLocation: {
            type: String,
            default: "",
            trim: true,
        },

        // Access Control and Permissions
        visibility: {
            type: String,
            enum: ['public', 'college-only', 'department-only', 'restricted', 'private'],
            default: 'college-only',
            index: true,
        },
        accessType: {
            type: String,
            enum: ['free', 'paid', 'subscription', 'institutional'],
            default: 'free',
            index: true,
        },
        downloadAllowed: {
            type: Boolean,
            default: true,
        },
        printAllowed: {
            type: Boolean,
            default: false,
        },
        copyAllowed: {
            type: Boolean,
            default: false,
        },
        accessRestrictions: [{
            type: String,
            enum: ['student-only', 'faculty-only', 'final-year-only', 'postgrad-only'],
        }],

        // Upload Information
        uploadedBy: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            userType: {
                type: String,
                enum: ['student', 'professor', 'admin', 'librarian'],
                required: true,
            },
        },
        uploadSource: {
            type: String,
            enum: ['manual', 'bulk-import', 'api', 'web-scraping'],
            default: 'manual',
        },

        // Moderation and Quality Control
        moderationStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'copyright-issue', 'under-review'],
            default: 'pending',
            index: true,
        },
        moderatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        moderationDate: {
            type: Date,
            default: null,
        },
        moderationNotes: {
            type: String,
            default: "",
            maxlength: 1000,
        },
        qualityScore: {
            type: Number,
            min: 0,
            max: 10,
            default: 5,
        },

        // Engagement Metrics
        views: {
            type: Number,
            default: 0,
            min: 0,
        },
        downloads: {
            type: Number,
            default: 0,
            min: 0,
        },
        reads: {
            type: Number,
            default: 0,
            min: 0,
        },
        favorites: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            favoritedAt: {
                type: Date,
                default: Date.now,
            },
        }],
        
        // Reading Progress Tracking
        readingProgress: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            currentPage: {
                type: Number,
                default: 1,
                min: 1,
            },
            percentage: {
                type: Number,
                default: 0,
                min: 0,
                max: 100,
            },
            lastReadAt: {
                type: Date,
                default: Date.now,
            },
            bookmarks: [{
                page: {
                    type: Number,
                    required: true,
                },
                note: {
                    type: String,
                    maxlength: 500,
                    default: "",
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }],
        }],

        // Reviews and Ratings
        reviews: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
            comment: {
                type: String,
                maxlength: 2000,
                default: "",
            },
            aspects: {
                content: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                clarity: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                usefulness: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                accuracy: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
            },
            helpful: {
                type: Number,
                default: 0,
                min: 0,
            },
            helpfulVotes: [{
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                isHelpful: {
                    type: Boolean,
                    required: true,
                },
            }],
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }],

        // Statistics
        stats: {
            averageRating: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },
            totalReviews: {
                type: Number,
                default: 0,
                min: 0,
            },
            totalFavorites: {
                type: Number,
                default: 0,
                min: 0,
            },
            popularityScore: {
                type: Number,
                default: 0,
                min: 0,
            },
            readingTime: {
                type: Number, // estimated reading time in minutes
                default: 0,
                min: 0,
            },
        },

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'archived', 'copyright-claimed', 'deleted'],
            default: 'active',
            index: true,
        },

        // Copyright and Legal Information
        copyright: {
            owner: {
                type: String,
                default: "",
                trim: true,
            },
            year: {
                type: Number,
                min: 1400,
                max: new Date().getFullYear(),
            },
            license: {
                type: String,
                enum: ['public-domain', 'creative-commons', 'educational-use', 'fair-use', 'all-rights-reserved', 'mit', 'gpl', 'other'],
                default: 'educational-use',
            },
            termsOfUse: {
                type: String,
                default: "",
                maxlength: 2000,
            },
            attribution: {
                type: String,
                default: "",
                maxlength: 500,
            },
        },

        // Version Control
        version: {
            number: {
                type: String,
                default: "1.0",
            },
            changeLog: [{
                version: String,
                changes: String,
                updatedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            }],
        },

        // Related Books and Recommendations
        relatedBooks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ELibrary',
        }],
        recommendedBy: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            reason: {
                type: String,
                maxlength: 500,
            },
            recommendedAt: {
                type: Date,
                default: Date.now,
            },
        }],

        // Series Information (for books that are part of a series)
        series: {
            name: {
                type: String,
                default: "",
                trim: true,
            },
            volume: {
                type: Number,
                min: 1,
            },
            totalVolumes: {
                type: Number,
                min: 1,
            },
        },
    },
    { 
        timestamps: true,
        collection: 'elibrary'
    }
);

// Indexes for performance optimization
eLibrarySchema.index({ collegeId: 1 });
eLibrarySchema.index({ departmentId: 1 });
eLibrarySchema.index({ contentType: 1 });
eLibrarySchema.index({ format: 1 });
eLibrarySchema.index({ tags: 1 });
eLibrarySchema.index({ subjects: 1 });
eLibrarySchema.index({ isbn: 1 }, { unique: true, sparse: true });
eLibrarySchema.index({ isbn13: 1 }, { unique: true, sparse: true });
eLibrarySchema.index({ doi: 1 }, { unique: true, sparse: true });
eLibrarySchema.index({ 'uploadedBy.userId': 1 });
eLibrarySchema.index({ moderationStatus: 1 });
eLibrarySchema.index({ status: 1 });
eLibrarySchema.index({ visibility: 1 });
eLibrarySchema.index({ accessType: 1 });
eLibrarySchema.index({ publicationYear: -1 });
eLibrarySchema.index({ 'stats.averageRating': -1 });
eLibrarySchema.index({ 'stats.popularityScore': -1 });
eLibrarySchema.index({ views: -1 });
eLibrarySchema.index({ downloads: -1 });

// Text index for search functionality
eLibrarySchema.index({ 
    title: 'text', 
    description: 'text',
    abstract: 'text',
    'authors.name': 'text',
    subjects: 'text',
    topics: 'text',
    keywords: 'text',
    tags: 'text'
});

// Virtual for file size in human readable format
eLibrarySchema.virtual('fileSizeFormatted').get(function() {
    if (!this.fileSize) return null;
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(this.fileSize) / Math.log(1024));
    
    return Math.round(this.fileSize / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Virtual for primary author
eLibrarySchema.virtual('primaryAuthor').get(function() {
    return this.authors.length > 0 ? this.authors[0].name : 'Unknown Author';
});

// Virtual for full citation
eLibrarySchema.virtual('citation').get(function() {
    const authors = this.authors.map(author => author.name).join(', ');
    const year = this.publicationYear || 'N/A';
    const publisher = this.publisher.name || 'Unknown Publisher';
    
    return `${authors} (${year}). ${this.title}. ${publisher}.`;
});

// Virtual for reading completion rate
eLibrarySchema.virtual('completionRate').get(function() {
    if (this.readingProgress.length === 0) return 0;
    
    const totalProgress = this.readingProgress.reduce((sum, progress) => sum + progress.percentage, 0);
    return Math.round(totalProgress / this.readingProgress.length);
});

// Method to check if user has favorited the book
eLibrarySchema.methods.isFavoritedBy = function(userId) {
    return this.favorites.some(fav => fav.userId.toString() === userId.toString());
};

// Method to add to favorites
eLibrarySchema.methods.addToFavorites = function(userId) {
    if (!this.isFavoritedBy(userId)) {
        this.favorites.push({ userId });
        this.stats.totalFavorites = this.favorites.length;
        this.updatePopularityScore();
    }
    return this.save();
};

// Method to remove from favorites
eLibrarySchema.methods.removeFromFavorites = function(userId) {
    this.favorites = this.favorites.filter(fav => fav.userId.toString() !== userId.toString());
    this.stats.totalFavorites = this.favorites.length;
    this.updatePopularityScore();
    return this.save();
};

// Method to update reading progress
eLibrarySchema.methods.updateReadingProgress = function(userId, currentPage, percentage) {
    let progress = this.readingProgress.find(p => p.userId.toString() === userId.toString());
    
    if (progress) {
        progress.currentPage = currentPage;
        progress.percentage = percentage;
        progress.lastReadAt = new Date();
    } else {
        this.readingProgress.push({
            userId,
            currentPage,
            percentage,
            lastReadAt: new Date()
        });
    }
    
    return this.save();
};

// Method to add bookmark
eLibrarySchema.methods.addBookmark = function(userId, page, note = "") {
    let progress = this.readingProgress.find(p => p.userId.toString() === userId.toString());
    
    if (!progress) {
        progress = {
            userId,
            currentPage: 1,
            percentage: 0,
            lastReadAt: new Date(),
            bookmarks: []
        };
        this.readingProgress.push(progress);
    }
    
    // Check if bookmark already exists for this page
    const existingBookmark = progress.bookmarks.find(b => b.page === page);
    if (!existingBookmark) {
        progress.bookmarks.push({
            page,
            note,
            createdAt: new Date()
        });
    }
    
    return this.save();
};

// Method to increment view count
eLibrarySchema.methods.incrementViews = function() {
    this.views += 1;
    this.updatePopularityScore();
    return this.save();
};

// Method to increment download count
eLibrarySchema.methods.incrementDownloads = function() {
    this.downloads += 1;
    this.updatePopularityScore();
    return this.save();
};

// Method to increment read count
eLibrarySchema.methods.incrementReads = function() {
    this.reads += 1;
    this.updatePopularityScore();
    return this.save();
};

// Method to add review
eLibrarySchema.methods.addReview = function(userId, rating, comment = "", aspects = {}) {
    // Remove existing review if any
    this.reviews = this.reviews.filter(r => r.userId.toString() !== userId.toString());
    
    // Add new review
    this.reviews.push({
        userId,
        rating,
        comment,
        aspects
    });
    
    this.updateAverageRating();
    this.updatePopularityScore();
    
    return this.save();
};

// Method to update average rating
eLibrarySchema.methods.updateAverageRating = function() {
    if (this.reviews.length === 0) {
        this.stats.averageRating = 0;
        this.stats.totalReviews = 0;
        return;
    }
    
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.stats.averageRating = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.stats.totalReviews = this.reviews.length;
};

// Method to update popularity score
eLibrarySchema.methods.updatePopularityScore = function() {
    // Popularity score formula: views * 1 + downloads * 3 + reads * 2 + favorites * 4 + reviews * 5
    this.stats.popularityScore = 
        (this.views * 1) + 
        (this.downloads * 3) + 
        (this.reads * 2) + 
        (this.stats.totalFavorites * 4) + 
        (this.stats.totalReviews * 5);
};

// Method to estimate reading time
eLibrarySchema.methods.estimateReadingTime = function() {
    if (!this.totalPages) return 0;
    
    // Average reading speed: 2-3 minutes per page for academic content
    const avgTimePerPage = 2.5;
    this.stats.readingTime = Math.round(this.totalPages * avgTimePerPage);
    
    return this.stats.readingTime;
};

// Static method to find books by subject
eLibrarySchema.statics.findBySubject = function(subject) {
    return this.find({ 
        subjects: { $regex: subject, $options: 'i' },
        status: 'active',
        moderationStatus: 'approved'
    }).sort({ 'stats.popularityScore': -1 });
};

// Static method to find popular books
eLibrarySchema.statics.findPopular = function(collegeId = null, limit = 20) {
    const query = {
        status: 'active',
        moderationStatus: 'approved'
    };
    
    if (collegeId) query.collegeId = collegeId;
    
    return this.find(query)
        .sort({ 'stats.popularityScore': -1, views: -1 })
        .limit(limit)
        .populate('uploadedBy.userId', 'fullName userName');
};

// Static method to find recently added books
eLibrarySchema.statics.findRecent = function(collegeId = null, days = 30) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);
    
    const query = {
        status: 'active',
        moderationStatus: 'approved',
        createdAt: { $gte: dateLimit }
    };
    
    if (collegeId) query.collegeId = collegeId;
    
    return this.find(query)
        .sort({ createdAt: -1 })
        .populate('uploadedBy.userId', 'fullName userName');
};

// Static method to find books by user
eLibrarySchema.statics.findByUser = function(userId) {
    return this.find({ 'uploadedBy.userId': userId })
        .sort({ createdAt: -1 })
        .populate('subjectIds', 'name subjectCode');
};

// Pre-save middleware to update stats and validate
eLibrarySchema.pre('save', function(next) {
    // Update stats
    this.stats.totalFavorites = this.favorites.length;
    this.updateAverageRating();
    this.updatePopularityScore();
    
    // Set legacy field for backward compatibility
    if (this.fileUrl) {
        this.pdfLink = this.fileUrl;
    }
    
    // Estimate reading time if not set
    if (!this.stats.readingTime) {
        this.estimateReadingTime();
    }
    
    // Validate ISBN format
    if (this.isbn && !/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(this.isbn)) {
        return next(new Error('Invalid ISBN format'));
    }
    
    next();
});

export const ELibrary = mongoose.model("ELibrary", eLibrarySchema);
