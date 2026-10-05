/**
 * Microsoft Lists / SharePoint Repository Adapter
 * 
 * Prepares the architectural interface to connect with Microsoft 365 Lists / SharePoint.
 * Follows the 8 standard lists defined in the GT2 Technical Architecture.
 */

export interface MicrosoftListConfig {
  siteUrl: string;
  listNames: {
    indicators: 'RE_Indicators';
    institutions: 'RE_Institutions';
    cycles: 'RE_Cycles';
    measurements: 'RE_Measurements';
    evidence: 'RE_Evidence';
    trainingActions: 'RE_TrainingActions';
    ideAssessments: 'RE_IDEAssessments';
    usersRoles: 'RE_UsersRoles';
  };
}

export const DEFAULT_MS_LISTS_CONFIG: MicrosoftListConfig = {
  siteUrl: 'https://redeequidade.sharepoint.com/sites/monitoramento-gt2',
  listNames: {
    indicators: 'RE_Indicators',
    institutions: 'RE_Institutions',
    cycles: 'RE_Cycles',
    measurements: 'RE_Measurements',
    evidence: 'RE_Evidence',
    trainingActions: 'RE_TrainingActions',
    ideAssessments: 'RE_IDEAssessments',
    usersRoles: 'RE_UsersRoles',
  },
};

/**
 * Field Mappings between Domain Entities and Microsoft Lists Columns
 */
export const MS_LIST_COLUMNS = {
  RE_Indicators: [
    { name: 'Title', type: 'Single line of text', mapsTo: 'id (e.g. I01)' },
    { name: 'IndicatorName', type: 'Single line of text', mapsTo: 'name' },
    { name: 'DimensionCode', type: 'Choice', mapsTo: 'dimensionId' },
    { name: 'FormulaText', type: 'Multiple lines of text', mapsTo: 'formula' },
    { name: 'UnitText', type: 'Single line of text', mapsTo: 'unit' },
    { name: 'PeriodicityChoice', type: 'Choice', mapsTo: 'frequency' },
    { name: 'TargetDefinition', type: 'Multiple lines of text', mapsTo: 'targetDefinition' },
    { name: 'PriorityChoice', type: 'Choice', mapsTo: 'priority' },
    { name: 'CoreRecommendedBool', type: 'Yes/No', mapsTo: 'coreRecommended' },
    { name: 'ActiveBool', type: 'Yes/No', mapsTo: 'active' },
  ],
  RE_Institutions: [
    { name: 'Title', type: 'Single line of text', mapsTo: 'acronym' },
    { name: 'FullName', type: 'Single line of text', mapsTo: 'name' },
    { name: 'SphereChoice', type: 'Choice (Distrital/Federal)', mapsTo: 'sphere' },
    { name: 'InstitutionType', type: 'Choice', mapsTo: 'institutionType' },
    { name: 'ActiveBool', type: 'Yes/No', mapsTo: 'active' },
    { name: 'JoinedAtDate', type: 'Date and Time', mapsTo: 'joinedAt' },
  ],
  RE_Cycles: [
    { name: 'Title', type: 'Single line of text', mapsTo: 'name (e.g. Ciclo 2026)' },
    { name: 'ReferenceYearNum', type: 'Number', mapsTo: 'referenceYear' },
    { name: 'StatusChoice', type: 'Choice (planned/collection_open/validation/closed)', mapsTo: 'status' },
    { name: 'StartDate', type: 'Date and Time', mapsTo: 'startDate' },
    { name: 'EndDate', type: 'Date and Time', mapsTo: 'endDate' },
    { name: 'IsBaselineBool', type: 'Yes/No', mapsTo: 'isBaseline' },
  ],
  RE_Measurements: [
    { name: 'Title', type: 'Single line of text', mapsTo: 'id' },
    { name: 'IndicatorLookup', type: 'Lookup (RE_Indicators)', mapsTo: 'indicatorId' },
    { name: 'InstitutionLookup', type: 'Lookup (RE_Institutions)', mapsTo: 'institutionId' },
    { name: 'CycleLookup', type: 'Lookup (RE_Cycles)', mapsTo: 'cycleId' },
    { name: 'RawValueNum', type: 'Number', mapsTo: 'rawValue' },
    { name: 'StatusChoice', type: 'Choice (draft/submitted/validated/rejected)', mapsTo: 'status' },
    { name: 'SubmittedByPerson', type: 'Person or Group', mapsTo: 'submittedBy' },
    { name: 'ValidatedByPerson', type: 'Person or Group', mapsTo: 'validatedBy' },
    { name: 'ValidationNotes', type: 'Multiple lines of text', mapsTo: 'notes' },
  ],
  RE_Evidence: [
    { name: 'Title', type: 'Single line of text', mapsTo: 'title' },
    { name: 'MeasurementLookup', type: 'Lookup (RE_Measurements)', mapsTo: 'measurementId' },
    { name: 'EvidenceTypeChoice', type: 'Choice', mapsTo: 'evidenceType' },
    { name: 'DocumentUrl', type: 'Hyperlink', mapsTo: 'url' },
    { name: 'ValidationStatusChoice', type: 'Choice (pending/accepted/rejected)', mapsTo: 'validationStatus' },
    { name: 'AccessLevelChoice', type: 'Choice (public/network/restricted)', mapsTo: 'accessLevel' },
  ],
};
