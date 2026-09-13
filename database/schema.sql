-- =============================================================================
-- Converge (कन्व्हर्ज) - PostgreSQL Production Database Schema
-- SIH Problem Code: SIH-136 / Government of Maharashtra
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. DEPARTMENTS (Government of Maharashtra Nodal Agencies)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    department_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. "MAHA-AGRI", "MAHA-HEALTH", "MAHA-PWD"
    nodal_officer_name VARCHAR(150) NOT NULL,
    nodal_officer_email VARCHAR(255) NOT NULL,
    sector VARCHAR(100) NOT NULL, -- e.g. "Agriculture & Allied", "Public Health", "Smart Mobility"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. PROBLEMS (Structured Tender / Challenge Definition - No PDFs)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE problem_status AS ENUM ('OPEN', 'EVALUATION', 'PILOTING', 'PROCURED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dept_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    sector VARCHAR(100) NOT NULL, -- Matches SIH Theme Taxonomy
    budget_ceiling NUMERIC(15, 2) NOT NULL CHECK (budget_ceiling > 0),
    deadline DATE NOT NULL,
    status problem_status DEFAULT 'OPEN',
    eligibility_criteria TEXT NOT NULL,
    kpi_benchmarks JSONB DEFAULT '[]'::jsonb, -- e.g. [{"metric": "Accuracy", "min_target": "95%"}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. STARTUPS (Eligible DPIIT Recognized Entities)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    dpiit_cert_no VARCHAR(100) UNIQUE NOT NULL, -- e.g. "DIPP123456"
    annual_turnover NUMERIC(15, 2) DEFAULT 0.00,
    founding_year INT CHECK (founding_year >= 2010),
    tech_domains TEXT[] DEFAULT '{}', -- e.g. ARRAY['Computer Vision', 'Embedded IoT', 'AgriTech']
    contact_person VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. MANUFACTURERS (Established Scale & Hardware Partners)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    gst_number VARCHAR(15) UNIQUE NOT NULL,
    annual_turnover NUMERIC(15, 2) NOT NULL CHECK (annual_turnover >= 0),
    manufacturing_capacity_units INT DEFAULT 10000,
    open_to_collaborate BOOLEAN DEFAULT TRUE,
    facilities_sectors TEXT[] DEFAULT '{}', -- e.g. ARRAY['Defense Fabrication', 'CNC Machining', 'Electronics SMT']
    contact_person VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 5. COLLABORATION (Startup-Manufacturer Joint Team on a Problem)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE collab_status AS ENUM ('REQUESTED', 'NDA_PENDING', 'ACTIVE', 'REJECTED', 'DISSOLVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS collaborations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    manufacturer_id UUID NOT NULL REFERENCES manufacturers(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    role_split TEXT NOT NULL, -- e.g. "Startup: AI algorithms, firmware; Manufacturer: PCB fabrication, casing, ISO testing"
    status collab_status DEFAULT 'REQUESTED',
    agreed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_startup_mfr_problem UNIQUE (startup_id, manufacturer_id, problem_id)
);

-- -----------------------------------------------------------------------------
-- 6. NDA & TEAMING AGREEMENT (Cryptographic & Legal Protection)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE legal_nda_status AS ENUM ('DRAFT', 'PARTIALLY_SIGNED', 'EXECUTED', 'TERMINATED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS nda_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID UNIQUE NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
    ip_protection_clauses TEXT NOT NULL, -- Explicit clause ringfencing startup code/IP
    commercial_terms TEXT NOT NULL,      -- Revenue share and production pricing
    document_hash VARCHAR(64) NOT NULL,  -- SHA-256 integrity checksum of agreed legal text
    startup_signed_at TIMESTAMP WITH TIME ZONE,
    manufacturer_signed_at TIMESTAMP WITH TIME ZONE,
    legal_status legal_nda_status DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 7. APPLICATIONS (Solo Startup OR Collaborative Consortium)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'PILOT_APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    collab_id UUID REFERENCES collaborations(id) ON DELETE CASCADE,
    proposal_summary TEXT NOT NULL,
    technical_architecture_url TEXT,
    bid_amount NUMERIC(15, 2) NOT NULL CHECK (bid_amount > 0),
    status application_status DEFAULT 'SUBMITTED',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- CRITICAL BUSINESS RULE:
    -- An application MUST trace back to either a solo startup_id OR a collab_id, NEVER both.
    CONSTRAINT chk_solo_or_collab CHECK (
        (startup_id IS NOT NULL AND collab_id IS NULL) OR
        (startup_id IS NULL AND collab_id IS NOT NULL)
    )
);

-- -----------------------------------------------------------------------------
-- 8. PILOT (Sandbox Trial & Scorecard)
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE pilot_status AS ENUM ('SCHEDULED', 'RUNNING', 'EVALUATION_PENDING', 'PASSED', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS pilots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    sandbox_environment VARCHAR(255) NOT NULL, -- e.g. "Pune Smart City Testbed Corridor B"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    aggregate_score INT CHECK (aggregate_score BETWEEN 0 AND 100),
    scorecard_breakdown JSONB DEFAULT '{}'::jsonb, -- e.g. {"latency": 92, "accuracy": 96, "uptime": 99}
    evaluator_remarks TEXT,
    status pilot_status DEFAULT 'SCHEDULED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_pilot_dates CHECK (end_date >= start_date)
);

-- -----------------------------------------------------------------------------
-- 9. PROCUREMENT (Simplified Direct Purchase Order via Relaxed GFR Rules)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS procurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pilot_id UUID UNIQUE NOT NULL REFERENCES pilots(id) ON DELETE CASCADE,
    po_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. "MAHA-PO-2026-00892"
    final_po_value NUMERIC(15, 2) NOT NULL CHECK (final_po_value > 0),
    gfr_rule_reference VARCHAR(150) DEFAULT 'GFR-2017 Rule 149 / Maharashtra Start-up Policy Sec 4.2',
    delivery_timeline_weeks INT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 10. SCALE ADOPTION (Cross-Department Adoption Without Redundant Bidding)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scale_adoptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    procurement_id UUID NOT NULL REFERENCES procurements(id) ON DELETE CASCADE,
    adopting_dept_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    adopted_on DATE DEFAULT CURRENT_DATE,
    addon_contract_value NUMERIC(15, 2) NOT NULL CHECK (addon_contract_value > 0),
    notes TEXT,
    CONSTRAINT unique_procurement_adoption UNIQUE (procurement_id, adopting_dept_id)
);

-- -----------------------------------------------------------------------------
-- PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_problems_sector ON problems(sector);
CREATE INDEX IF NOT EXISTS idx_problems_status ON problems(status);
CREATE INDEX IF NOT EXISTS idx_problems_deadline ON problems(deadline);
CREATE INDEX IF NOT EXISTS idx_applications_problem ON applications(problem_id);
CREATE INDEX IF NOT EXISTS idx_collaborations_problem ON collaborations(problem_id);
CREATE INDEX IF NOT EXISTS idx_manufacturers_collab ON manufacturers(open_to_collaborate);
