import { PrismaClient } from "@prisma/client";
import { CV_FACT_CATEGORIES } from "./types.js";

let prismaInstance: PrismaClient | null = null;
let useFallback = false;

// In-memory fallback store for offline development / testing without PostgreSQL
export interface InMemoryStore {
  users: Map<string, any>;
  cvDocuments: Map<string, any>;
  cvFacts: Map<string, any>;
  questionBanks: Map<string, any>;
  sessions: Map<string, any>;
  sessionEvents: any[];
  scores: Map<string, any[]>;
  entitlements: Map<string, any>;
}

export const inMemoryDb: InMemoryStore = {
  users: new Map(),
  cvDocuments: new Map(),
  cvFacts: new Map(),
  questionBanks: new Map(),
  sessions: new Map(),
  sessionEvents: [],
  scores: new Map(),
  entitlements: new Map(),
};

// Seed default questions into in-memory store
function seedDefaultQuestions() {
  const defaultQuestions = [
    {
      id: "q-imt-1",
      specialtyCode: "imt",
      pathway: "Internal Medicine Training (IMT)",
      level: "ST1 / CT1",
      stationType: "clinical",
      title: "Acute Sepsis & Clinical Prioritisation",
      questionText:
        "You are called by an FY1 to review a 72-year-old patient on the surgical ward whose NEWS2 score has risen from 2 to 7. Her BP is 88/50, heart rate 118, temperature 38.6°C, and respiratory rate 26. Describe your immediate assessment and initial management plan.",
      promptTemplate: "Act as Dr. Campbell, Consultant Physician and Interview Chair. Evaluate candidate on ABCDE prioritisation, Sepsis 6 delivery within 1 hour, and team communication.",
      rubricRef: "IMT-CLIN-1",
      version: 1,
      active: true,
      createdAt: new Date(),
    },
    {
      id: "q-imt-2",
      specialtyCode: "imt",
      pathway: "Internal Medicine Training (IMT)",
      level: "ST1 / CT1",
      stationType: "ethical",
      title: "Capacity, Escalation & DNACPR Discussion",
      questionText:
        "A frail 84-year-old with end-stage COPD and severe dementia is admitted with aspiration pneumonia. The patient lacks capacity. The son insists on full resuscitation (CPR and ITU admission). How would you conduct this conversation?",
      promptTemplate: "Act as Dr. Campbell. Probe candidate's understanding of Best Interests under the Mental Capacity Act 2005, compassionate communication, and consultant escalation.",
      rubricRef: "IMT-ETH-1",
      version: 1,
      active: true,
      createdAt: new Date(),
    },
    {
      id: "q-cst-1",
      specialtyCode: "cst",
      pathway: "Core Surgical Training (CST)",
      level: "ST1 / CT1",
      stationType: "clinical",
      title: "Acute Abdomen in Emergency Assessment Unit",
      questionText:
        "A 34-year-old female presents with severe right iliac fossa pain and high fever for 12 hours. Talk me through your differential diagnosis, initial workup, and immediate management steps.",
      promptTemplate: "Act as Mr. Reynolds, Consultant Colorectal Surgeon. Probe differentials (appendicitis, ectopic, ovarian torsion), resuscitation, and diagnostic imaging.",
      rubricRef: "CST-CLIN-1",
      version: 1,
      active: true,
      createdAt: new Date(),
    },
    {
      id: "q-gpst-1",
      specialtyCode: "gpst",
      pathway: "General Practice (GPST)",
      level: "ST1 / CT1",
      stationType: "communication",
      title: "Angry Patient & Unreasonable Prescribing Request",
      questionText:
        "A 45-year-old regular patient attends demanding an immediate refill of high-dose diazepam, which was flagged for review. He becomes visibly frustrated. How do you structure this 10-minute consultation?",
      promptTemplate: "Act as Dr. Sarah Jenkins, GP Trainer. Evaluate candidate on active listening, de-escalation, non-judgemental boundary setting, and safeguarding.",
      rubricRef: "GPST-COMM-1",
      version: 1,
      active: true,
      createdAt: new Date(),
    },
  ];

  for (const q of defaultQuestions) {
    inMemoryDb.questionBanks.set(q.id, q);
  }

  // Seed mock user
  const defaultUser = {
    id: "user-default-1",
    email: "candidate@roundwise.co.uk",
    name: "Dr. Alexander Wright",
    role: "candidate",
    consentGDPR: true,
    consentAudio: true,
    consentModel: true,
    consentCaldicott: true,
    consentVersion: "1.0",
    audioRetentionDays: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  inMemoryDb.users.set(defaultUser.id, defaultUser);
}

seedDefaultQuestions();

export function getDb() {
  if (process.env.DATABASE_URL && !useFallback) {
    if (!prismaInstance) {
      try {
        prismaInstance = new PrismaClient();
      } catch (e) {
        console.warn("[DB] Prisma init failed, using in-memory store fallback:", e);
        useFallback = true;
      }
    }
    return prismaInstance;
  }
  return null;
}
