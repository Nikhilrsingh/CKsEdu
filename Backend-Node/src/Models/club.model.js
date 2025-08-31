import mongoose, { Schema } from "mongoose";

const clubSchema = new Schema(
    {
        // Basic Information
        clubName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        shortDescription: {
            type: String,
            maxlength: 200,
            default: "",
        },
        mission: {
            type: String,
            maxlength: 500,
            default: "",
        },
        vision: {
            type: String,
            maxlength: 500,
            default: "",
        },

        // Visual Assets
        logo: {
            type: String,
            default: "",
        },
        bannerImage: {
            type: String,
            default: "",
        },
        gallery: [{
            type: String,
        }],

        // College Reference
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
            index: true,
        },

        // Club Details
        clubType: {
            type: String,
            enum: ['technical', 'cultural', 'sports', 'academic', 'social-service', 'hobby', 'professional'],
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: ['student-club', 'departmental-club', 'inter-college-club'],
            default: 'student-club',
        },
        establishedDate: {
            type: Date,
            required: true,
            index: true,
        },

        // Leadership
        leadership: {
            president: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                default: null,
            },
            vicePresident: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                default: null,
            },
            secretary: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                default: null,
            },
            treasurer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                default: null,
            },
            facultyAdvisor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Professor',
                default: null,
            },
        },

        // Membership
        members: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            role: {
                type: String,
                enum: ['member', 'coordinator', 'head', 'president', 'vice-president', 'secretary', 'treasurer', 'core-team'],
                default: 'member',
            },
            joinedDate: {
                type: Date,
                default: Date.now,
            },
            isActive: {
                type: Boolean,
                default: true,
            },
            permissions: {
                canPostEvents: {
                    type: Boolean,
                    default: false,
                },
                canManageMembers: {
                    type: Boolean,
                    default: false,
                },
                canEditClub: {
                    type: Boolean,
                    default: false,
                },
            },
        }],

        // Settings
        membershipType: {
            type: String,
            enum: ['open', 'invite-only', 'application-based'],
            default: 'open',
        },
        maxMembers: {
            type: Number,
            default: 100,
            min: 1,
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
        },

        // Contact Information
        contactInfo: {
            email: {
                type: String,
                default: "",
                trim: true,
                lowercase: true,
            },
            phone: {
                type: String,
                default: "",
                trim: true,
            },
            socialMedia: {
                instagram: {
                    type: String,
                    default: "",
                },
                twitter: {
                    type: String,
                    default: "",
                },
                linkedin: {
                    type: String,
                    default: "",
                },
                facebook: {
                    type: String,
                    default: "",
                },
                website: {
                    type: String,
                    default: "",
                },
            },
        },

        // Status
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended', 'under-review'],
            default: 'active',
            index: true,
        },

        // Activities and Events
        upcomingEvents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }],
        pastEvents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }],

        // Statistics
        stats: {
            totalEvents: {
                type: Number,
                default: 0,
            },
            totalMembers: {
                type: Number,
                default: 0,
            },
            activeMembers: {
                type: Number,
                default: 0,
            },
            yearlyBudget: {
                type: Number,
                default: 0,
                min: 0,
            },
            fundsRaised: {
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
        
        // Requirements for joining
        requirements: [{
            type: String,
            trim: true,
        }],
        
        // Meeting Schedule
        meetingSchedule: {
            frequency: {
                type: String,
                enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly', 'as-needed'],
                default: 'monthly',
            },
            day: {
                type: String,
                enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                default: 'friday',
            },
            time: {
                type: String,
                default: "17:00",
            },
            location: {
                type: String,
                default: "",
            },
        },
    },
    { 
        timestamps: true,
        collection: 'clubs'
    }
);

// Indexes for performance optimization
clubSchema.index({ collegeId: 1 });
clubSchema.index({ clubType: 1 });
clubSchema.index({ status: 1 });
clubSchema.index({ 'members.studentId': 1 });
clubSchema.index({ establishedDate: -1 });

// Text index for search functionality
clubSchema.index({ 
    clubName: 'text', 
    description: 'text',
    shortDescription: 'text'
});

// Virtual for active members count
clubSchema.virtual('activeMembersCount').get(function() {
    return this.members.filter(member => member.isActive).length;
});

