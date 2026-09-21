// Mock Data for RoundWise
// Independent UK Medical Specialty Interview Preparation Platform

export const SPECIALTIES = [
  {
    id: 'imt',
    name: 'Internal Medicine Training (IMT)',
    code: 'IMT-ST1',
    level: 'ST1 / CT1',
    recruitmentLead: 'Physician Specialty Recruitment Office (PSRO)',
    stations: ['Clinical Scenario & Prioritisation', 'Ethical Dilemma & Governance', 'Suitability & Commitment to Specialty'],
    defaultDurationMinutes: 30,
    panelists: [
      { id: 'p1', name: 'Dr. Alistair Vance', role: 'Panel Chair & Acute Medical Consultant', hospital: 'University Hospital Trust (Simulated)', avatarTone: 'indigo' },
      { id: 'p2', name: 'Dr. Sarah Jenkins', role: 'Consultant Geriatrician & Specialty Tutor', hospital: 'Regional Healthcare Trust (Simulated)', avatarTone: 'teal' },
      { id: 'p3', name: 'Mr. Marcus Thorne', role: 'Lay Representative & Governance Assessor', hospital: 'Independent Panel Assessor (Simulated)', avatarTone: 'slate' }
    ]
  },
  {
    id: 'cst',
    name: 'Core Surgical Training (CST)',
    code: 'CST-CT1',
    level: 'CT1',
    recruitmentLead: 'National Surgical Recruitment',
    stations: ['Management Scenario', 'Clinical Scenario (Trauma / Acute Abdomen)', 'Portfolio & Academic Achievements'],
    defaultDurationMinutes: 30,
    panelists: [
      { id: 'p4', name: 'Mr. Jonathan Croft FRCS', role: 'Panel Chair & Consultant General Surgeon', hospital: 'Teaching Hospitals Trust (Simulated)', avatarTone: 'indigo' },
      { id: 'p5', name: 'Ms. Elena Rostova FRCS', role: 'Consultant Vascular Surgeon & Training Lead', hospital: 'NHS Trust Simulation', avatarTone: 'teal' }
    ]
  },
  {
    id: 'gpst',
    name: 'General Practice Specialty Training (GPST)',
    code: 'GPST-ST1',
    level: 'ST1',
    recruitmentLead: 'National GP Recruitment Office (NRO)',
    stations: ['Consultation Skills', 'Professional Dilemmas & Ethical Practice', 'Person-Centred Care & Reflection'],
    defaultDurationMinutes: 25,
    panelists: [
      { id: 'p6', name: 'Dr. Fiona Campbell MRCGP', role: 'GP Principal & Training Programme Director', hospital: 'Primary Care Network (Simulated)', avatarTone: 'indigo' },
      { id: 'p7', name: 'Dr. Tariq Ahmed MRCGP', role: 'GP Partner & Clinical Lead', hospital: 'Community Medical Centre (Simulated)', avatarTone: 'teal' }
    ]
  },
  {
    id: 'accs-anaes',
    name: 'ACCS Anaesthetics / Core Anaesthetics',
    code: 'ANAES-CT1',
    level: 'CT1',
    recruitmentLead: 'Anaesthetics National Recruitment Office (ANRO)',
    stations: ['Critical Incident & Resuscitation', 'Reflective Practice & GMC Guidelines', 'Commitment to Anaesthetics'],
    defaultDurationMinutes: 30,
    panelists: [
      { id: 'p8', name: 'Dr. Nicholas Reed FRCA', role: 'Consultant Anaesthetist & College Tutor', hospital: 'Simulated Tertiary Centre', avatarTone: 'indigo' },
      { id: 'p9', name: 'Dr. Meera Patel FRCA', role: 'Consultant in Intensive Care & Simulation Director', hospital: 'Major Trauma Centre (Simulated)', avatarTone: 'teal' }
    ]
  },
  {
    id: 'paed',
    name: 'Paediatrics Specialty Training',
    code: 'PAED-ST1',
    level: 'ST1',
    recruitmentLead: 'Paediatric National Recruitment',
    stations: ['Acute Paediatric Scenario', 'Communication with Families & Safeguarding', 'Career Motivation & QIP'],
    defaultDurationMinutes: 25,
    panelists: [
      { id: 'p10', name: 'Dr. Clara Higgins FRCPCH', role: 'Consultant Paediatrician & Designated Doctor Safeguarding', hospital: 'Childrens Hospital (Simulated)', avatarTone: 'indigo' }
    ]
  },
  {
    id: 'rad',
    name: 'Clinical Radiology',
    code: 'RAD-ST1',
    level: 'ST1',
    recruitmentLead: 'National Radiology Recruitment',
    stations: ['Clinical Governance & Radiation Safety', 'Scientific Reasoning & Imaging Principles', 'Portfolio & Commitment'],
    defaultDurationMinutes: 25,
    panelists: [
      { id: 'p11', name: 'Dr. Richard Vance FRCR', role: 'Consultant Radiologist & Training Programme Director', hospital: 'Academic Health Science Centre (Simulated)', avatarTone: 'indigo' }
    ]
  }
];

