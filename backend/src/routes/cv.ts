import { FastifyPluginAsync } from "fastify";
import { inMemoryDb } from "../db.js";
import { CV_FACT_CATEGORIES } from "../types.js";

export const cvRoutes: FastifyPluginAsync = async (app) => {
  // Upload CV and trigger fact extraction
  app.post("/upload", async (req, reply) => {
    const body = (req.body as any) || {};
    const filename = body.filename || "Curriculum_Vitae_Dr_Alexander_Wright.pdf";
    const documentId = `doc-${Date.now()}`;

    const doc = {
      id: documentId,
      userId: "user-default-1",
      filename,
      storageKey: `cvs/user-default-1/${documentId}/${filename}`,
      mimeType: "application/pdf",
      parseStatus: "parsed",
      redactionState: "clean",
      createdAt: new Date(),
    };
    inMemoryDb.cvDocuments.set(documentId, doc);

    // Populate facts across the 10 categories
    const initialFacts = [
      {
        id: `fact-${documentId}-1`,
        documentId,
        category: "qualifications",
        claimText: "MBBS with Distinction in Clinical Sciences (King's College London, 2022)",
        sourceSpan: "Page 1, Education",
        confidence: 0.98,
        status: "confirmed",
      },
      {
        id: `fact-${documentId}-2`,
        documentId,
        category: "clinical_roles",
        claimText: "FY2 Doctor in Acute Medicine & Respiratory (St Thomas' Hospital, 2024-Present)",
        sourceSpan: "Page 1, Employment",
        confidence: 0.99,
        status: "confirmed",
      },
      {
        id: `fact-${documentId}-3`,
        documentId,
        category: "audits_qip",
        claimText: "Led closed-loop QIP reducing door-to-antibiotic time in neutropenic sepsis from 78 to 34 minutes",
        sourceSpan: "Page 2, Quality Improvement",
        confidence: 0.94,
        status: "proposed",
      },
      {
        id: `fact-${documentId}-4`,
        documentId,
        category: "teaching",
        claimText: "Organised 6-week bedside teaching programme for Year 4 medical students with 96% positive feedback",
        sourceSpan: "Page 2, Teaching Experience",
        confidence: 0.91,
        status: "proposed",
      },
      {
        id: `fact-${documentId}-5`,
        documentId,
        category: "leadership",
        claimText: "Foundation Year Representative on Trust Patient Safety and Clinical Governance Committee",
        sourceSpan: "Page 3, Leadership & Management",
        confidence: 0.89,
        status: "proposed",
      },
      {
        id: `fact-${documentId}-6`,
        documentId,
        category: "practical_procedures",
        claimText: "Competently performed and DOPS-signed for lumbar puncture, chest drain insertion, and central line access",
        sourceSpan: "Page 3, Clinical Skills",
        confidence: 0.95,
        status: "proposed",
      },
      {
        id: `fact-${documentId}-7`,
        documentId,
        category: "clinical_governance",
        claimText: "Presented Root Cause Analysis on near-miss medication error at Hospital Morbidity & Mortality meeting",
        sourceSpan: "Page 3, Governance",
        confidence: 0.92,
        status: "proposed",
      },
      {
        id: `fact-${documentId}-8`,
        documentId,
        category: "critical_incidents",
        claimText: "Managed acute peri-arrest cardiac tamponade alongside Senior Registrar, facilitating emergency pericardiocentesis",
        sourceSpan: "Page 4, Clinical Experience",
        confidence: 0.88,
        status: "proposed",
      },
    ];

    for (const f of initialFacts) {
      inMemoryDb.cvFacts.set(f.id, f);
    }

    return {
      success: true,
      document: doc,
      factsCount: initialFacts.length,
      categories: CV_FACT_CATEGORIES,
    };
  });

  // Get facts for document
  app.get("/facts/:documentId", async (req, reply) => {
    const { documentId } = req.params as { documentId: string };
    const facts = Array.from(inMemoryDb.cvFacts.values()).filter(
      (f) => f.documentId === documentId
    );
    return { documentId, facts };
  });

  // Update fact status (confirmed / removed / edited)
  app.patch("/facts/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = req.body as any;
    const fact = inMemoryDb.cvFacts.get(id);

    if (!fact) {
      return reply.status(404).send({ error: "Fact not found" });
    }

    if (body.status) fact.status = body.status;
    if (body.editedText !== undefined) fact.editedText = body.editedText;

    inMemoryDb.cvFacts.set(id, fact);
    return { success: true, fact };
  });
};
