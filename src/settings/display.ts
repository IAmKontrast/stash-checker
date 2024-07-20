import {newSettingsSection} from "./settings";
import {CustomDisplayRule, readable, Target} from "../dataTypes";
import {getValue, StorageKey} from "./storage";
import {OptionKey, stringOptions} from "./general";
import Sortable from 'sortablejs';
import {moveIndex} from "../utils";

// TODO: settings with a site pattern/regex (powerful and easy to verify - isActive indicator)
// TODO: escape input examples in description
const customRulesMap: Map<Target, CustomDisplayRule[]> = new Map([
    [Target.Scene, [{pattern: "*", filter: "organized:true", display: {color: "purple"}}, {pattern: "*", filter: "organized:true", display: {color: "purple"}}, {pattern: "*", filter: "organized:true", display: {color: "purple"}}, {pattern: "*", filter: "organized:true", display: {color: "purple"}}, {pattern: "*", filter: "file_count:{value:1,modifier:GREATER_THAN}", display: {color: "brown"}}]],
    [Target.Studio, [{pattern: "*://stashdb.org/*", filter: "scene_count:{value:5,modifier:GREATER_THAN}", display: {color: "purple"}}]]
]);

export const customDisplayRules: Map<Target, CustomDisplayRule[]> = await getValue<Map<Target, CustomDisplayRule[]>>(StorageKey.CustomDisplayRules, customRulesMap);

export function initDisplaySettings() {
    let description = "Custom display rules can change the display of check marks. " +
        "A rule applies when the URL pattern matches the current website and the GraphQL filter matches the element. " +
        "Rules higher in the list have higher priority. " +
        "The order can be changed by dragging. " +
        "If no rule applies, the default display options are use. " +
        "GraphQL filters may not contain AND/OR/NOT. " +
        "Multiple filters can still be concatenated by ','."
    let displaySection = newSettingsSection("display", "Display", description);
    populateDisplaySection(displaySection);
}

// TODO: use tabs for targets?
// TODO: separate modal/tab for display settings
function populateDisplaySection(displaySection: HTMLElement) {
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    tableHead.append(tableHeadRow());
    table.append(tableHead);

    let tableBody = document.createElement("tbody");
    table.append(tableBody);
    let tableHeading = document.createElement("h2");
    tableHeading.innerHTML = readable(Target.Scene)
    displaySection.append(tableHeading);
    displaySection.append(table);
    Sortable.create(tableBody, {
        onEnd: event => {
            if (event.oldIndex && event.newIndex) {
                let old = customDisplayRules.get(Target.Scene) ?? [];
                customDisplayRules.set(Target.Scene, moveIndex(old, event.oldIndex, event.newIndex));
            }
        }
    });
    populateCustomRulesTable(tableBody, Target.Scene);
}

function populateCustomRulesTable(tableBody: HTMLTableSectionElement, target: Target) {
    let tableRows = Array.from(customDisplayRules.get(target) ?? [])
        .map(tableRow);
    tableBody.replaceChildren(...tableRows);
}

function tableHeadRow(): HTMLTableRowElement {
    let row = document.createElement("tr");
    row.innerHTML = "<th>URL Pattern</th><th>GraphQL Filter</th><th>Color</th><th>Preview</th>";
    return row;
}

function tableRow(customRule: CustomDisplayRule): HTMLTableRowElement {
    let row = document.createElement("tr");
    let preview = document.createElement("span");
    preview.innerHTML = stringOptions.get(OptionKey.checkMark)!;
    preview.classList.add("stashCheckerSymbol");
    preview.style.color = customRule.display.color;
    let previewElement = document.createElement("td");
    previewElement.classList.add("center");
    previewElement.append(preview)

    row.append(
        dataCell(customRule.pattern),
        dataCell(customRule.filter),
        dataCell(customRule.display.color),
        previewElement,
    );
    return row;
}

function dataCell(innerHtml: string): HTMLTableCellElement {
    let cell = document.createElement("td");
    cell.innerHTML = innerHtml
    return cell;
}