export const INITIAL_CV_FACTS = [
  {
    id: 'exp-1',
    category: 'Employment and clinical experience',
    title: 'Foundation Doctor FY2 — Acute & General Medicine',
    institution: 'St Thomas’ Hospital, London (Guy’s and St Thomas’ NHS FT)',
    period: 'Aug 2025 – Present',
    verified: true,
    summary: 'Lead clinical reviews on AMU and Acute Frailty Units. Managed high-acuity admissions, non-invasive ventilation (NIV), and daily post-take ward rounds.'
  },
  {
    id: 'exp-2',
    category: 'Employment and clinical experience',
    title: 'Foundation Doctor FY1 — Colorectal Surgery & Orthopaedics',
    institution: 'King’s College Hospital, London',
    period: 'Aug 2024 – Aug 2025',
    verified: true,
    summary: 'Managed peri-operative surgical patients, emergency surgical admissions, and routine bedside procedures. Participated in emergency theatre rotas.'
  },
  {
    id: 'qual-1',
    category: 'Qualifications',
    title: 'MBChB with Honours (Primary Medical Qualification)',
    institution: 'University of Edinburgh College of Medicine',
    period: '2019 – 2024',
    verified: true,
    summary: 'Graduated in top decile (Decile 1) with distinctions in Clinical Medicine and Medical Therapeutics.'
  },
  {
    id: 'qual-2',
    category: 'Qualifications',
    title: 'MRCP (UK) Part 1 — Passed (First Sitting)',
    institution: 'Royal Colleges of Physicians',
    period: 'Exam session 2025/03',
    verified: true,
    summary: 'Score: 685 (National passing standard: 540).'
  },
  {
    id: 'teach-1',
    category: 'Teaching',
    title: 'Honorary Clinical Skills Demonstrator & Mock OSCE Examiner',
    institution: 'King’s College London School of Medical Education',
    period: '2024 – 2025',
    verified: true,
    summary: 'Delivered 8 structured simulation seminars for Year 3 and Year 5 medical students on cannulation, arterial puncture, and lumbar puncture. 96% positive feedback rating.'
  },
  {
    id: 'res-1',
    category: 'Research',
    title: 'Co-Investigator: SGLT2-Inhibitor Outcomes in Acute Heart Failure Admissions',
    institution: 'British Heart Foundation Collaborative Research Group',
    period: '2023 – 2025',
    verified: true,
    summary: 'Contributed to retrospective cohort analysis of 420 patients admitted across 3 acute trusts. Assisted in statistical extraction and manuscript preparation.'
  },
  {
    id: 'qip-1',
    category: 'Audit and quality improvement',
    title: 'Quality Improvement Project: Improving ‘Sepsis Six’ Compliance in AMU',
    institution: 'St Thomas’ Hospital',
    period: 'Oct 2025 – Feb 2026',
    verified: true,
    summary: 'Completed 2 closed PDSA cycles implementing electronic ward triage prompt stickers. Increased antibiotic delivery within 60 minutes from 44% to 82%.'
  },
  {
    id: 'lead-1',
    category: 'Leadership and management',
    title: 'Foundation Doctor Representative — Hospital Transfusion Committee',
    institution: 'Guy’s & St Thomas’ NHS FT',
    period: '2025 – Present',
    verified: true,
    summary: 'Represented 64 foundation trainees, leading education on massive transfusion protocol activation and two-person bedside crosscheck compliance.'
  },
  {
    id: 'pres-1',
    category: 'Presentations and publications',
    title: 'Oral Presentation: British Thoracic Society Winter Meeting',
    institution: 'London ExCeL & Queen Elizabeth II Conference Centre',
    period: 'Nov 2025',
    verified: true,
    summary: 'Title: "Evaluating diagnostic delay in acute pulmonary embolism amongst frailty admissions". Co-author on peer-reviewed abstract.'
  },
  {
    id: 'award-1',
    category: 'Awards',
    title: 'Dean’s Prize for Clinical Excellence in Medicine',
    institution: 'University of Edinburgh',
    period: 'July 2024',
    verified: true,
    summary: 'Awarded annually to the top 2 graduating medical students demonstrating outstanding bedside clinical performance.'
  },
  {
    id: 'gap-1',
    category: 'Career breaks or gaps',
    title: 'No Unexplained Gaps',
    institution: 'Continuous UK Foundation Programme Training',
    period: '2024 – Present',
    verified: true,
    summary: 'Direct progression from medical school graduation (July 2024) to UKFP FY1 (August 2024) and FY2 (August 2025).'
  },
  {
    id: 'other-1',
    category: 'Other relevant experience',
    title: 'Advanced Life Support (ALS) Certified Provider',
    institution: 'Resuscitation Council UK',
    period: 'Valid: Sep 2024 – Sep 2028',
    verified: true,
    summary: 'Fully certified ALS provider, certified in airway management, cardiac arrest rhythm recognition, and crisis resource management.'
  }
];

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 'q1',
    number: 1,
    timeAllocatedSeconds: 360,
    speakerId: 'p1',
    speakerName: 'Dr. Alistair Vance',
    speakerRole: 'Panel Chair & Acute Medical Consultant',
    domain: 'Clinical Judgement & Emergency Prioritisation',
    type: 'Acute Clinical Scenario',
    weight: 0.35,
    scenarioText: 'You are the IMT1 on duty for medical admissions at 21:00. The nursing sister calls you urgently to see a 68-year-old male with known cirrhosis who has just had a large volume haematemesis (approx 800ml) on the ward. His heart rate is 128 bpm, blood pressure is 86/48 mmHg, and respiratory rate is 24. Simultaneously, the emergency department bleeps you regarding a 22-year-old asthmatic with a silent chest awaiting immediate review. How do you assess, manage, and prioritise this situation?',
    cvAdaptationNote: 'Personalised based on candidate’s verified FY2 AMU emergency experience at St Thomas’ Hospital.',
    scoringAnchor: {
      unsatisfactory: 'Attempts to manage alone without immediate resuscitation; fails to recognize haemodynamic shock; does not escalate to medical registrar or ICU; does not contact ED triage.',
      borderline: 'Recognises severity but disorganised sequence; forgets terlipressin/prophylactic antibiotics; slow to delegate or activate major haemorrhage protocol.',
      satisfactory: 'Safe, structured A-to-E approach. Initiates wide-bore IV access, fluid resuscitation, crossmatch 4-6 units, empirical terlipressin and IV antibiotics. Escalates to registrar and anaesthetics/ICU. Appropriately delegates ED asthma review.',
      outstanding: 'Flawless crisis resource management (CRM). Activates Major Haemorrhage Protocol if bleeding continues, calls on-call endoscopy team, delegates ED asthma escalation immediately to another clinician or ED senior. References GMC Good Medical Practice in patient handover.'
    },
    sampleCandidateAnswer: "I would approach this high-stakes situation systematically using an ABCDE assessment while exercising rapid triage and delegation. Firstly, the 68-year-old with active haematemesis is in decompensated hypovolaemic shock with tachycardia and hypotension. At the exact same time, a silent chest in a 22-year-old asthmatic represents life-threatening asthma. I cannot be in two places at once, so I must prioritise and delegate. For the haematemesis patient, I would immediately put out an urgent medical emergency call (2222) to mobilise the medical registrar and resuscitation team. In parallel, I would contact the ED senior sister or ED registrar directly: inform them I am tied up with an unstable GI bleed, and ask the ED resuscitation team to attend the asthma patient without delay. For the haematemesis patient: A - Ensure airway patent, position left lateral, high-flow oxygen; B - Assess chest, monitor sats; C - Two large-bore 14G cannulae, send FBC, U&E, LFT, clotting, and immediate crossmatch for 6 units. Start balanced crystalloid, order O-negative blood from the blood fridge or trigger Major Haemorrhage Protocol if uncontained. Give IV Terlipressin 2mg, broad-spectrum IV antibiotic (e.g. Ceftriaxone), and contact the on-call gastroenterology consultant for urgent endoscopy once stabilised.",
    scoreAwarded: 4.5,
    maxScore: 5.0,
    evidencePresent: [
      'Recognised immediate risk of death in both patients and took clear ownership of triage',
      'Structured ABCDE resuscitation with two large-bore cannulae and urgent crossmatch',
      'Appropriate medical adjunctive therapy for suspected variceal haemorrhage (Terlipressin and prophylactic antibiotics)',
      'Prompt escalation to medical registrar, ICU/anaesthetics, and on-call gastroenterologist',
      'Explicit delegation of the life-threatening asthma to the ED resuscitation team rather than ignoring it'
    ],
    missingEvidence: [
      'Did not explicitly state reversal of potential coagulopathy (e.g. checking INR or withholding nephrotoxic agents)',
      'Could have mentioned Sengstaken-Blakemore tube as a salvage temporising measure if endoscopy delayed'
    ],
    rubricAlignment: 'Level 4.5 (High Merit / Near Distinction)'
  },
  {
    id: 'q2',
    number: 2,
    timeAllocatedSeconds: 300,
    speakerId: 'p2',
    speakerName: 'Dr. Sarah Jenkins',
    speakerRole: 'Consultant Geriatrician & Specialty Tutor',
    domain: 'Professionalism, Governance & GMC Ethics',
    type: 'Ethical & Workplace Dilemma',
    weight: 0.35,
    scenarioText: 'A Foundation Year 1 doctor on your team confides in you that they accidentally administered 10 times the intended dose of subcutaneous low molecular weight heparin to an elderly postoperative patient earlier this morning. The patient is currently asymptomatic and resting. The FY1 is terrified of disciplinary action and begs you not to file a Datix incident report or inform the consultant, assuring you they will monitor the patient closely until handover. How do you handle this colleague and this clinical incident?',
    cvAdaptationNote: 'Personalised to assess leadership and mentorship competencies in line with candidate’s role as Foundation Doctor Representative.',
    scoringAnchor: {
      unsatisfactory: 'Agrees to keep it quiet to protect colleague, or reacts with punitive aggression without securing patient safety first.',
      borderline: 'Tells the consultant but damages rapport with FY1; forgets to assess patient bleeding risk or monitor anti-Xa; omits Duty of Candour to patient.',
      satisfactory: 'Prioritises patient safety: clinical assessment, consultation with haematology, reverses with protamine if needed. Gently but firmly explains why incident reporting is mandatory for systemic learning, not punishment. Informs consultant and supports FY1 throughout.',
      outstanding: 'Exemplary application of GMC Good Medical Practice and Duty of Candour. Conducts immediate patient check, orders coagulation/FBC, liaises with pharmacy/haematology. Reassures FY1 that error reporting fosters just culture, helps them complete the Datix collaboratively, attends consultant discussion together, and assists with compassionate disclosure to the patient/family.'
    },
    sampleCandidateAnswer: "This scenario requires a compassionate, supportive colleague approach while maintaining absolute adherence to patient safety, GMC Good Medical Practice, and statutory Duty of Candour. First, my immediate and non-negotiable priority is the patient. 10x dose of LMWH carries a high risk of catastrophic haemorrhage, particularly in an elderly surgical patient. I would accompany the FY1 immediately to the bedside to assess the patient: check vital signs, inspect surgical wound or puncture sites for bleeding, and verify renal function. I would contact haematology and on-call pharmacy to discuss protamine sulphate reversal and anti-Factor Xa monitoring. Second, regarding the FY1: I would take them into a private room and offer psychological safety. I would reassure them that healthcare is a high-risk system and errors happen, but concealment transforms a clinical mistake into a serious fitness-to-practise issue. I would explain that a Datix report is not punitive; it identifies systems factors (e.g. look-alike ampoules or prescribing software glitches). I would offer to co-author the Datix with them and accompany them to brief the consultant. Finally, once the patient is stable, the consultant and our team have a legal and ethical Duty of Candour to explain the error truthfully to the patient, apologize, and outline our monitoring plan.",
    scoreAwarded: 5.0,
    maxScore: 5.0,
    evidencePresent: [
      'Immediate prioritisation of patient safety and objective clinical assessment',
      'Liaison with pharmacy and haematology for specific reversal (protamine) and lab monitoring',
      'Psychological safety offered to junior colleague without compromising patient safety',
      'Clear articulation of Just Culture principles vs fitness-to-practise risks of concealment',
      'Explicit reference to statutory Duty of Candour and patient apology'
    ],
    missingEvidence: [
      'None identified; answer covered all primary GMC domains comprehensively.'
    ],
    rubricAlignment: 'Level 5 (Distinction / Benchmark Quality)'
  },
  {
    id: 'q3',
    number: 3,
    timeAllocatedSeconds: 240,
    speakerId: 'p3',
    speakerName: 'Mr. Marcus Thorne',
    speakerRole: 'Lay Representative & Governance Assessor',
    domain: 'Quality Improvement & Commitment to Specialty',
    type: 'Portfolio & Reflective Practice',
    weight: 0.30,
    scenarioText: 'Looking at your verified portfolio, you completed a Quality Improvement Project on AMU addressing Sepsis Six antibiotic delivery compliance. Could you explain the rationale behind your intervention, what methodology you utilized, how you addressed clinician resistance, and what lasting systemic change resulted from your work?',
    cvAdaptationNote: 'Directly incorporates candidate’s verified QIP fact from St Thomas’ Hospital (increased compliance from 44% to 82%).',
    scoringAnchor: {
      unsatisfactory: 'Describes a one-off audit without PDSA cycles; cannot explain change management or systemic impact; takes sole credit without multidisciplinary context.',
      borderline: 'Understands basic audit loop but vague on statistical process control, sustainability, or stakeholder engagement.',
      satisfactory: 'Demonstrates solid understanding of HQIP/IHI Model for Improvement (Plan-Do-Study-Act). Explains baseline audit, root causes (e.g., pharmacy delays, nursing recognition), SMART intervention, and measurement.',
      outstanding: 'Masterclass in clinical leadership. Details multi-disciplinary stakeholder engagement (nurses, pharmacy, junior doctors). Describes iterative PDSA cycles, run charts, how barriers were navigated constructively, and handover mechanisms ensuring sustainable change post-rotation.'
    },
    sampleCandidateAnswer: "Thank you. On my Acute Medical Unit rotation, our baseline audit revealed that only 44% of eligible septic patients received intravenous antibiotics within the critical 60-minute window, primarily due to delayed triage recognition and blood bottle preparation. Using the IHI Model for Improvement, our team set a SMART aim: to achieve >80% compliance within four months. In PDSA Cycle 1, we introduced physical sepsis resuscitation packs with pre-assembled blood culture bottles and order sets. While this reduced preparation time, compliance only rose to 58% because junior doctors were often delayed by conflicting ward duties. In PDSA Cycle 2, we engaged with the nursing leadership to empower senior triage nurses to initiate blood cultures and peripheral IV access immediately under an emergency PGD. To overcome initial hesitation regarding nursing workload, I ran five 10-minute micro-teaching sessions with nurse shift leads and shared weekly run charts openly on the handover board. By the end of Cycle 2, our 60-minute compliance reached 82%, and sustained above 78% three months later. Most importantly, this project taught me that quality improvement is 20% about tools and 80% about collaborative culture and listening to the multidisciplinary team.",
    scoreAwarded: 4.8,
    maxScore: 5.0,
    evidencePresent: [
      'Clear definition of baseline problem and quantified SMART objective',
      'Iterative PDSA methodology demonstrated rather than static audit',
      'Authentic stakeholder engagement with nursing leadership and multidisciplinary team',
      'Transparent measurement using run charts and sustainable handover culture'
    ],
    missingEvidence: [
      'Could have mentioned patient or public involvement (PPI) feedback on sepsis recognition communications'
    ],
    rubricAlignment: 'Level 4.8 (Outstanding)'
  }
];

