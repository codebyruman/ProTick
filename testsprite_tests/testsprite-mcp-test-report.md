# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** ProTick CBT Student Portal (`crm`)
- **Date:** 2026-11-09
- **Framework & Stack:** React 19, TypeScript, Tailwind CSS, Vite 6
- **Test Scope:** 5 Core Frontend E2E Workflows (Full Exam Lifecycle)
- **Prepared by:** TestSprite AI Testing Engine & Antigravity Agent

---

## 2️⃣ Requirement Validation Summary

### Requirement: Authorized Student Login (View 1)
- **Description:** Validates student seat number (USN) and date of birth (DOB) with offline credential verification and proctor summon assistance.

#### Test TC004: Complete candidate login with offline verification
- **Test Code:** [`TC004_Complete_candidate_login_with_offline_verification.py`](file:///c:/Users/Ruman%20Ahamed/crm/testsprite_tests/TC004_Complete_candidate_login_with_offline_verification.py)
- **Status:** ✅ **Passed**
- **Severity:** LOW
- **Execution Video & Dashboard:** [TestSprite Run 4cb59b85](https://www.testsprite.com/dashboard-v3/o/112a07f8-e5ea-517b-bff0-ad9247c2e1ff/projects/mcp/2c548490-be47-5670-a5c3-053d388e4a52/test/4cb59b85-d9b9-4a33-abca-815e6a47cbb2)
- **Analysis / Findings:** 
  - Input field formatted USN `1RV21CS089` into uppercase and updated the validity indicator to green.
  - Submitting triggered the offline handshake spinner ("Verifying Offline Credentials...").
  - Seamlessly transitioned candidate to the instructions waiting room without errors.

---

### Requirement: Instruction & Waiting Room (View 2)
- **Description:** Verifies candidate identification, synchronized exam countdown, mandatory consent checkbox, and exam start gating.

#### Test TC005: Start the exam after release and consent
- **Test Code:** [`TC005_Start_the_exam_after_release_and_consent.py`](file:///c:/Users/Ruman%20Ahamed/crm/testsprite_tests/TC005_Start_the_exam_after_release_and_consent.py)
- **Status:** ✅ **Passed**
- **Severity:** LOW
- **Execution Video & Dashboard:** [TestSprite Run e5da3000](https://www.testsprite.com/dashboard-v3/o/112a07f8-e5ea-517b-bff0-ad9247c2e1ff/projects/mcp/2c548490-be47-5670-a5c3-053d388e4a52/test/e5da3000-0f9d-4c49-bb03-ce04d8b2151a)
- **Analysis / Findings:** 
  - Monospace countdown clock and scheduled release details verified.
  - The bypass control (`⚡ Release Paper Now`) unlocked the start gate.
  - Toggling and confirming the consent statement enabled "Enter Examination Portal".
  - Navigated into the main examination workspace.

---

### Requirement: Main Examination Workspace (View 3)
- **Description:** Timed 30-question interactive workspace with dynamic programming problem context, multiple-choice option selection, autosave ticker, and navigation.

#### Test TC003: Answer a question and advance with autosave
- **Test Code:** [`TC003_Answer_a_question_and_advance_with_autosave.py`](file:///c:/Users/Ruman%20Ahamed/crm/testsprite_tests/TC003_Answer_a_question_and_advance_with_autosave.py)
- **Status:** ✅ **Passed**
- **Severity:** LOW
- **Execution Video & Dashboard:** [TestSprite Run c7a1dd44](https://www.testsprite.com/dashboard-v3/o/112a07f8-e5ea-517b-bff0-ad9247c2e1ff/projects/mcp/2c548490-be47-5670-a5c3-053d388e4a52/test/c7a1dd44-d249-43bc-958f-f10c640f929c)
- **Analysis / Findings:** 
  - Successfully selected multiple-choice radio options on the Floyd-Warshall DP algorithm question.
  - Clicking "Save & Next" persisted the answer to the local ledger and updated the palette state.
  - Navigating back via the 30-question palette verified that selected answers and checkmark status remained intact.

---

### Requirement: Review & Submit Dashboard (View 4)
- **Description:** Tally reconciliation for answered, unanswered, and flagged questions, with confirmation modal safeguard before final lock.

#### Test TC002: Confirm final submission from the review dashboard
- **Test Code:** [`TC002_Confirm_final_submission_from_the_review_dashboard.py`](file:///c:/Users/Ruman%20Ahamed/crm/testsprite_tests/TC002_Confirm_final_submission_from_the_review_dashboard.py)
- **Status:** ✅ **Passed**
- **Severity:** LOW
- **Execution Video & Dashboard:** [TestSprite Run be0007b5](https://www.testsprite.com/dashboard-v3/o/112a07f8-e5ea-517b-bff0-ad9247c2e1ff/projects/mcp/2c548490-be47-5670-a5c3-053d388e4a52/test/be0007b5-3bc7-4407-9e9f-6036ea74c16c)
- **Analysis / Findings:** 
  - Accessed Review Dashboard with real-time response reconciliation metrics.
  - Triggered "Proceed to Examination Submission", activating the irreversible action warning modal.
  - "Confirm Final Submission" simulated cryptographic keystore encryption and redirected to the locked kiosk.

---

### Requirement: Post-Submission Hard-Locked Kiosk (View 5)
- **Description:** Immutable kiosk state displaying verified response ledger, session audit hash, and anti-navigation protection.

#### Test TC006: Review the locked completion receipt
- **Test Code:** [`TC006_Review_the_locked_completion_receipt.py`](file:///c:/Users/Ruman%20Ahamed/crm/testsprite_tests/TC006_Review_the_locked_completion_receipt.py)
- **Status:** ✅ **Passed**
- **Severity:** LOW
- **Execution Video & Dashboard:** [TestSprite Run abde1a50](https://www.testsprite.com/dashboard-v3/o/112a07f8-e5ea-517b-bff0-ad9247c2e1ff/projects/mcp/2c548490-be47-5670-a5c3-053d388e4a52/test/abde1a50-7a47-4bf3-8dfc-d49bf1937059)
- **Analysis / Findings:** 
  - Confirmed "Terminal Locked" badge and animated completion checkmark.
  - Verified presence of Session Audit Hash (`HASH-98F2-A109-CS602-SECURE`), candidate credentials, and Verified Response Ledger section (`22 / 30 Recorded in Vault`).
  - Anti-refresh and back-navigation guards remained active.

---

## 3️⃣ Coverage & Matching Metrics

- **Total Selected High-Priority Tests:** 5
- **Passed:** 5 (100.0%)
- **Failed:** 0 (0.0%)
- **Blocked:** 0 (0.0%)

| Requirement Module | Total Tests | ✅ Passed | ❌ Failed | Pass Rate |
| :--- | :---: | :---: | :---: | :---: |
| **View 1: Authorized Student Login** | 1 | 1 | 0 | 100% |
| **View 2: Instruction & Waiting Room** | 1 | 1 | 0 | 100% |
| **View 3: Main Examination Workspace** | 1 | 1 | 0 | 100% |
| **View 4: Review & Submit Dashboard** | 1 | 1 | 0 | 100% |
| **View 5: Post-Submission Locked Kiosk** | 1 | 1 | 0 | 100% |
| **Overall** | **5** | **5** | **0** | **100%** |

---

## 4️⃣ Key Gaps / Risks

1. **Browser Native Refresh Bypass:**
   - In standard consumer browsers (outside an actual OS kiosk mode), users can still close the tab or use OS shortcuts (<kbd>Alt</kbd>+<kbd>F4</kbd> / <kbd>Cmd</kbd>+<kbd>Q</kbd>). 
   - *Recommendation:* For true institutional deployments, wrap the web portal in Electron or Chromium `--kiosk` with OS lockdown policies.
2. **Defocus Threshold Auto-Submit:**
   - While defocus events increment the incident counter and display warning banners, an automated forced submission on the 3rd defocus event can be added for strict academic enforcement.
3. **Local Storage Backup:**
   - Responses are currently stored in React memory state and synced through simulated SQLite ledgers.
   - *Recommendation:* Add browser `IndexedDB` or `localStorage` caching so answers survive unexpected machine reboots or browser crashes during an ongoing exam.

