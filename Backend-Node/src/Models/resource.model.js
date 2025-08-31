import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
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
        summary: {
            type: String,
            maxlength: 300,
            default: "",
        },

        // Resource Content
        resourceType: {
            type: String,
            enum: ['video', 'document', 'link', 'image', 'audio', 'presentation', 'code', 'dataset'],
            required: true,
            index: true,
        },
        contentUrl: {
            type: String,
            required: true,
            trim: true,
        },

        // Legacy fields (for backward compatibility)
        videoLink: {
            type: String,
            default: "",
        },
        pdfLink: {
            type: String,
            default: "",
        },

        // Additional Content Details
        thumbnailUrl: {
            type: String,
            default: "",
        },
        fileSize: {
            type: Number, // in bytes
            min: 0,
        },
        duration: {
            type: Number, // for videos/audio in seconds
            min: 0,
        },
        format: {
            type: String,
            default: "",
            trim: true,
        },
        quality: {
            type: String,
            enum: ['low', 'medium', 'high', 'hd', '4k'],
            default: 'medium',
        },

        // Classification
        tags: [{
            type: String,
            trim: true,
            lowercase: true,
        }],
        category: {
            type: String,
            enum: ['lecture', 'tutorial', 'reference', 'assignment', 'project', 'research', 'textbook', 'notes', 'practical', 'other'],
            required: true,
            index: true,
        },
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'intermediate',
            index: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium',
        },

        // Academic Context
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            default: null,
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
        semester: {
            type: Number,
            min: 1,
            max: 10,
            default: null,
            index: true,
        },
        unit: {
            type: String,
            default: "",
            trim: true,
        },
        chapter: {
            type: String,
            default: "",
            trim: true,
        },

        // Content Details
        language: {
            type: String,
            default: 'English',
            trim: true,
        },
        author: {
            type: String,
            default: "",
            trim: true,
        },
        publisher: {
            type: String,
            default: "",
            trim: true,
        },
        publicationDate: {
            type: Date,
            default: null,
        },
        version: {
            type: String,
            default: "1.0",
            trim: true,
        },

        // Access Control
        visibility: {
            type: String,
            enum: ['public', 'college-only', 'department-only', 'subject-only', 'private'],
            default: 'college-only',
            index: true,
        },
        accessLevel: {
            type: String,
            enum: ['free', 'premium', 'restricted'],
            default: 'free',
            index: true,
        },
        allowedRoles: [{
            type: String,
            enum: ['student', 'professor', 'admin'],
            default: ['student', 'professor'],
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
                enum: ['student', 'professor', 'admin'],
                required: true,
            },
        },

        // Moderation
        moderationStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'flagged', 'under-review'],
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
            maxlength: 500,
        },
        flagReasons: [{
            reason: {
                type: String,
                enum: ['inappropriate', 'copyright', 'spam', 'incorrect', 'duplicate', 'other'],
            },
            description: String,
            reportedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            reportedAt: {
                type: Date,
                default: Date.now,
            },
        }],

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
        shares: {
            type: Number,
            default: 0,
            min: 0,
        },
        likes: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            likedAt: {
                type: Date,
                default: Date.now,
            },
        }],
        bookmarks: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            bookmarkedAt: {
                type: Date,
                default: Date.now,
            },
        }],

        // Reviews and Ratings
        ratings: [{
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
            review: {
                type: String,
                maxlength: 1000,
                default: "",
            },
            helpful: {
                type: Number,
                default: 0,
                min: 0,
            },
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
            totalRatings: {
                type: Number,
                default: 0,
                min: 0,
            },
            totalLikes: {
                type: Number,
                default: 0,
                min: 0,
            },
            totalBookmarks: {
                type: Number,
                default: 0,
                min: 0,
            },
            popularityScore: {
                type: Number,
                default: 0,
                min: 0,
            },
        },

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'archived', 'deleted'],
            default: 'active',
            index: true,
        },

        // Metadata
        metadata: {
            source: {
                type: String,
                default: "",
                trim: true,
            },
            copyright: {
                type: String,
                default: "",
                trim: true,
            },
            license: {
                type: String,
                enum: ['public-domain', 'creative-commons', 'educational-use', 'all-rights-reserved', 'mit', 'gpl', 'other'],
                default: 'educational-use',
            },
            keywords: [{
                type: String,
                trim: true,
                lowercase: true,
            }],
        },

        // Related Resources
        relatedResources: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource',
        }],

        // Comments and Discussions
        comments: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            comment: {
                type: String,
                required: true,
                maxlength: 1000,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            replies: [{
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                reply: {
                    type: String,
                    required: true,
                    maxlength: 500,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }],
        }],

        // Scheduling (for time-sensitive resources)
        schedule: {
            publishAt: {
                type: Date,
                default: null,
            },
            expireAt: {
                type: Date,
                default: null,
            },
            isScheduled: {
                type: Boolean,
                default: false,
            },
        },
    },
    { 
        timestamps: true,
        collection: 'resources'
    }
);