export const MOCK_SCORING_SUMMARY = {
  candidateName: 'Dr. Alexander Moore MBBS',
  gmcRef: '7849201 (Simulated)',
  specialtyName: 'Internal Medicine Training (IMT)',
  pathway: 'National ST1 Recruitment Round 1',
  dateCompleted: '21 September 2026',
  totalScore: 14.3,
  maxTotalScore: 15.0,
  percentage: 95.3,
  rubricTier: 'Well Above Appointability Threshold',
  confidenceRating: 'High (0.94) — All answers evaluated with verified transcript citations',
  domains: [
    {
      name: 'Clinical Judgement & Emergency Prioritisation',
      weight: 35,
      score: 4.5,
      maxScore: 5.0,
      status: 'High Merit',
      strengths: 'Rigorous ABCDE framework, early recognition of haemodynamic decompensation, safe simultaneous delegation of life-threatening asthma.',
      improvements: 'Remember to verbalise specific reversal of coagulopathy (prothrombin complex / FFP) in liver cirrhosis and temporising balloon tamponade.'
    },
    {
      name: 'Professionalism, Governance & GMC Ethics',
      weight: 35,
      score: 5.0,
      maxScore: 5.0,
      status: 'Distinction',
      strengths: 'Peerless psychological support for distressed junior colleague balanced with unwavering patient safety, statutory Duty of Candour, and Just Culture Datix reporting.',
      improvements: 'None — exemplary standard for ST1 level.'
    },
    {
      name: 'Quality Improvement & Portfolio Reflective Practice',
      weight: 30,
      score: 4.8,
      maxScore: 5.0,
      status: 'Outstanding',
      strengths: 'Clear IHI Model for Improvement, 2 closed PDSA cycles, multidisciplinary engagement with nursing team, quantified 44% to 82% outcome improvement.',
      improvements: 'Consider articulating patient experience or PPI feedback in future QIP answers.'
    }
  ],
  speechMetrics: {
    wordsPerMinute: 134,
    idealWpmRange: '125 – 145 wpm',
    paceAssessment: 'Optimal & Reassuring',
    fillerWordFrequency: '1.2% (Very low)',
    pauseControl: 'Natural clinical cadence with thoughtful 2-second structure pauses',
    clarityScore: '96%'
  }
};

