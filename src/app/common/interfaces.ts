import { IButton } from 'selenium-webdriver';

export interface IBreadcrumbs {
    localeKey: string;
    url: string;
}

export interface ITableSetupData {
    cols: IColData[];
    type: string;
    actions?: IActionData[];
    params?: IParams;
    conditions?: IConditions;
}
export interface IParams {
    deleteParams?: string;
    statusParams?: string;
}

export interface IConditions {
    showTableHeader?: boolean;
    showTableFooter?: boolean;
    showApplyStatus?: boolean;
    showSearchStatus?: boolean;
    showExport?: boolean;
    showColumnHide?: boolean;
    showFilter?: boolean;
    showFilterExport?: boolean;
    showSaveFilter?: boolean;
    showButton?: IShowButton;
}

export interface IShowButton {
    routerLink?: string;
    buttonName?: string;
}

export interface IColData {
    type: string;
    colName: string;
    colFieldname: string;
}

export interface IActionData {
    id: number;
    buttonTitle: string;
    class: string;
    type: string;
    permission?: string;
}
