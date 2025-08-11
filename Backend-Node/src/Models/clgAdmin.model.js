import mongoose, { Schema } from "mongoose";

const clgAdminSchema = new Schema(
  {
    // User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    // Administrative Information
    adminId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    position: {
      type: String,
      required: true,
      enum: ['principal', 'vice-principal', 'registrar', 'admin-officer', 'it-admin'],
      default: 'admin-officer',
      index: true,
    },
    universityName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      default: 'Default University',
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: false, // Set to false initially since College model will be created later
      default: null,
    },

    // Permissions
    permissions: {
      manageStudents: {
        type: Boolean,
        default: true,
      },
      manageProfessors: {
        type: Boolean,
        default: true,
      },
      manageDepartments: {
        type: Boolean,
        default: false,
      },
      manageResults: {
        type: Boolean,
        default: true,
      },
      manageEvents: {
        type: Boolean,
        default: true,
      },
      manageResources: {
        type: Boolean,
        default: true,
      },
      viewAnalytics: {
        type: Boolean,
        default: true,
      },
    },

    // Subscription Information
    subscription: {
      planType: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic',
      },
      startDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: true,
        default: function() {
          // Default to 1 year from start date
          const date = new Date();
          date.setFullYear(date.getFullYear() + 1);
          return date;
        },
      },
      isActive: {
        type: Boolean,
        default: true,
        index: true,
      },
      maxStudents: {
        type: Number,
        default: 1000,
        min: 1,
      },
      maxProfessors: {
        type: Number,
        default: 100,
        min: 1,
      },
    },

    // Contact Information
    phoneNumber: {
      type: String,
      required: true,
      match: /^[+]?[\d\s\-\(\)]+$/,
      default: '+91-0000000000',
    },
    alternatePhoneNumber: {
      type: String,
      match: /^[+]?[\d\s\-\(\)]+$/,
      default: null,
    },

    // Status
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
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
  { 
    timestamps: true,
    collection: 'clgadmins' // Explicit collection name
  }
);

// Indexes
clgAdminSchema.index({ userId: 1 }, { unique: true });
clgAdminSchema.index({ adminId: 1 }, { unique: true });
clgAdminSchema.index({ collegeId: 1 });
clgAdminSchema.index({ 'subscription.isActive': 1 });
clgAdminSchema.index({ status: 1 });
clgAdminSchema.index({ position: 1 });

// Pre-save middleware to generate adminId if not provided
clgAdminSchema.pre('save', function(next) {
  if (!this.adminId) {
    // Generate a default adminId with format: ADM + timestamp + random 3 digits
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 900) + 100;
    this.adminId = `ADM${timestamp}${random}`;
  }
  next();
});

// Virtual for full admin info
clgAdminSchema.virtual('fullAdminInfo').get(function() {
  return {
    adminId: this.adminId,
    position: this.position,
    university: this.universityName,
    status: this.status,
    subscription: this.subscription
  };
});

// Method to check if subscription is active and not expired
clgAdminSchema.methods.isSubscriptionValid = function() {
  return this.subscription.isActive && new Date() < this.subscription.endDate;
};

// Method to check specific permission
clgAdminSchema.methods.hasPermission = function(permission) {
  return this.permissions[permission] || false;
};

// Method to get subscription days remaining
clgAdminSchema.methods.getSubscriptionDaysRemaining = function() {
  const now = new Date();
  const endDate = new Date(this.subscription.endDate);
  const diffTime = endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const ClgAdmin = mongoose.model("ClgAdmin", clgAdminSchema);
