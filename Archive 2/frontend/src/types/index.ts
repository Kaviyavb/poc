export interface PrescriberResult {
  emp_id: string;
  manager_id: string;
  employee_email: string;
  territory: string;
  hcp_id: string;
  npi: string;
  prescriber_first_name: string;
  prescriber_last_name: string;
  text_file: string;
  png_file: string;
}

export interface PrescriberSearchResponse {
  message: string;
  count: number;
  results: PrescriberResult[];
}

export interface MedicineDetails {
  medicineName: string;
  genericName: string;
  indication: string;
  dosage: string;
  contraindications: string;
  safetyInformation: string;
  storageInstructions: string;
  notes: string;
}
