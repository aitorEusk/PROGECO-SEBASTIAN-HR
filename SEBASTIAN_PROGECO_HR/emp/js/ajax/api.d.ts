/**
 * @namespace sebastian.api.planner
 */
declare namespace sebastian.api.planner {
    /**
    * api for getPlannerParams
    * @class getPlannerParams
    * @constructor
    * @return { getPlannerParams }.
    */
    class getPlannerParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        Mode: string;
        ViewMode: string;
        RangeDate: Date;
        AdditionalWhere: string;
        ShiftWhere: string[];
        GroupWhere: string[];
        EmployeeWhere: string[];
    }
    /**
    * api for getPlannerResponse
    * @class getPlannerResponse
    * @constructor
    * @return {getPlannerResponse} .
    */
    class getPlannerResponse {
        Details: {}[];
        Cards: {}[];
        FirstColumn: {}[];
        Title: string;
        DateStart: string;
        DateEnd: string;
        ObjectName: string;
        GroupColumn: {}[];
        orgUnitId: number;
        EmployeeGSCard: {}[];
        Mode: string;
        singleEmployeeView: boolean;
        Absences: {}[];
        HolidaysTypes: {}[];
        RangeDate: Date;
    }
}
/**
 * @namespace sebastian.api.dashboard
 */
declare namespace sebastian.api.dashboard {
    /**
    * api for getScheduleDashboardResponse
    * @class getScheduleResponse
    * @constructor
    * @return { getScheduleResponse }.
    */
    class getScheduleResponse {
        JourneysList: {}[];
    }
}
