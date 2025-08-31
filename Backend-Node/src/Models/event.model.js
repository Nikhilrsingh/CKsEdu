import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        shortDescription: {
            type: String,
            maxlength: 300,
            default: "",
        },
        objectives: [{
            type: String,
            trim: true,
            maxlength: 500,
        }],

        // Event Details
        eventType: {
            type: String,
            enum: ['workshop', 'seminar', 'conference', 'competition', 'cultural', 'sports', 'hackathon', 'placement', 'fest', 'other'],
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: ['technical', 'cultural', 'sports', 'academic', 'social', 'professional'],
            required: true,
            index: true,
        },
        subCategory: {
            type: String,
            default: "",
            trim: true,
        },

        // Timeline
        startingDate: {
            type: Date,
            required: true,
            index: true,
        },
        endingDate: {
            type: Date,
            required: true,
        },
        registrationStartDate: {
            type: Date,
            required: true,
        },
        registrationEndDate: {
            type: Date,
            required: true,
        },
        
        // Schedule
        schedule: [{
            day: {
                type: Date,
                required: true,
            },
            sessions: [{
                title: {
                    type: String,
                    required: true,
                    trim: true,
                },
                startTime: {
                    type: String,
                    required: true,
                },
                endTime: {
                    type: String,
                    required: true,
                },
                speaker: {
                    name: String,
                    designation: String,
                    organization: String,
                    bio: String,
                },
                description: String,
                venue: String,
            }],
        }],

        // Venue
        venue: {
            type: {
                type: String,
                enum: ['physical', 'virtual', 'hybrid'],
                required: true,
            },
            location: {
                type: String,
                default: "",
            },
            address: {
                street: String,
                city: String,
                state: String,
                postalCode: String,
                country: String,
            },
            meetingLink: {
                type: String,
                default: "",
            },
            capacity: {
                type: Number,
                min: 1,
            },
            facilities: [{
                type: String,
                trim: true,
            }],
        },

        // Registration
        registrationRequired: {
            type: Boolean,
            default: true,
        },
        registrationLink: {
            type: String,
            default: "",
        },
        registrationFee: {
            amount: {
                type: Number,
                default: 0,
                min: 0,
            },
            currency: {
                type: String,
                default: 'INR',
            },
            earlyBirdDiscount: {
                percentage: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 100,
                },
                validUntil: Date,
            },
        },
        maxParticipants: {
            type: Number,
            min: 1,
        },

        // Participants
        registeredStudents: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            registrationDate: {
                type: Date,
                default: Date.now,
            },
            paymentStatus: {
                type: String,
                enum: ['pending', 'paid', 'failed', 'refunded'],
                default: 'pending',
            },
            attended: {
                type: Boolean,
                default: false,
            },
            certificateIssued: {
                type: Boolean,
                default: false,
            },
            certificateUrl: {
                type: String,
                default: "",
            },
            feedbackSubmitted: {
                type: Boolean,
                default: false,
            },
        }],

        // Organizers
        organizers: {
            clubId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Club',
                default: null,
            },
            departmentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Department',
                default: null,
            },
            externalOrganizer: {
                name: String,
                organization: String,
                contactEmail: String,
                contactPhone: String,
            },
        },

        // References
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
            index: true,
        },

        // Visibility & Access
        visibility: {
            type: String,
            enum: ['public', 'private', 'college-only', 'department-only'],
            default: 'college-only',
            index: true,
        },
        eligibility: {
            yearOfStudy: [{
                type: Number,
                min: 1,
                max: 4,
            }],
            departments: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Department',
            }],
            courses: [String],
            otherCriteria: String,
        },

        // Content
        resources: [{
            title: {
                type: String,
                required: true,
                trim: true,
            },
            type: {
                type: String,
                enum: ['document', 'video', 'link', 'image', 'presentation'],
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                default: "",
            },
            isPublic: {
                type: Boolean,
                default: false,
            },
        }],

        // Event Coordinators
        coordinators: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        }],
        facultyCoordinators: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor',
        }],

        // Status
        status: {
            type: String,
            enum: ['draft', 'published', 'cancelled', 'completed', 'ongoing', 'postponed'],
            default: 'draft',
            index: true,
        },

        // Images and Media
        bannerImage: {
            type: String,
            default: "",
        },
        posterImage: {
            type: String,
            default: "",
        },
        gallery: [{
            type: String,
        }],

        // Sponsors and Partners
        sponsors: [{
            name: {
                type: String,
                required: true,
                trim: true,
            },
            logo: String,
            website: String,
            type: {
                type: String,
                enum: ['title', 'platinum', 'gold', 'silver', 'bronze', 'partner'],
                default: 'partner',
            },
            contributionAmount: {
                type: Number,
                default: 0,
                min: 0,
            },
        }],

        // Feedback and Ratings
        feedbackEnabled: {
            type: Boolean,
            default: true,
        },
        ratings: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
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
                maxlength: 1000,
                default: "",
            },
            aspects: {
                content: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                organization: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                speakers: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                venue: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }],

        // Prizes and Awards
        prizes: [{
            position: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                default: "",
            },
            value: {
                type: Number,
                default: 0,
                min: 0,
            },
            winners: [{
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Student',
                },
                teamName: String,
                achievement: String,
            }],
        }],

        // Statistics
        stats: {
            totalRegistrations: {
                type: Number,
                default: 0,
            },
            totalAttendees: {
                type: Number,
                default: 0,
            },
            averageRating: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },
            totalRevenue: {
                type: Number,
                default: 0,
                min: 0,
            },
            totalExpenses: {
                type: Number,
                default: 0,
                min: 0,
            },
        },

        // Administrative
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClgAdmin',
            default: null,
        },
        approvalDate: {
            type: Date,
            default: null,
        },
        createdBy: {
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
    },
    { 
        timestamps: true,
        collection: 'events'
    }
);

