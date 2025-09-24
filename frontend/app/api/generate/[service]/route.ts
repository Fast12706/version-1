import { NextRequest, NextResponse } from 'next/server';

// Mock AI service for document generation
const generateDocument = async (service: string, bullets: string[]): Promise<string> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const templates: { [key: string]: string } = {
    'final-report': `FINAL MEDICAL REPORT

Patient Information:
- Date: ${new Date().toLocaleDateString()}
- Time: ${new Date().toLocaleTimeString()}

Clinical Notes:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

Assessment and Plan:
Based on the clinical presentation and examination findings, the patient's condition has been thoroughly evaluated. The following recommendations are made:

1. Continue current treatment protocol
2. Monitor patient response
3. Follow up as scheduled

Physician Signature: Dr. [Your Name]
License Number: [Your License]
Date: ${new Date().toLocaleDateString()}`,

    'insurance-approval': `INSURANCE APPROVAL REQUEST

Patient: [Patient Name]
Policy Number: [Policy Number]
Date of Service: ${new Date().toLocaleDateString()}

Medical Justification:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

Requested Services:
- Medical consultation and evaluation
- Diagnostic procedures as indicated
- Treatment plan implementation

This request is medically necessary based on the patient's clinical presentation and standard medical protocols.

Physician: Dr. [Your Name]
License: [Your License]
Date: ${new Date().toLocaleDateString()}`,

    'consultation': `MEDICAL CONSULTATION REPORT

Consultation Date: ${new Date().toLocaleDateString()}
Referring Physician: [Referring Doctor]
Consulting Physician: Dr. [Your Name]

Chief Complaint:
Patient presents with the following concerns:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

History of Present Illness:
The patient's condition has been evaluated with attention to the presenting symptoms and clinical findings.

Assessment:
Based on the clinical evaluation, the following assessment is made:

Plan:
1. Continue current management
2. Additional investigations as needed
3. Follow-up as indicated

Recommendations:
The patient should follow the outlined treatment plan and return for follow-up as scheduled.

Consulting Physician: Dr. [Your Name]
License: [Your License]
Date: ${new Date().toLocaleDateString()}`
  };

  return templates[service] || `Generated document for ${service}:\n\n${bullets.map(bullet => `• ${bullet}`).join('\n')}`;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { service: string } }
) {
  try {
    const body = await request.json();
    const { bullets } = body;

    if (!bullets || !Array.isArray(bullets)) {
      return NextResponse.json({
        success: false,
        error: {
          message: 'Invalid request: bullets array is required'
        }
      }, { status: 400 });
    }

    const result = await generateDocument(params.service, bullets);

    return NextResponse.json({
      success: true,
      data: {
        result
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Failed to generate document',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}
