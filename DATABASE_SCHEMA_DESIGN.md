# 🗄️ **CKsEdu Database Schema Design**

## 📋 **Overview**

This document outlines the complete database schema structure for the CKsEdu platform, designed with MongoDB/Mongoose. The schema follows a modular approach where user authentication is separated from role-specific profiles, ensuring data integrity and scalability.

---

## 🏗️ **Core Design Principles**

### 1. **Separation of Concerns**

- **User Model**: Handles authentication, identity, and basic user information
- **Profile Models**: Handle role-specific data (Student, Professor, CLG-Admin)
- **Academic Models**: Handle educational structure (College, Department, Subject, etc.)
- **Activity Models**: Handle platform activities (Events, Clubs, Resources, etc.)

### 2. **Referential Integrity**

- All relationships use ObjectId references
- Cascading deletes handled at application level
- Consistent naming conventions for reference fields

### 3. **Security & Privacy**

- Password hashing only in User model
- No duplication of sensitive data
- Role-based access control through User model

### 4. **Scalability**

- Optimized for aggregation queries
- Proper indexing strategy
- Efficient many-to-many relationships

---

## 📊 **Schema Definitions**

### 1. **User Schema (Core Authentication & Identity)**

```javascript
{
  // Authentication & Identity
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // Account Status
  verified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Security
  refreshToken: {
    type: String,
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  emailVerificationExpires: {
    type: Date,
    default: null
  },

  // Role Management
  role: {
    type: String,
    enum: ['student', 'professor', 'clg-admin', 'super-admin'],
    required: true
  },

  // Profile Completion
  profileCompleted: {
    type: Boolean,
    default: false
  },

  // Activity Tracking
  lastLogin: {
    type: Date,
    default: null
  },
  loginCount: {
    type: Number,
    default: 0
  }
}
```

**Indexes:**

- `userName` (unique)
- `email` (unique)
- `role`
- `verified`
- `isActive`

---

### 2. **Student Profile Schema**

```javascript
{
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Information
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[+]?[\d\s\-\(\)]+$/
  },
  alternatePhoneNumber: {
    type: String,
    match: /^[+]?[\d\s\-\(\)]+$/
  },

  // Address Information
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  // Academic Information
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  currentSemester: {
    type: Number,
    min: 1,
    max: 8,
    required: true
  },
  admissionYear: {
    type: Number,
    required: true
  },
  graduationYear: {
    type: Number,
    required: true
  },

  // Academic Performance
  results: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  }],
  overallCGPA: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },

  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String,
    email: String
  },

  // Academic Status
  status: {
    type: String,
    enum: ['active', 'graduated', 'suspended', 'dropped'],
    default: 'active'
  },

  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  }
}
```

**Indexes:**

- `userId` (unique)
- `studentId` (unique)
- `collegeId`
- `departmentId`
- `currentSemester`
- `status`

---

### 3. **Professor Profile Schema**

```javascript
{
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Information
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[+]?[\d\s\-\(\)]+$/
  },
  alternatePhoneNumber: {
    type: String,
    match: /^[+]?[\d\s\-\(\)]+$/
  },

  // Address Information
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  // Professional Information
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['assistant-professor', 'associate-professor', 'professor', 'head-of-department', 'dean', 'visiting-faculty']
  },
  qualification: {
    type: String,
    required: true
  },
  specialization: [String],

  // Projects (Reference to Project Schema)
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],

  // Research Work (Reference to ResearchWork Schema)
  researchWork: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResearchWork'
  }],

  // Experience
  experience: {
    totalYears: {
      type: Number,
      required: true,
      min: 0
    },
    // Organizations (Reference to ExperienceOrganization Schema)
    organizations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExperienceOrganization'
    }]
  },

  // Academic Information
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Professional Status
  status: {
    type: String,
    enum: ['active', 'on-leave', 'retired', 'terminated'],
    default: 'active'
  },
  joiningDate: {
    type: Date,
    required: true
  },

  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  }
}
```

**Indexes:**

- `userId` (unique)
- `employeeId` (unique)
- `collegeId`
- `departmentId`
- `designation`
- `status`

---

### 3.1. **Project Schema (Referenced from Professor)**

```javascript
{
  // Professor Reference
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },

  // Project Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'on-hold'],
    default: 'ongoing'
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  fundingAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  collaborators: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }]
}
```

**Indexes:**

- `professorId`
- `status`
- `title` (text index)

---

### 3.2. **Research Work Schema (Referenced from Professor)**