// Virtual for leadership positions filled
clubSchema.virtual('leadershipPositionsFilled').get(function() {
    const positions = ['president', 'vicePresident', 'secretary', 'treasurer', 'facultyAdvisor'];
    return positions.filter(pos => this.leadership[pos]).length;
});

// Virtual for club age in years
clubSchema.virtual('ageInYears').get(function() {
    const diffTime = Math.abs(new Date() - this.establishedDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
});

// Method to check if user is member
clubSchema.methods.isMember = function(studentId) {
    return this.members.some(member => 
        member.studentId.toString() === studentId.toString() && member.isActive
    );
};

// Method to check if user has leadership role
clubSchema.methods.hasLeadershipRole = function(studentId) {
    const leadership = this.leadership;
    return Object.values(leadership).some(leaderId => 
        leaderId && leaderId.toString() === studentId.toString()
    );
};

// Method to get member role
clubSchema.methods.getMemberRole = function(studentId) {
    const member = this.members.find(member => 
        member.studentId.toString() === studentId.toString() && member.isActive
    );
    return member ? member.role : null;
};

// Method to add member
clubSchema.methods.addMember = function(studentId, role = 'member') {
    const existingMember = this.members.find(member => 
        member.studentId.toString() === studentId.toString()
    );
    
    if (existingMember) {
        existingMember.isActive = true;
        existingMember.role = role;
        existingMember.joinedDate = new Date();
    } else {
        this.members.push({
            studentId: studentId,
            role: role,
            joinedDate: new Date(),
            isActive: true
        });
    }
    
    this.updateMemberStats();
    return this.save();
};

// Method to remove member
clubSchema.methods.removeMember = function(studentId) {
    const member = this.members.find(member => 
        member.studentId.toString() === studentId.toString()
    );
    
    if (member) {
        member.isActive = false;
    }
    
    this.updateMemberStats();
    return this.save();
};

// Method to update member statistics
clubSchema.methods.updateMemberStats = function() {
    this.stats.totalMembers = this.members.length;
    this.stats.activeMembers = this.members.filter(member => member.isActive).length;
};

// Method to check if club can accept new members
clubSchema.methods.canAcceptNewMembers = function() {
    return this.stats.activeMembers < this.maxMembers && this.status === 'active';
};

// Method to set leadership position
clubSchema.methods.setLeadershipPosition = function(position, studentId) {
    const validPositions = ['president', 'vicePresident', 'secretary', 'treasurer'];
    
    if (!validPositions.includes(position)) {
        throw new Error('Invalid leadership position');
    }
    
    // Update member role
    const member = this.members.find(member => 
        member.studentId.toString() === studentId.toString()
    );
    
    if (member) {
        member.role = position.replace('president', 'president').replace('vicePresident', 'vice-president');
    }
    
    // Set leadership position
    this.leadership[position] = studentId;
    
    return this.save();
};

// Static method to find clubs by college
clubSchema.statics.findByCollege = function(collegeId, clubType = null) {
    const query = { collegeId, status: 'active' };
    if (clubType) query.clubType = clubType;
    
    return this.find(query)
        .sort({ establishedDate: -1 })
        .populate('leadership.president leadership.vicePresident leadership.secretary leadership.treasurer', 'userId studentId')
        .populate('leadership.facultyAdvisor', 'userId employeeId');
};

// Static method to find clubs by type
clubSchema.statics.findByType = function(clubType) {
    return this.find({ 
        clubType: clubType,
        status: 'active'
    }).populate('collegeId', 'name shortName');
};

// Static method to find clubs that student is member of
clubSchema.statics.findByStudent = function(studentId) {
    return this.find({ 
        'members.studentId': studentId,
        'members.isActive': true,
        status: 'active'
    }).populate('collegeId', 'name shortName');
};

// Pre-save middleware to update stats and validate
clubSchema.pre('save', function(next) {
    this.updateMemberStats();
    
    // Validate maximum members
    if (this.stats.activeMembers > this.maxMembers) {
        return next(new Error('Active members count exceeds maximum allowed members'));
    }
    
    next();
});

export const Club = mongoose.model("Club", clubSchema);