// Indexes for performance optimization
eventSchema.index({ collegeId: 1 });
eventSchema.index({ startingDate: 1 });
eventSchema.index({ endingDate: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ visibility: 1 });
eventSchema.index({ 'registeredStudents.studentId': 1 });
eventSchema.index({ registrationStartDate: 1, registrationEndDate: 1 });

// Text index for search functionality
eventSchema.index({ 
    name: 'text', 
    description: 'text',
    shortDescription: 'text'
});

// Virtual for event duration
eventSchema.virtual('duration').get(function() {
    const diffTime = Math.abs(this.endingDate - this.startingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
});

// Virtual for registration status
eventSchema.virtual('registrationStatus').get(function() {
    const now = new Date();
    if (now < this.registrationStartDate) return 'not-started';
    if (now > this.registrationEndDate) return 'closed';
    return 'open';
});

// Virtual for event status based on dates
eventSchema.virtual('currentStatus').get(function() {
    const now = new Date();
    if (this.status === 'cancelled' || this.status === 'postponed') return this.status;
    if (now < this.startingDate) return 'upcoming';
    if (now >= this.startingDate && now <= this.endingDate) return 'ongoing';
    return 'completed';
});

// Virtual for attendance percentage
eventSchema.virtual('attendancePercentage').get(function() {
    if (this.stats.totalRegistrations === 0) return 0;
    return Math.round((this.stats.totalAttendees / this.stats.totalRegistrations) * 100);
});

// Method to check if student can register
eventSchema.methods.canStudentRegister = function(studentId) {
    const now = new Date();
    
    // Check if registration is open
    if (now < this.registrationStartDate || now > this.registrationEndDate) {
        return { canRegister: false, reason: 'Registration is not open' };
    }
    
    // Check if event is published and not cancelled
    if (this.status !== 'published') {
        return { canRegister: false, reason: 'Event is not available for registration' };
    }
    
    // Check if already registered
    const isAlreadyRegistered = this.registeredStudents.some(registration => 
        registration.studentId.toString() === studentId.toString()
    );
    
    if (isAlreadyRegistered) {
        return { canRegister: false, reason: 'Already registered for this event' };
    }
    
    // Check capacity
    if (this.maxParticipants && this.stats.totalRegistrations >= this.maxParticipants) {
        return { canRegister: false, reason: 'Event is full' };
    }
    
    return { canRegister: true };
};

// Method to register student
eventSchema.methods.registerStudent = function(studentId) {
    const canRegister = this.canStudentRegister(studentId);
    
    if (!canRegister.canRegister) {
        throw new Error(canRegister.reason);
    }
    
    this.registeredStudents.push({
        studentId: studentId,
        registrationDate: new Date(),
        paymentStatus: this.registrationFee.amount > 0 ? 'pending' : 'paid'
    });
    
    this.stats.totalRegistrations += 1;
    return this.save();
};

// Method to mark attendance
eventSchema.methods.markAttendance = function(studentId, attended = true) {
    const registration = this.registeredStudents.find(reg => 
        reg.studentId.toString() === studentId.toString()
    );
    
    if (!registration) {
        throw new Error('Student is not registered for this event');
    }
    
    const wasAttended = registration.attended;
    registration.attended = attended;
    
    // Update stats
    if (attended && !wasAttended) {
        this.stats.totalAttendees += 1;
    } else if (!attended && wasAttended) {
        this.stats.totalAttendees -= 1;
    }
    
    return this.save();
};

// Method to add rating
eventSchema.methods.addRating = function(studentId, rating, comment = "", aspects = {}) {
    // Check if student attended the event
    const registration = this.registeredStudents.find(reg => 
        reg.studentId.toString() === studentId.toString()
    );
    
    if (!registration || !registration.attended) {
        throw new Error('Only attendees can rate the event');
    }
    
    // Remove existing rating if any
    this.ratings = this.ratings.filter(r => 
        r.studentId.toString() !== studentId.toString()
    );
    
    // Add new rating
    this.ratings.push({
        studentId: studentId,
        rating: rating,
        comment: comment,
        aspects: aspects
    });
    
    // Update average rating
    this.updateAverageRating();
    
    return this.save();
};

// Method to update average rating
eventSchema.methods.updateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.stats.averageRating = 0;
        return;
    }
    
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.stats.averageRating = Math.round((totalRating / this.ratings.length) * 10) / 10;
};