// Indexes for performance optimization
resourceSchema.index({ collegeId: 1 });
resourceSchema.index({ departmentId: 1 });
resourceSchema.index({ subjectId: 1 });
resourceSchema.index({ resourceType: 1 });
resourceSchema.index({ category: 1 });
resourceSchema.index({ difficulty: 1 });
resourceSchema.index({ tags: 1 });
resourceSchema.index({ 'uploadedBy.userId': 1 });
resourceSchema.index({ moderationStatus: 1 });
resourceSchema.index({ status: 1 });
resourceSchema.index({ visibility: 1 });
resourceSchema.index({ semester: 1 });
resourceSchema.index({ 'stats.averageRating': -1 });
resourceSchema.index({ 'stats.popularityScore': -1 });
resourceSchema.index({ views: -1 });
resourceSchema.index({ downloads: -1 });

// Text index for search functionality
resourceSchema.index({ 
    title: 'text', 
    description: 'text',
    summary: 'text',
    tags: 'text',
    'metadata.keywords': 'text'
});

// Virtual for file size in human readable format
resourceSchema.virtual('fileSizeFormatted').get(function() {
    if (!this.fileSize) return null;
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(this.fileSize) / Math.log(1024));
    
    return Math.round(this.fileSize / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Virtual for duration in human readable format
resourceSchema.virtual('durationFormatted').get(function() {
    if (!this.duration) return null;
    
    const hours = Math.floor(this.duration / 3600);
    const minutes = Math.floor((this.duration % 3600) / 60);
    const seconds = this.duration % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for like percentage
resourceSchema.virtual('likePercentage').get(function() {
    if (this.views === 0) return 0;
    return Math.round((this.stats.totalLikes / this.views) * 100);
});

// Method to check if user has liked the resource
resourceSchema.methods.isLikedBy = function(userId) {
    return this.likes.some(like => like.userId.toString() === userId.toString());
};

// Method to check if user has bookmarked the resource
resourceSchema.methods.isBookmarkedBy = function(userId) {
    return this.bookmarks.some(bookmark => bookmark.userId.toString() === userId.toString());
};

// Method to add like
resourceSchema.methods.addLike = function(userId) {
    if (!this.isLikedBy(userId)) {
        this.likes.push({ userId });
        this.stats.totalLikes = this.likes.length;
        this.updatePopularityScore();
    }
    return this.save();
};

// Method to remove like
resourceSchema.methods.removeLike = function(userId) {
    this.likes = this.likes.filter(like => like.userId.toString() !== userId.toString());
    this.stats.totalLikes = this.likes.length;
    this.updatePopularityScore();
    return this.save();
};

// Method to add bookmark
resourceSchema.methods.addBookmark = function(userId) {
    if (!this.isBookmarkedBy(userId)) {
        this.bookmarks.push({ userId });
        this.stats.totalBookmarks = this.bookmarks.length;
    }
    return this.save();
};

// Method to remove bookmark
resourceSchema.methods.removeBookmark = function(userId) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.userId.toString() !== userId.toString());
    this.stats.totalBookmarks = this.bookmarks.length;
    return this.save();
};

// Method to increment view count
resourceSchema.methods.incrementViews = function() {
    this.views += 1;
    this.updatePopularityScore();
    return this.save();
};

// Method to increment download count
resourceSchema.methods.incrementDownloads = function() {
    this.downloads += 1;
    this.updatePopularityScore();
    return this.save();
};

// Method to add rating
resourceSchema.methods.addRating = function(userId, rating, review = "") {
    // Remove existing rating if any
    this.ratings = this.ratings.filter(r => r.userId.toString() !== userId.toString());
    
    // Add new rating
    this.ratings.push({
        userId,
        rating,
        review
    });
    
    this.updateAverageRating();
    this.updatePopularityScore();
    
    return this.save();
};

// Method to update average rating
resourceSchema.methods.updateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.stats.averageRating = 0;
        this.stats.totalRatings = 0;
        return;
    }
    
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.stats.averageRating = Math.round((totalRating / this.ratings.length) * 10) / 10;
    this.stats.totalRatings = this.ratings.length;
};

