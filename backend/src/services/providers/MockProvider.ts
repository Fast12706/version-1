import { LLMProvider } from './LLMProvider';

/**
 * Mock AI Provider
 * Returns fake but realistic medico-legal documents
 * Used for MVP development and testing
 */
export class MockProvider implements LLMProvider {
  /**
   * Generate a mock medico-legal document
   * @param service - The type of document to generate
   * @param bullets - Array of bullet points from the doctor
   * @returns Mock generated document
   */
  async generateReport(service: string, bullets: string[]): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const timestamp = new Date().toISOString();
    const serviceName = this.getServiceDisplayName(service);
    
    // Generate different types of reports based on service
    switch (service) {
      case 'final-report':
        return this.generateFinalReport(bullets, timestamp);
      
      case 'insurance-approval':
        return this.generateInsuranceApproval(bullets, timestamp);
      
      case 'dama-form':
        return this.generateDAMAForm(bullets, timestamp);
      
      case 'consultation':
        return this.generateConsultation(bullets, timestamp);
      
      case 'icd-10-finder':
        return this.generateICD10Finder(bullets, timestamp);
      
      case 'police-report':
        return this.generatePoliceReport(bullets, timestamp);
      
      case 'discharge-summary':
        return this.generateDischargeSummary(bullets, timestamp);
      
      default:
        return this.generateGenericReport(serviceName, bullets, timestamp);
    }
  }

  /**
   * Convert service code to display name
   */
  private getServiceDisplayName(service: string): string {
    const serviceNames: { [key: string]: string } = {
      'final-report': 'Final Medical Report',
      'insurance-approval': 'Insurance Approval Request',
      'dama-form': 'DAMA (Discharge Against Medical Advice) Form',
      'consultation': 'Medical Consultation Report',
      'icd-10-finder': 'ICD-10 Code Finder',
      'police-report': 'Police Medical Report',
      'discharge-summary': 'Discharge Summary'
    };
    return serviceNames[service] || service;
  }

  /**
   * Generate a final medical report
   */
  private generateFinalReport(bullets: string[], timestamp: string): string {
    return `
FINAL MEDICAL REPORT
Generated: ${timestamp}

PATIENT PRESENTATION:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

CLINICAL ASSESSMENT:
Based on the presenting symptoms and clinical findings, the patient demonstrates signs consistent with the reported condition. A thorough examination was conducted following standard medical protocols.

DIAGNOSTIC WORKUP:
- Vital signs were assessed and documented
- Appropriate diagnostic tests were ordered based on clinical presentation
- Differential diagnosis was considered

TREATMENT PLAN:
- Immediate interventions were implemented as clinically indicated
- Patient was monitored for response to treatment
- Follow-up care was arranged as appropriate

PROGNOSIS:
The patient's condition is being managed according to established medical guidelines. Continued monitoring and follow-up are recommended.

ATTENDING PHYSICIAN: [Doctor Name]
SIGNATURE: ________________
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate an insurance approval request
   */
  private generateInsuranceApproval(bullets: string[], timestamp: string): string {
    return `
INSURANCE APPROVAL REQUEST
Generated: ${timestamp}

PATIENT INFORMATION:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

MEDICAL JUSTIFICATION:
The requested treatment/procedure is medically necessary based on the patient's clinical presentation and diagnostic findings. The proposed intervention aligns with evidence-based medical practices and is essential for optimal patient care.

CLINICAL INDICATIONS:
- Patient meets established criteria for the requested procedure
- Alternative treatments have been considered and deemed less appropriate
- Delay in treatment could adversely affect patient outcomes

COST-BENEFIT ANALYSIS:
The proposed treatment offers significant clinical benefit with acceptable risk profile. The cost of treatment is justified by the expected improvement in patient outcomes and quality of life.

RECOMMENDATION:
We strongly recommend approval of this request to ensure timely and appropriate medical care for the patient.

PHYSICIAN: [Doctor Name]
LICENSE: [License Number]
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate a DAMA form
   */
  private generateDAMAForm(bullets: string[], timestamp: string): string {
    return `
DISCHARGE AGAINST MEDICAL ADVICE (DAMA) FORM
Generated: ${timestamp}

PATIENT INFORMATION:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

MEDICAL ADVICE GIVEN:
The patient has been advised of the following:
- Current medical condition and associated risks
- Recommended treatment plan and its benefits
- Potential complications of leaving against medical advice
- Importance of follow-up care

PATIENT ACKNOWLEDGMENT:
The patient acknowledges that they:
- Understand the risks of leaving against medical advice
- Have been informed of alternative treatment options
- Accept full responsibility for their decision
- Will seek immediate medical attention if condition worsens

WITNESS INFORMATION:
Witness Name: ________________
Witness Signature: ________________
Date: ${new Date().toLocaleDateString()}

ATTENDING PHYSICIAN: [Doctor Name]
SIGNATURE: ________________
DATE: ${new Date().toLocaleDateString()}

PATIENT SIGNATURE: ________________
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate a consultation report
   */
  private generateConsultation(bullets: string[], timestamp: string): string {
    return `
MEDICAL CONSULTATION REPORT
Generated: ${timestamp}

CONSULTATION REQUEST:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

CONSULTANT ASSESSMENT:
After thorough review of the patient's history, examination findings, and diagnostic results, the following assessment is provided:

CLINICAL FINDINGS:
- Patient presents with the reported symptoms
- Physical examination reveals relevant findings
- Diagnostic workup supports the clinical impression

RECOMMENDATIONS:
1. Immediate management strategies
2. Further diagnostic considerations
3. Treatment modifications if indicated
4. Follow-up requirements

PROGNOSIS:
Based on current clinical status and response to treatment, the prognosis is [favorable/guarded/poor] with appropriate management.

CONSULTANT: [Doctor Name]
SPECIALTY: [Specialty]
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate ICD-10 code finder results
   */
  private generateICD10Finder(bullets: string[], timestamp: string): string {
    return `
ICD-10 CODE FINDER RESULTS
Generated: ${timestamp}

SEARCH CRITERIA:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

SUGGESTED ICD-10 CODES:
Based on the provided symptoms and clinical findings, the following ICD-10 codes may be applicable:

PRIMARY DIAGNOSIS:
- [Primary Code]: [Description]
- [Secondary Code]: [Description]

ADDITIONAL CODES:
- [Additional Code 1]: [Description]
- [Additional Code 2]: [Description]

CODING NOTES:
- Ensure proper documentation supports the selected codes
- Consider additional specificity if available
- Review coding guidelines for accuracy

RECOMMENDED ACTION:
Verify codes against current ICD-10-CM guidelines and ensure proper documentation supports the selected codes.

GENERATED BY: Emergency-Mind AI
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate a police report
   */
  private generatePoliceReport(bullets: string[], timestamp: string): string {
    return `
POLICE MEDICAL REPORT
Generated: ${timestamp}

INCIDENT DETAILS:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

MEDICAL EXAMINATION FINDINGS:
- Patient was examined for signs of injury or trauma
- Vital signs were assessed and documented
- Physical examination was conducted following forensic protocols

INJURY ASSESSMENT:
- No visible injuries noted OR
- Injuries documented with photographs and measurements
- Mechanism of injury consistent with reported incident

FORENSIC EVIDENCE:
- Evidence collection procedures followed
- Chain of custody maintained
- Samples collected as appropriate

MEDICAL OPINION:
Based on the medical examination and clinical findings, the injuries are [consistent/inconsistent] with the reported mechanism of injury.

RECOMMENDATIONS:
- Immediate medical care if indicated
- Follow-up examination if required
- Evidence preservation protocols followed

EXAMINING PHYSICIAN: [Doctor Name]
LICENSE: [License Number]
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate a discharge summary
   */
  private generateDischargeSummary(bullets: string[], timestamp: string): string {
    return `
DISCHARGE SUMMARY
Generated: ${timestamp}

ADMISSION DETAILS:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

HOSPITAL COURSE:
- Patient was admitted and evaluated
- Diagnostic workup was completed
- Treatment was initiated and monitored
- Patient responded appropriately to therapy

DISCHARGE DIAGNOSIS:
- Primary: [Primary Diagnosis]
- Secondary: [Secondary Diagnoses]

DISCHARGE MEDICATIONS:
- [Medication 1]: [Dosage and instructions]
- [Medication 2]: [Dosage and instructions]

DISCHARGE INSTRUCTIONS:
- Activity restrictions as appropriate
- Medication compliance
- Follow-up appointments
- Warning signs to watch for

FOLLOW-UP:
- Primary care physician: [Name and contact]
- Specialist appointments: [As needed]
- Return to ED if: [Specific criteria]

DISCHARGING PHYSICIAN: [Doctor Name]
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }

  /**
   * Generate a generic report for unknown services
   */
  private generateGenericReport(serviceName: string, bullets: string[], timestamp: string): string {
    return `
${serviceName.toUpperCase()}
Generated: ${timestamp}

CLINICAL NOTES:
${bullets.map(bullet => `• ${bullet}`).join('\n')}

ASSESSMENT:
Based on the provided clinical information, this report has been generated to document the patient's condition and treatment plan.

RECOMMENDATIONS:
- Continue current treatment as indicated
- Monitor patient response
- Follow up as appropriate

PHYSICIAN: [Doctor Name]
DATE: ${new Date().toLocaleDateString()}
    `.trim();
  }
}



