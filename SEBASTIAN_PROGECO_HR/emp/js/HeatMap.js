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
var sebastian;
(function (sebastian) {
    var heatmap;
    (function (heatmap) {
        /**
         * Parses a .NET JSON date string "/Date(ms)/" or a plain ISO string
         * and returns a UTC-based Date object.
         */
        function parseDotNetDate(value) {
            if (!value)
                return new Date(NaN);
            const match = value.match(/\/Date\(([-+]?\d+)(?:[+-]\d+)?\)\//);
            if (match) {
                return new Date(parseInt(match[1], 10));
            }
            // Fallback: ISO string – append 'Z' if no timezone info to force UTC
            const iso = /[Zz]|[+-]\d{2}:?\d{2}$/.test(value) ? value : value + 'Z';
            return new Date(iso);
        }
        /** Formats a Date as "YYYY-MM-DD" using UTC components. */
        function toISODateUTC(d) {
            const y = d.getUTCFullYear();
            const m = ('0' + (d.getUTCMonth() + 1)).slice(-2);
            const day = ('0' + d.getUTCDate()).slice(-2);
            return `${y}-${m}-${day}`;
        }
        /** Formats a Date as "DD-MM-YYYY" using UTC components (for display). */
        function toDisplayDateUTC(d) {
            const y = d.getUTCFullYear();
            const m = ('0' + (d.getUTCMonth() + 1)).slice(-2);
            const day = ('0' + d.getUTCDate()).slice(-2);
            return `${day}-${m}-${y}`;
        }
        /**
         * Reads data from the flx-list identified by `moduleName`,
         * builds the heatmap HTML and injects it into `targetElementSelector`.
         *
         * @param valueLabelKey  Optional localization key for the value shown in the tooltip
         *                       (e.g. 'heatmap.healthScore').
         *                       If omitted, only the date is shown.
         */
        function renderHeatmap(moduleName, targetElementSelector, valueLabelKey) {
            var _a;
            const listElement = $(`flx-list[modulename="${moduleName}"]`);
            const rawData = (_a = listElement[0]) === null || _a === void 0 ? void 0 : _a.data;
            if (!rawData || rawData.length === 0) {
                $(targetElementSelector).html('');
                return;
            }
            const html = buildHeatmapGrid(rawData, valueLabelKey);
            const $target = $(targetElementSelector);
            $target.html(html);
            // --- cell click: open markings page for the clicked day ---------------
            $target.off('click.heatmap').on('click.heatmap', '.hm-cell:not(.hm-cell-empty)', function () {
                const formatDate = $(this).attr('DayDate') || '';
                if (!formatDate)
                    return;
                localStorage.removeItem('HR-MarkingsPage-Filter');
                flexygo.nav.openPageName('HR_MarkingsManagementSimple', '', `DateJourney='${formatDate}'`, `{'DayDate':'${formatDate}','StartDate':'${formatDate}','EndDate':'${formatDate}'}`, 'sliderightx90p', false, $(this));
            });
        }
        heatmap.renderHeatmap = renderHeatmap;
        /**
         * Builds the full heatmap grid HTML string from an ordered array of day records.
         * Data can start on any day of the year (e.g. today - 1 year).
         *
         * Layout:
         *   ┌───────┬─ week columns ─┐
         *   │ corner │  month labels  │  ← .hm-month-row
         *   ├───────┼────────────┤
         *   │ day   │                 │  ← .hm-day-col + .hm-grid
         *   │ labels│   cell grid    │
         *   └───────┴────────────┘
         */
        function buildHeatmapGrid(data, valueLabelKey) {
            const NUM_ROWS = 7; // Mon … Sun
            // --- resolve starting weekday offset ----------------------------------
            const firstDate = parseDotNetDate(data[0].Daydate);
            const startRow = (firstDate.getUTCDay() + 6) % 7; // 0=Mon … 6=Sun
            // Number of week-columns required to hold all days
            const numCols = Math.ceil((data.length + startRow) / NUM_ROWS);
            // --- build 2-D grid [col][row] ----------------------------------------
            const grid = Array.from({ length: numCols }, () => new Array(NUM_ROWS).fill(null));
            data.forEach((day, index) => {
                const position = index + startRow;
                const col = Math.floor(position / NUM_ROWS);
                const row = position % NUM_ROWS;
                grid[col][row] = day;
            });
            // --- translations -----------------------------------------------------
            const lblDate = flexygo.localization.translate('heatmap.date');
            const lblValue = valueLabelKey ? flexygo.localization.translate(valueLabelKey) : null;
            const monthStr = flexygo.localization.translate('heatmap.months');
            const dayStr = flexygo.localization.translate('heatmap.days');
            // Fallbacks in case the localization JS hasn't loaded the new keys yet
            const monthNames = (monthStr && monthStr !== 'heatmap.months')
                ? monthStr.split(',')
                : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const dayNames = (dayStr && dayStr !== 'heatmap.days')
                ? dayStr.split(',')
                : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            // --- month label per column (show only when month changes) -----------
            const monthLabels = new Array(numCols).fill('');
            let lastMonth = -1;
            for (let c = 0; c < numCols; c++) {
                for (let r = 0; r < NUM_ROWS; r++) {
                    const day = grid[c][r];
                    if (day) {
                        const month = parseDotNetDate(day.Daydate).getUTCMonth();
                        if (month !== lastMonth) {
                            monthLabels[c] = monthNames[month] || '';
                            lastMonth = month;
                        }
                        break;
                    }
                }
            }
            // --- month header row -------------------------------------------------
            let monthCells = '';
            for (let c = 0; c < numCols; c++) {
                monthCells += `<div class="hm-month-label" style="grid-column:${c + 1};font-size:10px;color:#999;">${monthLabels[c]}</div>`;
            }
            const monthRow = `<div class="hm-month-row" style="display:grid;grid-template-columns:repeat(${numCols},1fr);gap:2px;overflow:hidden;">${monthCells}</div>`;
            // --- day label column -------------------------------------------------
            let dayCells = '';
            for (let r = 0; r < NUM_ROWS; r++) {
                dayCells += `<div class="hm-day-label" style="font-size:10px;color:#999;text-align:right;padding-right:4px;display:flex;align-items:center;justify-content:flex-end;">${dayNames[r] || ''}</div>`;
            }
            const dayCol = `<div class="hm-day-col" style="display:grid;grid-template-rows:repeat(${NUM_ROWS},1fr);gap:2px;">${dayCells}</div>`;
            // --- cell grid --------------------------------------------------------
            let cells = '';
            for (let c = 0; c < numCols; c++) {
                for (let r = 0; r < NUM_ROWS; r++) {
                    const day = grid[c][r];
                    if (day) {
                        const color = (day.ScoreColor || 'muted').toString().trim();
                        const date = day.Daydate ? toISODateUTC(parseDotNetDate(day.Daydate)) : '';
                        const displayDate = day.Daydate ? toDisplayDateUTC(parseDotNetDate(day.Daydate)) : '';
                        const value = day.Value != null ? day.Value.toString() : '';
                        const titleAttr = lblValue && value
                            ? `${lblDate}: ${displayDate} | ${lblValue}: ${value}`
                            : `${lblDate}: ${displayDate}`;
                        cells += `<div class="hm-cell hm-cell-${color}" DayDate="${date}" Value="${value}" title="${titleAttr}"><i class="fa fa-square"></i></div>`;
                    }
                    else {
                        cells += `<div class="hm-cell hm-cell-empty"></div>`;
                    }
                }
            }
            const cellGrid = `<div class="hm-grid" style="display:grid;grid-auto-flow:column;grid-template-rows:repeat(${NUM_ROWS},1fr);grid-auto-columns:1fr;gap:2px;">${cells}</div>`;
            // --- assemble wrapper --------------------------------------------------
            // 2-col × 2-row CSS grid:
            //   [corner]   [month-row]
            //   [day-col]  [cell-grid]
            return (`<div class="hm-wrapper" style="display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;gap:2px 0;width:100%;">` +
                `<div class="hm-corner"></div>` +
                monthRow +
                dayCol +
                cellGrid +
                `</div>`);
        }
    })(heatmap = sebastian.heatmap || (sebastian.heatmap = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=HeatMap.js.map