// Method to update popularity score
resourceSchema.methods.updatePopularityScore = function() {
    // Popularity score formula: views * 1 + downloads * 2 + likes * 3 + ratings * 4
    this.stats.popularityScore = 
        (this.views * 1) + 
        (this.downloads * 2) + 
        (this.stats.totalLikes * 3) + 
        (this.stats.totalRatings * 4);
};

// Method to flag resource
resourceSchema.methods.flagResource = function(reason, description, reportedBy) {
    this.flagReasons.push({
        reason,
        description,
        reportedBy,
        reportedAt: new Date()
    });
    
    if (this.moderationStatus === 'approved') {
        this.moderationStatus = 'flagged';
    }
    
    return this.save();
};

// Static method to find resources by subject
resourceSchema.statics.findBySubject = function(subjectId, semester = null) {
    const query = { 
        subjectId,
        status: 'active',
        moderationStatus: 'approved'
    };
    
    if (semester) query.semester = semester;
    
    return this.find(query)
        .sort({ 'stats.popularityScore': -1 })
        .populate('uploadedBy.userId', 'fullName userName');
};

// Static method to find trending resources
resourceSchema.statics.findTrending = function(collegeId = null, days = 7) {
    const query = {
        status: 'active',
        moderationStatus: 'approved',
        createdAt: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
    };
    
    if (collegeId) query.collegeId = collegeId;
    
    return this.find(query)
        .sort({ 'stats.popularityScore': -1, views: -1 })
        .limit(20);
};

// Static method to find resources by user
resourceSchema.statics.findByUser = function(userId) {
    return this.find({ 'uploadedBy.userId': userId })
        .sort({ createdAt: -1 })
        .populate('subjectId', 'name subjectCode');
};

// Pre-save middleware to update stats and validate
resourceSchema.pre('save', function(next) {
    // Update stats
    this.stats.totalLikes = this.likes.length;
    this.stats.totalBookmarks = this.bookmarks.length;
    this.updateAverageRating();
    this.updatePopularityScore();
    
    // Validate URLs
    if (this.contentUrl && !this.contentUrl.startsWith('http')) {
        return next(new Error('Content URL must be a valid HTTP/HTTPS URL'));
    }
    
    // Set legacy fields for backward compatibility
    if (this.resourceType === 'video' && this.contentUrl) {
        this.videoLink = this.contentUrl;
    }
    if (this.resourceType === 'document' && this.contentUrl) {
        this.pdfLink = this.contentUrl;
    }
    
    next();
});

export const Resource = mongoose.model("Resource", resourceSchema);
