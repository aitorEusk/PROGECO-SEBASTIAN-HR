/**
 * Climate Pulse — Portal WebComponent
 * Displays an overlay climate pulse prompt triggered after clock-out, on login, or on navigation.
 * 3-step flow: response (green/yellow/red) → factors (optional) → thanks
 *
 * Usage: <flx-climatepulse></flx-climatepulse>
 */
interface ClimatePulseFactor {
    FactorId: number;
    Name: string;
    IconClass: string;
    SortOrder: number;
}
interface ClimatePulseData {
    PulseId: number;
    ConfigId: number;
    EmployeeId: number;
    StatusId: number;
    SourceChannel: string;
    CreatedDate: string;
    ExpiresAt: string;
    DismissCount: number;
    QuestionText: string;
    SecondaryQuestionText: string;
    PrivacyMode: number;
    AccessPointTimeoutSec: number;
    AccessPointShowProbability: number;
    HasFactors: boolean;
    Factors?: ClimatePulseFactor[];
}
declare module flexygo.ui.wc {
    class FlxClimatePulseElement extends HTMLElement {
        connected: boolean;
        pulseData: ClimatePulseData;
        selectedValue: number;
        selectedFactors: number[];
        comment: string;
        step: number;
        lang: string;
        constructor();
        init(): void;
        refresh(): void;
        loadPending(): void;
        render(): void;
        renderStep1($card: JQuery): void;
        renderStep2($card: JQuery): void;
        renderThanks($el: JQuery): void;
        submit(): void;
        dismiss(): void;
        connectedCallback(): void;
        attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
        static observedAttributes: string[];
    }
}