```javascript
{
  // Professor Reference
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },

  // Research Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['journal', 'conference', 'book', 'chapter', 'patent'],
    required: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  publicationDate: {
    type: Date,
    default: null
  },
  venue: {
    type: String,
    default: "",
    trim: true
  },
  doi: {
    type: String,
    default: "",
    trim: true
  },
  url: {
    type: String,
    default: "",
    trim: true
  },
  citations: {
    type: Number,
    default: 0,
    min: 0
  },
  keywords: [{
    type: String,
    trim: true
  }],
  authors: [{
    type: String,
    trim: true
  }]
}
```

**Indexes:**

- `professorId`
- `type`
- `publicationDate` (descending)
- `title, description` (text index)

---

### 3.3. **Experience Organization Schema (Referenced from Professor)**

```javascript
{
  // Professor Reference
  professorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },

  // Organization Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    default: "",
    trim: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  location: {
    type: String,
    default: "",
    trim: true
  },
  isCurrentPosition: {
    type: Boolean,
    default: false
  }
}
```

**Indexes:**

- `professorId`
- `startDate` (descending)
- `isCurrentPosition`

---

### 4. **CLG-Admin Profile Schema**

```javascript
{
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Administrative Information
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: true,
    enum: ['principal', 'vice-principal', 'registrar', 'admin-officer', 'it-admin']
  },
  universityName: {
    type: String,
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Permissions
  permissions: {
    manageStudents: {
      type: Boolean,
      default: true
    },
    manageProfessors: {
      type: Boolean,
      default: true
    },
    manageDepartments: {
      type: Boolean,
      default: false
    },
    manageResults: {
      type: Boolean,
      default: true
    },
    manageEvents: {
      type: Boolean,
      default: true
    },
    manageResources: {
      type: Boolean,
      default: true
    },
    viewAnalytics: {
      type: Boolean,
      default: true
    }
  },

  // Subscription Information
  subscription: {
    planType: {
      type: String,
      enum: ['basic', 'premium', 'enterprise'],
      default: 'basic'
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    maxStudents: {
      type: Number,
      default: 1000
    },
    maxProfessors: {
      type: Number,
      default: 100
    }
  },

  // Contact Information
  phoneNumber: {
    type: String,
    required: true,
    match: /^[+]?[\d\s\-\(\)]+$/
  },
  alternatePhoneNumber: {
    type: String,
    match: /^[+]?[\d\s\-\(\)]+$/
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },

  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  }
}
```

**Indexes:**

- `userId` (unique)
- `adminId` (unique)
- `collegeId`
- `subscription.isActive`
- `status`

---

### 5. **College Schema**

```javascript
{
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  shortName: {
    type: String,
    trim: true,
    maxlength: 20
  },
  university: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },

  // Contact Information
  contactInfo: {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    website: String,
    fax: String
  },

  // Address
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    }
  },

  // Institutional Details
  establishedYear: {
    type: Number,
    required: true
  },
  collegeType: {
    type: String,
    enum: ['government', 'private', 'autonomous', 'deemed'],
    required: true
  },
  affiliation: {
    type: String,
    required: true
  },
  accreditation: {
    naac: {
      grade: String,
      score: Number,
      validUntil: Date
    },
    nba: {
      courses: [String],
      validUntil: Date
    }
  },

  // Administrative
  collegeCode: {
    type: String,
    required: true,
    unique: true
  },
  logo: String,

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'under-review'],
    default: 'active'
  },

  // Platform Settings
  platformSettings: {
    allowStudentRegistration: {
      type: Boolean,
      default: true
    },
    allowProfessorRegistration: {
      type: Boolean,
      default: false
    },
    requireAdminApproval: {
      type: Boolean,
      default: true
    }
  }
}
```

**Indexes:**

- `name`
- `collegeCode` (unique)
- `university`
- `status`

---

### 6. **Department Schema**

```javascript
{
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  shortName: {
    type: String,
    trim: true,
    maxlength: 10
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true,
    enum: ['engineering', 'science', 'arts', 'commerce', 'management', 'law', 'medicine', 'pharmacy']
  },

  // Academic Structure
  totalSemesters: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  degreeType: {
    type: String,
    required: true,
    enum: ['bachelor', 'master', 'doctorate', 'diploma', 'certificate']
  },
  duration: {
    years: {
      type: Number,
      required: true
    },
    months: {
      type: Number,
      default: 0
    }
  },

  // College Reference
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Department Details
  departmentCode: {
    type: String,
    required: true
  },
  description: String,
  vision: String,
  mission: String,

  // Head of Department
  hodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    default: null
  },

  // Capacity
  intake: {
    type: Number,
    required: true,
    min: 1
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'under-review'],
    default: 'active'
  },

  // Accreditation
  accreditation: {
    nba: {
      accredited: {
        type: Boolean,
        default: false
      },
      validUntil: Date
    },
    other: [String]
  }
}
```

