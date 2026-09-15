

[![Live Demo](https://sih-converge.vercel.app/)](https://sih-converge.vercel.app/)
[![Built with React](https://img.shields.io/badge/Frontend-React%20%2B%20Tailwind-blue?style=for-the-badge&logo=react)](https://temporary-quick-fiddle-2rtjxzb.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🚀 **Live Interactive Deployment:** [[https://sih-converge.vercel.app/](https://sih-converge.vercel.app/)](https://mythical-pheonix.vercel.app/)

---

## 🌟 Executive Summary & Problem Fit

In traditional public procurement, state government departments (like PWD, Health, Agriculture, Water Resources) post 80+ page unstructured tender PDFs. These tenders typically require:
1. **₹5 Cr+ annual turnover** over the last 3 audited financial years.
2. **Prior government deployment track records**.
3. **High-volume manufacturing and field warranty capacity**.

**The Trap**: Innovative Indian startups have cutting-edge AI, IoT, and software solutions, but **fail the financial and manufacturing pre-qualification**. Conversely, established manufacturers have scale, factories, and balance sheets, but lack deep-tech agility.

**Converge solves this by engineering a 4-stage pipeline:**
```
[Structured Problem Intake] 
          ↓
[Searchable Faceted Dashboard]
          ↓
[Startup Solo Bidding OR Startup + Manufacturer Consortium (M-NDA & CTA)]
          ↓
[Supervised Sandbox Pilot Trial & Objective KPI Scorecard]
          ↓
[Simplified Auto-PO Direct Procurement (Rule 149 Relaxation)]
          ↓
[Multi-Department Scale Registry: "Procure Once, Deploy Anywhere"]
```

---

## 🏆 The SIH Winning Differentiator: The Mutual NDA & Teaming Engine

When hackathon judges ask:  
> *"Why would an early-stage startup share its trade secrets and algorithms with a giant manufacturer? What stops the manufacturer from stealing their IP?"*

**Your Winning Answer**:  
Converge auto-drafts a standardized **Mutual Non-Disclosure & Consortium Teaming Agreement (M-NDA & CTA)** with:
1. **Irrevocable IP Ringfence**: 100% of software algorithms, code, model weights, and patents remain the sole unencumbered property of the Startup.
2. **Manufacturing Scope Limitation**: The manufacturer receives non-exclusive fabrication and hardware assembly rights strictly bound to this public tender.
3. **Turnover & Balance Sheet Pledging**: The manufacturer legally pledges its audited turnover to satisfy the tender pre-qualification bar.
4. **Cryptographic Checksum & e-Sign**: The contract is generated with a SHA-256 integrity hash and dual digital e-signatures before the joint bid button is ever enabled.

---

## 🗄️ Database Architecture & Constraints (`schema.sql`)

The database is built with PostgreSQL and enforces critical business logic:
- **`chk_solo_or_collab`**: Enforces that an application is either a solo startup or a collaborative consortium, never both:
  ```sql
  CONSTRAINT chk_solo_or_collab CHECK (
      (startup_id IS NOT NULL AND collab_id IS NULL) OR
      (startup_id IS NULL AND collab_id IS NOT NULL)
  )
  ```
- **`nda_contracts`**: Cryptographically links `collaboration_id` with `document_hash` and e-signature audit timestamps.
- **`pilots`**: Tracks live sandbox trials with KPI scorecards; scores $\ge 80\%$ unlock automatic purchase order issuance.
- **`scale_adoptions`**: Enables cross-department replication (e.g. from PWD to Nagpur or Nashik Municipal Corporation) without separate tender cycles.

---

## 🚀 How to Run the Platform

1. Open your terminal in the project directory:
   ```powershell
   cd c:\Users\sgod1\Desktop\SIH
   ```

2. Start the Vite development server:
   ```powershell
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

---

## 🎭 Demo Flow for Hackathon Judges

1. **Step 1: Role Switcher (Top Right)**
   - Start as **🚀 Startup (Drishti Edge)**: Browse the filterable problem directory with themes matching SIH (Smart Automation, AgriTech, MedTech, Clean Water).
2. **Step 2: Consortium Matching & Legal NDA**
   - Click **"Team Up"** on a high-budget challenge.
   - Select a verified manufacturer (**Sahyadri Electronics**).
   - Click **"Team Up & Sign M-NDA"** $\to$ Review the IP Ringfence and Turnover Pledging clauses $\to$ Click **"Execute Mutual NDA"**.
3. **Step 3: Joint Application Submission**
   - Notice the application badge change to **"Bidding as Active Consortium (Turnover Qualified)"**.
   - Submit the proposal.
4. **Step 4: Nodal Officer Evaluation (Sandbox Trials)**
   - Switch role to **🏛️ Dept Officer (PWD)**.
   - Go to **"Sandbox Pilots & Scorecards"**.
   - Adjust the KPI benchmark sliders. When the aggregate score crosses 80%, click **"Approve & Issue Auto-PO"**.
   - Inspect the generated Government Purchase Order (**MAHA-GOV-PO-2026-XXXX**) citing GFR Rule 149 relaxation.
5. **Step 5: Cross-Department Scale Registry**
   - Go to **"Cross-Dept Scale Registry"**.
   - Demonstrate how a municipal corporation in Nashik or Nagpur adopts the solution with 1-click requisition, saving 4 months of repetitive tendering.
## Contributors

- Abhishek Koundal
