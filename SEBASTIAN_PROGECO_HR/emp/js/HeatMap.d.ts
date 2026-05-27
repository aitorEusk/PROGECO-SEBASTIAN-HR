/**
 * @namespace sebastian.heatmap
 * @description Calendar heatmap component for daily scores.
 *
 * Usage – call from any HTML expression or JS/TS module:
 *
 *   sebastian.heatmap.renderHeatmap('myModuleName', '#myContainer')
 *   sebastian.heatmap.renderHeatmap('myModuleName', '#myContainer', 'Health Score')
 *
 * The function reads the data rows stored in the flx-list whose
 * modulename attribute matches the given name.  Each row must provide:
 *
 *   Daydate    – date string ("/Date(ms)/" or ISO "YYYY-MM-DD")
 *   ScoreColor – 'success' | 'warning' | 'danger' | 'muted'
 *   Value      – (optional) numeric or string value shown in the tooltip
 *
 * The grid is laid out as a GitHub-style contributions calendar:
 *   - Columns  = weeks  (52 or 53 depending on year)
 *   - Rows     = day of week  (row 0 = Monday … row 6 = Sunday)
 *   - Empty cells are rendered for the partial first/last week.
 *   - Total filled cells always equals the number of days in the year.
 */
declare namespace sebastian.heatmap {
    /**
     * Reads data from the flx-list identified by `moduleName`,
     * builds the heatmap HTML and injects it into `targetElementSelector`.
     *
     * @param valueLabelKey  Optional localization key for the value shown in the tooltip
     *                       (e.g. 'heatmap.healthScore').
     *                       If omitted, only the date is shown.
     */
    function renderHeatmap(moduleName: string, targetElementSelector: string, valueLabelKey?: string): void;
}
