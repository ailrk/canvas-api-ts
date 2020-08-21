export type Permission =
  //[For Account-Level Roles Only]
  | "become_user"                      // Users - act as
  | "import_sis"                       // SIS Data - import
  | "manage_account_memberships"       // Admins - add / remove
  | "manage_account_settings"          // Account-level settings - manage
  | "manage_alerts"                    // Global announcements - add / edit / delete
  | "manage_catalog"                   // Catalog - manage
  | "manage_courses"                   // Courses - add / edit / delete
  | "manage_developer_keys"            // Developer keys - manage
  | "manage_feature_flags"             // Feature Options - enable / disable
  | "manage_global_outcomes"           // Manage learning outcomes
  | "manage_jobs"                      // Manage background jobs
  | "manage_master_courses"            // Blueprint Courses - add / edit / associate / delete
  | "manage_role_overrides"            // Permissions - manage
  | "manage_storage_quotas"            // Storage Quotas - manage
  | "manage_sis"                       // SIS data - manage
  | "manage_site_settings"             // Manage site-wide and plugin settings
  | "manage_user_logins"               // Users - manage login details
  | "manage_user_observers"            // Users - add / remove observers
  | "moderate_user_content"            // Users - moderate user-created content
  | "read_course_content"              // Course Content - view
  | "read_course_list"                 // Courses - view list
  | "read_messages"                    // View notifications sent to users
  | "reset_any_mfa"                    // Reset multi-factor authentication
  | "site_admin"                       // Use the Site Admin section and admin all other accounts
  | "view_course_changes"              // Courses - view change logs
  | "view_error_reports"               // View error reports
  | "view_feature_flags"               // Feature Options - view
  | "view_grade_changes"               // Grades - view change logs
  | "view_jobs"                        // View background jobs
  | "view_notifications"               // Notifications - view
  | "view_quiz_answer_audits"          // Quizzes - view submission log
  | "view_statistics"                  // Statistics - view
  | "undelete_courses"                 // Courses - undelete

  // [For both Account-Level and Course-Level roles]
  // Note: Applicable enrollment types for course-level roles are given in brackets:
  //       S = student, T = teacher, A = TA, D = designer, O = observer.
  //       Lower-case letters indicate permissions that are off by default.
  //       A missing letter indicates the permission cannot be enabled for the role
  //       or any derived custom roles.
  | "change_course_state"              // [ TaD ] Course State - manage
  | "create_collaborations"            // [STADo] Student Collaborations - create
  | "create_conferences"               // [STADo] Web conferences - create
  | "create_forum"                     // [STADo] Discussions - create
  | "generate_observer_pairing_code"   // [ tado] Users - Generate observer pairing codes for students
  | "import_outcomes"                  // [ TaDo] Learning Outcomes - import
  | "lti_add_edit"                     // [ TAD ] LTI - add / edit / delete
  | "manage_admin_users"               // [ Tad ] Users - add / remove teachers, course designers, or TAs in courses
  | "manage_assignments"               // [ TADo] Assignments and Quizzes - add / edit / delete
  | "manage_calendar"                  // [sTADo] Course Calendar - add / edit / delete events
  | "manage_content"                   // [ TADo] Course Content - add / edit / delete
  | "manage_course_visibility"         // [ TAD ] Course - change visibility
  | "manage_files"                     // [ TADo] Course Files - add / edit / delete
  | "manage_grades"                    // [ TA  ] Grades - edit
  | "manage_groups"                    // [ TAD ] Groups - add / edit / delete
  | "manage_interaction_alerts"        // [ Ta  ] Alerts - add / edit / delete
  | "manage_outcomes"                  // [sTaDo] Learning Outcomes - add / edit / delete
  | "manage_sections"                  // [ TaD ] Course Sections - add / edit / delete
  | "manage_students"                  // [ TAD ] Users - add / remove students in courses
  | "manage_user_notes"                // [ TA  ] Faculty Journal - manage entries
  | "manage_rubrics"                   // [ TAD ] Rubrics - add / edit / delete
  | "manage_wiki"                      // [ TADo] Pages - add / edit / delete
  | "moderate_forum"                   // [sTADo] Discussions - moderate
  | "post_to_forum"                    // [STADo] Discussions - post
  | "read_announcements"               // [STADO] Announcements - view
  | "read_email_addresses"             // [sTAdo] Users - view primary email address
  | "read_forum"                       // [STADO] Discussions - view
  | "read_question_banks"              // [ TADo] Question banks - view and link
  | "read_reports"                     // [ TAD ] Courses - view usage reports
  | "read_roster"                      // [STADo] Users - view list
  | "read_sis"                         // [sTa  ] SIS Data - read
  | "select_final_grade"               // [ TA  ] Grades - select final grade for moderation
  | "send_messages"                    // [STADo] Conversations - send messages to individual course members
  | "send_messages_all"                // [sTADo] Conversations - send messages to entire class
  | "view_all_grades"                  // [ TAd ] Grades - view all grades
  | "view_audit_trail"                 // [ t   ] Grades - view audit trail
  | "view_group_pages"                 // [sTADo] Groups - view all student groups
  | "view_user_logins"                 // [ TA  ] Users - view login IDs
  ;