export const ADMIN_QUESTIONS = [
  {
    id: 'Q-IMT-001',
    version: 'v2.4',
    specialty: 'Internal Medicine Training',
    pathway: 'IMT-ST1',
    domain: 'Clinical Judgement',
    type: 'Acute Prioritisation',
    title: 'Acute Upper GI Bleed with Competing ED Emergency',
    status: 'Active',
    effectiveDate: '2026-01-01',
    reviewDate: '2026-12-31',
    provenance: 'Internal Clinical Advisory Group (GMC Guidance Aligned)',
    weight: 0.35,
    timeLimitSeconds: 360,
    assignedPanelRole: 'Panel Chair & Acute Medical Consultant',
    allowedFollowUps: 'Max 1 probe on resource constraints; no clinical hints'
  },
  {
    id: 'Q-IMT-002',
    version: 'v1.8',
    specialty: 'Internal Medicine Training',
    pathway: 'IMT-ST1',
    domain: 'Professional Dilemmas & Ethics',
    type: 'GMC Duty of Candour',
    title: 'FY1 Heparin 10x Overdose Incident',
    status: 'Active',
    effectiveDate: '2026-01-01',
    reviewDate: '2026-12-31',
    provenance: 'GMC Good Medical Practice (2024 edition updates)',
    weight: 0.35,
    timeLimitSeconds: 300,
    assignedPanelRole: 'Consultant Geriatrician & Specialty Tutor',
    allowedFollowUps: 'Probe on what candidate does if FY1 refuses to sign Datix'
  },
  {
    id: 'Q-IMT-003',
    version: 'v3.1',
    specialty: 'Internal Medicine Training',
    pathway: 'IMT-ST1',
    domain: 'Quality Improvement',
    type: 'CV-Personalised QIP Inquiry',
    title: 'Candidate Verified Sepsis / Audit Project',
    status: 'Active',
    effectiveDate: '2025-09-01',
    reviewDate: '2026-09-01',
    provenance: 'Academy of Medical Royal Colleges QI Curriculum',
    weight: 0.30,
    timeLimitSeconds: 240,
    assignedPanelRole: 'Lay Representative & Governance Assessor',
    allowedFollowUps: 'Probe on how resistance was overcome'
  },
  {
    id: 'Q-CST-101',
    version: 'v1.2',
    specialty: 'Core Surgical Training',
    pathway: 'CST-CT1',
    domain: 'Management & Prioritisation',
    type: 'Polytrauma Triage',
    title: 'Simultaneous Penetrating Abdominal Trauma & Unstable Pelvis',
    status: 'Active',
    effectiveDate: '2026-02-01',
    reviewDate: '2027-02-01',
    provenance: 'ATLS 10th Edition principles',
    weight: 0.40,
    timeLimitSeconds: 360,
    assignedPanelRole: 'Panel Chair & Consultant General Surgeon',
    allowedFollowUps: 'Standard ATLS protocol escalation'
  },
  {
    id: 'Q-GPST-201',
    version: 'v2.0',
    specialty: 'General Practice Specialty Training',
    pathway: 'GPST-ST1',
    domain: 'Consultation & Communication',
    type: 'Unreasonable Prescription Request',
    title: 'Demanding Patient Requesting Antibiotics for Viral Coryza',
    status: 'Active',
    effectiveDate: '2026-01-15',
    reviewDate: '2027-01-15',
    provenance: 'RCGP Clinical Guidance & Antimicrobial Stewardship',
    weight: 0.35,
    timeLimitSeconds: 300,
    assignedPanelRole: 'GP Principal & Training Programme Director',
    allowedFollowUps: 'Check ICE (Ideas, Concerns, Expectations)'
  }
];

