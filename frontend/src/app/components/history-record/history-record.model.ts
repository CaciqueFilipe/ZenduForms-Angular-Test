export interface HistoryRecord {
    id?: number;
    check: boolean;
    tripDates: string;
    startTime: string;
    vehicleId: string;
    odometerStart: string;
    odometerEnd: string;
    submissionsEmailId: string;
    submissionsTime: string;
}