// Static method to find events by college
eventSchema.statics.findByCollege = function(collegeId, status = 'published') {
    const query = { collegeId };
    if (status) query.status = status;
    
    return this.find(query)
        .sort({ startingDate: -1 })
        .populate('organizers.clubId', 'clubName')
        .populate('organizers.departmentId', 'name shortName');
};

// Static method to find upcoming events
eventSchema.statics.findUpcoming = function(collegeId = null, days = 30) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    
    const query = {
        startingDate: { $gte: now, $lte: futureDate },
        status: 'published'
    };
    
    if (collegeId) query.collegeId = collegeId;
    
    return this.find(query).sort({ startingDate: 1 });
};

// Static method to find events by student (registered)
eventSchema.statics.findByStudent = function(studentId) {
    return this.find({ 
        'registeredStudents.studentId': studentId 
    }).sort({ startingDate: -1 });
};

// Pre-save middleware to validate dates and update stats
eventSchema.pre('save', function(next) {
    // Validate dates
    if (this.startingDate > this.endingDate) {
        return next(new Error('Start date cannot be after end date'));
    }
    
    if (this.registrationStartDate > this.registrationEndDate) {
        return next(new Error('Registration start date cannot be after registration end date'));
    }
    
    // Update total registrations
    this.stats.totalRegistrations = this.registeredStudents.length;
    
    // Update total attendees
    this.stats.totalAttendees = this.registeredStudents.filter(reg => reg.attended).length;
    
    // Calculate revenue
    this.stats.totalRevenue = this.registeredStudents
        .filter(reg => reg.paymentStatus === 'paid')
        .length * this.registrationFee.amount;
    
    next();
});

export const Event = mongoose.model("Event", eventSchema);