export const COMMERCIAL_PRICING = [
  {
    id: 'plan-1month',
    name: '1 Month Access',
    priceGbp: '£25',
    period: 'one-time payment for 30 days',
    popular: false,
    features: [
      { text: 'Full access to all UK specialty simulations', included: true },
      { text: 'CV parsing & verified fact personalization', included: true },
      { text: 'Voice panel interview simulation with realistic timers', included: true },
      { text: 'Detailed rubric scoring & transcript evidence reports', included: true },
      { text: 'Audio playback & pacing feedback', included: true },
      { text: 'Number of interview simulations: 8 completed mocks (TBC fair-use)', included: true, tbc: true },
      { text: 'Fair-use limits & audio retention: 30 days retention (TBC)', included: true, tbc: true },
      { text: 'VAT status: Included in price (TBC upon HMRC threshold)', included: true, tbc: true },
      { text: 'Renewal: No automatic renewal (one-off access period)', included: true }
    ],
    buttonText: 'Get 1 Month Access'
  },
  {
    id: 'plan-2months',
    name: '2 Months Access',
    priceGbp: '£40',
    period: 'one-time payment for 60 days',
    popular: true,
    savingBadge: 'Save 20% on monthly equivalent',
    features: [
      { text: 'Full access to all UK specialty simulations', included: true },
      { text: 'CV parsing & verified fact personalization', included: true },
      { text: 'Multi-member panel configurations across all specialties', included: true },
      { text: 'Complete question-level rubric breakdowns & coaching points', included: true },
      { text: 'Progress tracker & comparative rubric trend charts', included: true },
      { text: 'Number of interview simulations: 20 completed mocks (TBC fair-use)', included: true, tbc: true },
      { text: 'Fair-use limits & audio retention: 60 days retention (TBC)', included: true, tbc: true },
      { text: 'Cancellation terms: 14-day statutory cooling-off if unused (TBC)', included: true, tbc: true },
      { text: 'VAT status: Included in price (TBC upon HMRC threshold)', included: true, tbc: true },
      { text: 'Renewal: No automatic recurring charges', included: true }
    ],
    buttonText: 'Get 2 Months Access'
  }
];