**Indexes:**

- `collegeId`
- `departmentCode` + `collegeId` (compound unique)
- `field`
- `status`
- `hodId`

---

### 7. **Subject Schema**

```javascript
{
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },

  // Academic Information
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },

  // Subject Details
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  subjectType: {
    type: String,
    enum: ['core', 'elective', 'lab', 'project', 'internship'],
    required: true
  },
  category: {
    type: String,
    enum: ['theory', 'practical', 'both'],
    default: 'theory'
  },

  // Content Information
  syllabus: String,
  description: String,
  objectives: [String],
  outcomes: [String],

  // Prerequisites
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],

  // Assessment
  assessment: {
    internal: {
      type: Number,
      min: 0,
      max: 100,
      default: 30
    },
    external: {
      type: Number,
      min: 0,
      max: 100,
      default: 70
    },
    practicalMarks: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },

  // Instructors
  instructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  }],

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'deprecated'],
    default: 'active'
  }
}
```

**Indexes:**

- `departmentId`
- `subjectCode` + `departmentId` (compound unique)
- `semester`
- `subjectType`
- `status`

---

### 8. **Semester Schema**

```javascript
{
  // Basic Information
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  name: {
    type: String,
    trim: true
  },

  // Department Reference
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },

  // Academic Structure
  subjects: [{
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    isCore: {
      type: Boolean,
      default: true
    },
    isElective: {
      type: Boolean,
      default: false
    }
  }],

  // Semester Details
  totalCredits: {
    type: Number,
    required: true,
    min: 1
  },
  minCreditsRequired: {
    type: Number,
    required: true
  },

  // Timeline
  duration: {
    months: {
      type: Number,
      default: 6
    }
  },

  // Elective Groups
  electiveGroups: [{
    groupName: String,
    minSelection: {
      type: Number,
      default: 1
    },
    maxSelection: {
      type: Number,
      default: 1
    },
    subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }]
  }],

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'under-revision'],
    default: 'active'
  }
}
```

**Indexes:**

- `departmentId` + `number` (compound unique)
- `status`

---

### 9. **Result Schema**

```javascript
{
  // Academic Information
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  academicYear: {
    type: String,
    required: true
  },

  // Performance Metrics
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  sgpa: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },

  // Subject-wise Marks
  subjectResults: [{
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    internalMarks: {
      type: Number,
      min: 0,
      max: 100
    },
    externalMarks: {
      type: Number,
      min: 0,
      max: 100
    },
    practicalMarks: {
      type: Number,
      min: 0,
      max: 100
    },
    totalMarks: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    grade: {
      type: String,
      enum: ['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'AB'],
      required: true
    },
    gradePoints: {
      type: Number,
      min: 0,
      max: 10,
      required: true
    },
    credits: {
      type: Number,
      required: true
    },
    passed: {
      type: Boolean,
      required: true
    }
  }],

  // References
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Result Status
  resultStatus: {
    type: String,
    enum: ['pass', 'fail', 'pending', 'withheld'],
    required: true
  },

  // Additional Information
  totalCreditsEarned: {
    type: Number,
    required: true
  },
  totalCreditsAttempted: {
    type: Number,
    required: true
  },
  backlogs: {
    count: {
      type: Number,
      default: 0
    },
    subjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }]
  },

  // Publication Details
  publishedDate: {
    type: Date,
    required: true
  },
  resultType: {
    type: String,
    enum: ['regular', 'supplementary', 'improvement'],
    default: 'regular'
  },

  // Verification
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  },
  verificationDate: Date
}
```

**Indexes:**

- `studentId` + `semester` + `academicYear` (compound unique)
- `collegeId`
- `departmentId`
- `resultStatus`
- `publishedDate`

---

### 10. **Club Schema**

