// Master Tabs
export const MASTERTABS = ['Venues', 'Pools', 'LS Prize', 'Distributions', 'Enclosures', 'Terminals', 'Users', 'Users KYC', 'Locations'];

// Venues Data
export const venueOptions = ['KB1', 'KB2', 'KB3', 'LSC', 'LSC36', 'LSS'];

export type Venue = {
    id: string;
    sNo: number;
    venueCode: string;
    venueName: string;
    venueClassification: string;
    combined: string;
    status: string;
};

export const venueData: Venue[] = [
    { id: '1', sNo: 1, venueCode: 'KB1', venueName: 'KB1', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '2', sNo: 2, venueCode: 'KB2', venueName: 'KB2', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '3', sNo: 3, venueCode: 'KB3', venueName: 'KB3', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '4', sNo: 4, venueCode: 'LSC', venueName: 'LSC', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '5', sNo: 5, venueCode: 'LSC36', venueName: 'LSC36', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '6', sNo: 6, venueCode: 'LSS', venueName: 'LSS', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '7', sNo: 7, venueCode: 'LSS36', venueName: 'LSS36', venueClassification: 'Major', combined: 'N', status: 'Active' },
    { id: '8', sNo: 8, venueCode: 'SON', venueName: 'Scone (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
    { id: '9', sNo: 9, venueCode: 'SBY', venueName: 'Salisbury (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
    { id: '10', sNo: 10, venueCode: 'YAR', venueName: 'Yarmouth (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
];

// Distributions
export type Distribution = {
    distributionName: string;
    distributionType: string;
    salesCode: string;
    percentage: number;
    status: string;
};

export type Pool = {
    poolName: string;
    distributions: Distribution[];
};

export const poolData: Pool[] = [
    {
        poolName: 'Win',
        distributions: [
            { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
        ],
    },
    {
        poolName: 'Second Horse Pool',
        distributions: [
            { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
        ],
    },
    {
        poolName: 'Place',
        distributions: [
            { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
            { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
        ],
    },
];