import type { MedicineDetails } from '../types';

const labelMap: Record<string, keyof MedicineDetails> = {
  'medicine name': 'medicineName',
  'generic name': 'genericName',
  'indication': 'indication',
  'dosage': 'dosage',
  'contraindications': 'contraindications',
  'safety information': 'safetyInformation',
  'storage instructions': 'storageInstructions',
  'notes': 'notes',
};

export function parseMedicineDetails(textFile: string): MedicineDetails {
  const details: MedicineDetails = {
    medicineName: 'Not available',
    genericName: 'Not available',
    indication: 'Not available',
    dosage: 'Not available',
    contraindications: 'Not available',
    safetyInformation: 'Not available',
    storageInstructions: 'Not available',
    notes: 'Not available',
  };

  const lines = textFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  lines.forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();

    const mappedKey = labelMap[key];
    if (mappedKey) {
      details[mappedKey] = value || 'Not available';
    }
  });

  return details;
}