```javascript
{
  // Basic Information
  clubName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },

  // Visual Assets
  logo: String,
  bannerImage: String,

  // College Reference
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Club Details
  clubType: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'academic', 'social-service', 'hobby', 'professional'],
    required: true
  },
  establishedDate: {
    type: Date,
    required: true
  },

  // Leadership
  leadership: {
    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    vicePresident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    treasurer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    facultyAdvisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor'
    }
  },

  // Membership
  members: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    role: {
      type: String,
      enum: ['member', 'coordinator', 'head', 'president', 'vice-president', 'secretary', 'treasurer'],
      default: 'member'
    },
    joinedDate: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],

  // Settings
  membershipType: {
    type: String,
    enum: ['open', 'invite-only', 'application-based'],
    default: 'open'
  },
  maxMembers: {
    type: Number,
    default: 100
  },

  // Contact Information
  contactInfo: {
    email: String,
    phone: String,
    socialMedia: {
      instagram: String,
      twitter: String,
      linkedin: String,
      facebook: String,
      website: String
    }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'under-review'],
    default: 'active'
  },

  // Statistics
  stats: {
    totalEvents: {
      type: Number,
      default: 0
    },
    totalMembers: {
      type: Number,
      default: 0
    },
    yearlyBudget: Number
  }
}
```

**Indexes:**

- `collegeId`
- `clubType`
- `status`
- `members.studentId`

---

### 11. **Event Schema**

```javascript
{
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    maxlength: 300
  },

  // Event Details
  eventType: {
    type: String,
    enum: ['workshop', 'seminar', 'conference', 'competition', 'cultural', 'sports', 'hackathon', 'placement', 'other'],
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'academic', 'social'],
    required: true
  },

  // Timeline
  startingDate: {
    type: Date,
    required: true
  },
  endingDate: {
    type: Date,
    required: true
  },
  registrationStartDate: {
    type: Date,
    required: true
  },
  registrationEndDate: {
    type: Date,
    required: true
  },

  // Venue
  venue: {
    type: {
      type: String,
      enum: ['physical', 'virtual', 'hybrid'],
      required: true
    },
    location: String,
    address: String,
    meetingLink: String,
    capacity: Number
  },

  // Registration
  registrationRequired: {
    type: Boolean,
    default: true
  },
  registrationLink: String,
  registrationFee: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  maxParticipants: Number,

  // Participants
  registeredStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    attended: {
      type: Boolean,
      default: false
    },
    certificateIssued: {
      type: Boolean,
      default: false
    }
  }],

  // Organizers
  organizers: {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    externalOrganizer: String
  },

  // References
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Visibility & Access
  visibility: {
    type: String,
    enum: ['public', 'private', 'college-only', 'department-only'],
    default: 'college-only'
  },

  // Content
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['document', 'video', 'link', 'image']
    },
    url: String,
    description: String
  }],

  // Event Coordinators
  coordinators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  facultyCoordinators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  }],

  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed', 'ongoing'],
    default: 'draft'
  },

  // Images
  bannerImage: String,
  gallery: [String],

  // Feedback
  feedbackEnabled: {
    type: Boolean,
    default: true
  },
  ratings: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Statistics
  stats: {
    totalRegistrations: {
      type: Number,
      default: 0
    },
    totalAttendees: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    }
  }
}
```

**Indexes:**

- `collegeId`
- `startingDate`
- `eventType`
- `status`
- `visibility`
- `registeredStudents.studentId`

---

### 12. **Resource Schema**

```javascript
{
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },

  // Resource Content
  resourceType: {
    type: String,
    enum: ['video', 'document', 'link', 'image', 'audio', 'presentation'],
    required: true
  },
  contentUrl: {
    type: String,
    required: true
  },

  // Legacy fields (for backward compatibility)
  videoLink: String,
  pdfLink: String,

  // Additional Content
  thumbnailUrl: String,
  fileSize: Number, // in bytes
  duration: Number, // for videos/audio in seconds

  // Classification
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    enum: ['lecture', 'tutorial', 'reference', 'assignment', 'project', 'research', 'textbook', 'other'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },

  // Academic Context
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  semester: Number,

  // Content Details
  language: {
    type: String,
    default: 'English'
  },
  author: String,
  publisher: String,
  publicationDate: Date,

  // Access Control
  visibility: {
    type: String,
    enum: ['public', 'college-only', 'department-only', 'subject-only'],
    default: 'college-only'
  },
  accessLevel: {
    type: String,
    enum: ['free', 'premium', 'restricted'],
    default: 'free'
  },

  // Upload Information
  uploadedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userType: {
      type: String,
      enum: ['student', 'professor', 'admin'],
      required: true
    }
  },

  // Moderation
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'flagged'],
    default: 'pending'
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderationDate: Date,
  moderationNotes: String,

  // Engagement
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  likes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },

  // Metadata
  metadata: {
    source: String,
    copyright: String,
    license: String,
    version: String
  }
}
```

