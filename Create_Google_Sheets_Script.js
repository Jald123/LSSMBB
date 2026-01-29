/**
 * @OnlyCurrentDoc
 */

function setupLeanSixSigmaDatabase() {
    const rootFolderName = "LEAN SIX SIGMA INTERACTIVE PLATFORM";
    const dbFolderName = "00-GOOGLE-SHEETS-DATABASES";

    // 1. Create Folder Structure
    const rootFolder = createOrGetFolder(DriveApp.getRootFolder(), rootFolderName);
    const dbFolder = createOrGetFolder(rootFolder, dbFolderName);

    // 2. Define Data Structures
    const datasets = [
        {
            name: "Users_Data",
            headers: ["UserID", "FirstName", "LastName", "Email", "PhoneNumber", "Company", "JobTitle", "RegistrationDate", "CurrentBeltLevel", "YellowBeltStatus", "GreenBeltStatus", "BlackBeltStatus", "TotalXPPoints", "CertificateURL", "PreferredLanguage", "NotificationEmail"],
            sample: ["USR001", "Ahmed", "Al-Rashid", "ahmed@email.com", "+966501234567", "Saudi Aramco", "Process Engineer", "2025-01-15", "Yellow", "In Progress", "Not Started", "Not Started", 1250, "/cert/USR001_YB.pdf", "Arabic", true]
        },
        {
            name: "Courses_Content",
            headers: ["CourseID", "BeltLevel", "ModuleNumber", "ModuleTitle", "Description", "LearningObjectives", "ContentHTML", "EstimatedMinutes", "VideoURL", "InteractiveExerciseID", "AssignmentTemplateID", "QuizID", "PrerequisiteModuleID", "DifficultyLevel", "XPReward", "Order"],
            sample: ["YB_M01", "Yellow Belt", 1, "Foundations of Lean Six Sigma", "[Long description]", "[Objectives]", "[HTML]", 45, "https://youtube.com/...", "EXR_YB_M01_01", "TPL_PROJECT_CHARTER", "QUIZ_YB_M01", "YB_M00", "Beginner", 100, 1]
        },

        {
            name: "Templates_Library",
            headers: ["TemplateID", "TemplateName", "Category", "BeltLevel", "DMACPhase", "Description", "TemplateType", "FormFields", "AutoCalculatedFields", "DownloadFormat", "UsageCount"],
            sample: ["TPL_001", "Project Charter", "Define", "Yellow", "Define", "Formal project initiation document", "Form", "ProjectName, Sponsor, Scope, Budget", "ROI, Duration", "PDF, Excel", 0]
        },
        {
            name: "Template_AutoFill_Rules",
            headers: ["RuleID", "SourceTemplate", "TargetTemplate", "SourceField", "TargetField", "TransformationLogic"],
            sample: ["RULE_001", "Project Charter", "SIPOC Diagram", "ProcessName", "ProcessName", "Direct copy"]
        },
        {
            name: "Statistical_Data",
            headers: ["DataID", "ProjectID", "MetricName", "DateRecorded", "Value", "Unit", "DataType", "ProcessStep", "BatchNumber"],
            sample: ["DATA_001", "PROJ_001", "ProcessingTime", "2025-01-20", 8.5, "days", "Continuous", "Invoice_Data_Entry", "Batch_01"]
        },
        {
            name: "Statistical_Formulas",
            headers: ["FormulaID", "FormulaName", "FormulaType", "Category", "UseCase", "Equation", "Parameters"],
            sample: ["STAT_001", "Mean (Average)", "Descriptive", "Central Tendency", "Calculate average", "=SUM(Data)/COUNT(Data)", "Data range"]
        },
        {
            name: "Activity_Log",
            headers: ["ActivityID", "Timestamp", "UserEmail", "UserID", "ActivityType", "EntityType", "EntityID", "ValueNum", "ValueText"],
            sample: ["LOG_001", "2025-01-20 10:30:00", "user@email.com", "USR001", "Login", "App", "-", "-", "Login Success"]
        },
        {
            name: "KPI_Snapshots_Daily",
            headers: ["SnapshotID", "UserID", "SnapshotDate", "ModulesCompleted", "ModulesTotal", "CompletionPercent", "AvgQuizScore", "ProjectsActive", "TemplatesCompleted", "XPPoints", "StreakDays"],
            sample: ["SNAP_001", "USR001", "2025-01-20", 1, 15, 0.06, 85, 1, 0, 1250, 1]
        },
        {
            name: "Mentor_Queue",
            headers: ["QueueID", "MentorID", "LearnerID", "BeltLevel", "ItemType", "ItemID", "Status", "SubmittedAt", "ReviewedAt", "Feedback"],
            sample: ["Q_001", "USR002", "USR001", "Yellow", "Project Gate", "PROJ_001_Charter", "Pending", "2025-01-22 14:00:00", "-", "-"]
        },
        {
            name: "XP_Rules",
            headers: ["RuleID", "TriggerActivityType", "ConditionExpr", "XPValue", "MaxPerDay", "IsActive", "Description"],
            sample: ["XP_001", "CompleteLesson", "-", 20, 5, "TRUE", "Complete a single lesson page"]
        },
        {
            name: "Badges",
            headers: ["BadgeID", "BadgeName", "BeltLevel", "Icon", "CriteriaType", "CriteriaValue", "Description", "IsActive"],
            sample: ["BDG_001", "Define Phase Starter", "Yellow", "🏁", "ModulesCompleted", 3, "Earned after completing 3 modules", "TRUE"]
        },
        {
            name: "User_Badges",
            headers: ["UserBadgeID", "UserID", "BadgeID", "EarnedDateTime", "EvidenceEntityType", "EvidenceEntityID"],
            sample: ["UB_001", "USR001", "BDG_001", "2025-01-20 10:00:00", "Module", "YB_M03"]
        },
        {
            name: "Notifications",
            headers: ["NotificationID", "UserID", "Type", "Title", "Message", "DeepLinkView", "DeepLinkRowKey", "IsRead", "CreatedAt"],
            sample: ["NTF_001", "USR001", "Congrats", "Badge Unlocked!", "You earned 'Define Phase Starter'", "Achievements", "BDG_001", "FALSE", "2025-01-20 10:01:00"]
        },
        {
            name: "Mentor_Assignments",
            headers: ["AssignmentID", "LearnerID", "MentorID", "AssignmentMode", "BeltLevel", "Active", "StartDate"],
            sample: ["MA_001", "USR001", "USR002", "LearnerChoice", "Yellow", "TRUE", "2025-01-15"]
        },
        {
            name: "Certification_Requirements",
            headers: ["ReqID", "BeltLevel", "RequirementType", "RequirementValue", "IsMandatory", "Order", "Notes"],
            sample: ["CR_YB_001", "Yellow", "ModulesComplete", "ALL", "TRUE", 10, "Complete all Yellow Belt modules"]
        },
        {
            name: "Certification_Status",
            headers: ["CertStatusID", "UserID", "BeltLevel", "Status", "CompletionPercent", "MissingItems", "MentorID", "MentorDecision", "MentorFeedback", "AdminDecision", "AdminFeedback", "IssuanceMode", "CertificateNumber", "CertificateFileURL", "IssuedAt"],
            sample: ["CS_USR001_YELLOW", "USR001", "Yellow", "InProgress", 0.5, "Project Gate Define", "USR002", "Pending", "-", "Pending", "-", "Auto", "-", "-", "-"]
        },
        {
            name: "Certificate_Templates",
            headers: ["CertTemplateID", "BeltLevel", "AwardType", "TemplateFileURL", "OutputFormat", "StorageFolderURL", "FieldsMap"],
            sample: ["CT_YELLOW_V1", "Yellow", "BeltCertification", "https://docs.google.com/...", "PDF", "/Certificates/Yellow", "{...}"]
        },
        {
            name: "Certification_Policies",
            headers: ["PolicyID", "BeltLevel", "AwardType", "IssuanceMode", "RequireMentorApproval", "RequireAdminApproval", "AutoIssueDelayHours", "FraudCheckSampleRate", "Notes"],
            sample: ["POL_YB_CERT", "Yellow", "BeltCertification", "Human", "TRUE", "TRUE", 48, 1.0, "External verification required"]
        },
        {
            name: "Certificate_Issuance_Log",
            headers: ["IssueID", "CertStatusID", "TriggerType", "TriggeredBy", "CreatedAt", "FileURL", "Notes"],
            sample: ["ISS_001", "CS_TEST", "Auto", "System", "2025-01-01", "/certs/test.pdf", "Log entry"]
        },
        {
            name: "Certificate_Verification",
            headers: ["CertificateNumber", "UserFullName", "BeltLevel", "AwardType", "IssuedAt", "Status", "PublicNotes"],
            sample: ["LSS-YB-2025-001", "Ahmed Al-Rashid", "Yellow", "BeltCertification", "2025-01-20 09:00:00", "Valid", "Completed top of class"]
        },
        {
            name: "Project_Gates",
            headers: ["GateID", "BeltLevel", "DMAICPhase", "GateName", "RequiredTemplates", "RequiredEvidence", "MentorApprovalRequired", "AdminApprovalRequired", "Order"],
            sample: ["PG_YB_DEFINE", "Yellow", "Define", "Define Gate", "TPL_CHARTER", "Problem Statement", "TRUE", "FALSE", 1]
        },
        {
            name: "Users_Data",
            headers: ["UserID", "FirstName", "LastName", "Email", "Role", "IsActive", "PhoneNumber", "Company", "JobTitle", "RegistrationDate", "CurrentBeltLevel", "YellowBeltStatus", "GreenBeltStatus", "BlackBeltStatus", "TotalXPPoints", "CertificateURL", "PreferredLanguage"],
            sample: ["USR001", "Ahmed", "Al-Rashid", "ahmed@email.com", "Learner", "TRUE", "+966501234567", "Saudi Aramco", "Process Engineer", "2025-01-15", "Yellow", "In Progress", "Not Started", "Not Started", 1250, "", "Arabic"]
        },
        {
            name: "Quiz_Questions",
            headers: ["QuestionID", "BeltLevel", "ModuleID", "QuestionText", "QuestionType", "AnswerA", "AnswerB", "AnswerC", "AnswerD", "CorrectAnswer", "Explanation", "DifficultyLevel", "XPReward"],
            sample: ["Q_YB_M01_001", "Yellow Belt", "YB_M01", "What does DMAIC stand for?", "Multiple Choice", "Define...", "Data...", "...", "...", "A", "Explanation...", "Easy", 50]
        },
        {
            name: "Project_Tracking",
            headers: ["ProjectID", "UserID", "ProjectTitle", "BeltLevel", "Status", "DMACIPhase", "StartDate", "PlannedEndDate", "ActualEndDate", "ProjectCharter", "CurrentMetricBaseline", "TargetMetric", "ProjectedSavings", "SaveingsType", "PercentComplete", "MentorID"],
            sample: ["PROJ_001", "USR001", "Reduce Processing Time", "Green Belt", "In Progress", "Analyze", "2025-01-20", "2025-06-20", "", "[Link]", 15.5, 8.2, 250000, "SAR", 35, "USR010"]
        },
        {
            name: "User_Progress",
            headers: ["ProgressID", "UserID", "BeltLevel", "CourseID", "CompletionPercentage", "QuizScore", "ProjectSubmissionID", "CompletionDate", "TimeSpentMinutes", "Badges", "Strengths", "Improvements"],
            sample: ["PROG_001", "USR001", "Yellow Belt", "YB_M01", 100, 92, "SUBM_001", "2025-01-25", 240, "Foundations Master", "Strong stats", "More projects"]
        },
        {
            name: "Belt_Levels",
            headers: ["BeltLevelID", "BeltName", "Hours", "Description", "Difficulty", "Color", "Prerequisites", "Icon", "ActionLabel", "Benefits"],
            sample: ["BLT002", "Yellow Belt", 80, "Team member level", "Beginner", "#FFE066", "White Belt", "🟡", "Start Yellow Belt", "• Understand DMAIC\n• Use basic tools"]
        },
        {
            name: "Certifications",
            headers: ["CertificationID", "UserID", "BeltLevel", "IssueDate", "ExpiryDate", "CertificateURL", "Status", "ExamScore"],
            sample: ["CERT_001", "USR001", "Yellow Belt", "2025-02-15", "2028-02-15", "/cert/USR001_YB.pdf", "Active", 92]
        },
        {
            name: "Statistical_Data",
            headers: ["StatID", "Category", "FormulaName", "Description", "ExcelFunction", "GoogleSheetsFunction", "ExampleUsage"],
            sample: ["STAT_001", "Descriptive", "Mean", "Average of a dataset", "=AVERAGE(A:A)", "=AVERAGE(A:A)", "Calculate average"]
        },
        {
            name: "Discussions_Forum",
            headers: ["PostID", "UserID", "Topic", "Content", "Category", "Timestamp", "RepliesCount", "ViewsCount", "LastReplyDate"],
            sample: ["POST_001", "USR001", "DMAIC vs DMADV", "What is the difference?", "Methodology", "2025-01-20", 3, 45, "2025-01-21"]
        },
        {
            name: "App_Menu",
            headers: ["MenuID", "Title", "Subtitle", "Icon", "TargetView", "Order"],
            sample: ["MENU_001", "Start Your Journey", "Choose your path", "🎓", "Belt_Selection_View", 1]
        }
    ];

    // 3. Create Files
    datasets.forEach(data => {
        createSpreadsheet(dbFolder, data.name, data.headers, data.sample);
    });

    Logger.log("All databases created successfully!");
}

function createOrGetFolder(parent, name) {
    const folders = parent.getFoldersByName(name);
    if (folders.hasNext()) {
        return folders.next();
    } else {
        return parent.createFolder(name);
    }
}

function createSpreadsheet(folder, name, headers, sampleRow) {
    // Check if file exists to avoid duplicates
    const files = folder.getFilesByName(name);
    if (files.hasNext()) {
        Logger.log("Skipping existing file: " + name);
        return;
    }

    const ss = SpreadsheetApp.create(name);
    const sheet = ss.getSheets()[0];

    // Set Headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#f3f3f3");

    // Set Sample Row
    if (sampleRow && sampleRow.length > 0) {
        sheet.getRange(2, 1, 1, sampleRow.length).setValues([sampleRow]);
    }

    // Move to correct folder (SpreadsheetApp creates in root by default)
    const file = DriveApp.getFileById(ss.getId());
    file.moveTo(folder);

    Logger.log("Created: " + name);
}