export const FAQS = [
  {
    q: 'Is RoundWise affiliated with the NHS or Royal Colleges?',
    a: 'No. RoundWise is an independent educational technology service designed to help doctors practice interview technique. It is NOT affiliated with, endorsed by, approved by, or operated by NHS England, Health Education England (NHS England Workforce, Training & Education), any Royal Medical College, the General Medical Council (GMC), or any national recruitment office (such as Oriel, ANRO, or PSRO).'
  },
  {
    q: 'How does the CV fact extraction work and is it safe?',
    a: 'When you upload your CV (PDF or DOCX), our secure parser identifies key facts across 10 categories (clinical appointments, qualifications, audits, teaching, etc.). Crucially, no CV fact is ever used in your simulation until YOU explicitly review, edit, or approve it. We enforce strict data minimisation: we do NOT collect patient identifiable information, and you can redact or delete your CV and facts at any moment.'
  },
  {
    q: 'Does the AI change the clinical question or invent scoring rubrics?',
    a: 'Never. The platform strictly enforces administrator-defined question banks and official scoring rubrics. The AI may personalise the conversational setup using your verified CV facts (e.g. asking about your specific Sepsis QIP), but it is programmatically barred from altering the core competency tested, changing the rubric criteria, or making assumptions about your career.'
  },
  {
    q: 'Does this service guarantee I will be appointed to an ST role?',
    a: 'No. Specialty training recruitment in the UK is a competitive national selection process determined solely by official recruitment panels. We do not promise appointment, ranking quotas, or score guarantees. We provide structured, pressure-tested simulation and objective rubric-anchored feedback so you can perform at your personal best.'
  },
  {
    q: 'How are my voice recordings and interview transcripts handled?',
    a: 'Your audio is processed in real time to generate your transcript and speech pacing metrics. Audio retention is completely optional and requires your explicit consent. If you decline audio storage, the recording is discarded immediately after transcription. You can delete your simulation history, transcripts, and account at any time.'
  },
  {
    q: 'What equipment and browser do I need?',
    a: 'Any standard desktop, laptop, or tablet with a working microphone and speakers/headphones running Chrome, Safari, Edge, or Firefox. Our pre-interview Device Check will test your microphone sensitivity and network connection before any mock begins.'
  }
];