**Indexes:**

- `collegeId`
- `departmentId`
- `subjectId`
- `category`
- `tags`
- `uploadedBy.userId`
- `moderationStatus`
- `status`

---

### 13. **E-Library Schema**

```javascript
{
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },

  // Book/Document Details
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  edition: String,
  publicationYear: Number,

  // Authors and Publishers
  authors: [{
    name: {
      type: String,
      required: true
    },
    bio: String
  }],
  publisher: {
    name: String,
    location: String
  },

  // Content
  contentType: {
    type: String,
    enum: ['book', 'journal', 'research-paper', 'thesis', 'magazine', 'newspaper', 'reference'],
    required: true
  },
  format: {
    type: String,
    enum: ['pdf', 'epub', 'mobi', 'doc', 'docx', 'txt'],
    required: true
  },

  // File Information
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: Number, // in bytes
  totalPages: Number,

  // Legacy field (for backward compatibility)
  pdfLink: String,

  // Classification
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  subjects: [String],
  topics: [String],

  // Academic Context
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },

  // Library Classification
  deweyDecimal: String,
  libraryCode: String,
  shelfLocation: String,

  // Access Control
  visibility: {
    type: String,
    enum: ['public', 'college-only', 'department-only', 'restricted'],
    default: 'college-only'
  },
  accessType: {
    type: String,
    enum: ['free', 'paid', 'subscription'],
    default: 'free'
  },
  downloadAllowed: {
    type: Boolean,
    default: true
  },

  // Upload Information
  uploadedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userType: {
      type: String,
      enum: ['student', 'professor', 'admin'],
      required: true
    }
  },

  // Moderation
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'copyright-issue'],
    default: 'pending'
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderationDate: Date,

  // Engagement
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  favorites: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    favoritedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Reviews
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    helpful: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Statistics
  stats: {
    averageRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    totalFavorites: {
      type: Number,
      default: 0
    }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived', 'copyright-claimed'],
    default: 'active'
  },

  // Copyright and Legal
  copyright: {
    owner: String,
    year: Number,
    license: String,
    termsOfUse: String
  }
}
```

**Indexes:**

- `collegeId`
- `departmentId`
- `contentType`
- `tags`
- `isbn` (unique, sparse)
- `uploadedBy.userId`
- `moderationStatus`
- `status`

---

## 🔗 **Relationships Summary**

### **One-to-One Relationships**

- User ↔ Student (via userId)
- User ↔ Professor (via userId)
- User ↔ CLG-Admin (via userId)

### **One-to-Many Relationships**

- College → Departments
- College → Students
- College → Professors
- College → Clubs
- College → Events
- Department → Subjects
- Department → Students
- Department → Professors
- Professor → Subjects (teaches)
- Student → Results

### **Many-to-Many Relationships**

- Students ↔ Clubs (members)
- Students ↔ Events (registrations)
- Professors ↔ Subjects (teaches)
- Subjects ↔ Prerequisites
- Semester ↔ Subjects

---

## 📊 **Additional Considerations**

### **Data Validation**

- Email format validation
- Phone number format validation
- Date range validations
- Enum value validations
- Required field validations

### **Performance Optimization**

- Compound indexes for frequent queries
- Text indexes for search functionality
- Sparse indexes for optional unique fields
- TTL indexes for temporary data

### **Security Measures**

- Password hashing (bcrypt)
- JWT token management
- Rate limiting on sensitive operations
- Input sanitization
- CORS configuration

### **Audit Trail**

- All schemas include `createdAt` and `updatedAt` timestamps
- Consider adding audit logs for sensitive operations
- Track user activities and changes

### **Future Enhancements**

- Notification schema for system alerts
- Message/Chat schema for communication
- Assignment/Quiz schema for assessments
- Attendance schema for tracking
- Fee management schema
- Timetable/Schedule schema

---

## 🚀 **Implementation Roadmap**

### **Phase 1: Core Foundation**

1. User authentication system
2. Basic profile models (Student, Professor, CLG-Admin)
3. College and Department management

### **Phase 2: Academic Structure**

1. Subject and Semester management
2. Result management system
3. Resource sharing platform

### **Phase 3: Community Features**

1. Club management
2. Event management
3. E-Library system

### **Phase 4: Advanced Features**

1. Analytics and reporting
2. Notification system
3. Mobile app integration
4. Advanced search and filtering

---

This schema design provides a robust foundation for the CKsEdu platform while maintaining flexibility for future enhancements and scalability requirements.
