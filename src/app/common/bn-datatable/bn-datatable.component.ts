import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { Component, Directive, OnInit, Output, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { SortService } from './sortService';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: "sortBy" })
export class SortPipe {
    transform(array: Array<string>, obj: any): Array<string> {
        let args = obj.sortField;
        if (array) {
            if (obj.objectName) {
                let mainObject = obj.objectName
                if (obj.direction == 'desc') {
                    array.sort((a: any, b: any) => {
                        if (a[mainObject] && b[mainObject]) {
                            if (a[mainObject][args] && b[mainObject][args]) {
                                if (isNaN(a[mainObject][args])) {
                                    if (a[mainObject][args].toString().toLowerCase() < b[mainObject][args].toString().toLowerCase()) {
                                        return -1;
                                    } else if (a[mainObject][args].toString().toLowerCase() > b[mainObject][args].toString().toLowerCase()) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    if (parseInt(a[mainObject][args]) < parseInt(b[mainObject][args])) {
                                        return -1;
                                    } else if (parseInt(a[mainObject][args]) > parseInt(b[mainObject][args])) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }
                            } else {
                                return 0;
                            }
                        } else if (a[mainObject] || b[mainObject]) {
                            if (a[mainObject]) {
                                return 1
                            } else {
                                return -1
                            }
                        } else {
                            return 0;
                        }
                    });
                } else {
                    array.sort((b: any, a: any) => {
                        if (a[mainObject] && b[mainObject]) {
                            if (a[mainObject][args] && b[mainObject][args]) {
                                if (isNaN(a[mainObject][args])) {
                                    if (a[mainObject][args].toString().toLowerCase() < b[mainObject][args].toString().toLowerCase()) {
                                        return -1;
                                    } else if (a[mainObject][args].toString().toLowerCase() > b[mainObject][args].toString().toLowerCase()) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    if (parseInt(a[mainObject][args]) < parseInt(b[mainObject][args])) {
                                        return -1;
                                    } else if (parseInt(a[mainObject][args]) > parseInt(b[mainObject][args])) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }
                            } else {
                                return 0;
                            }
                        } else if (a[mainObject] || b[mainObject]) {
                            if (b[mainObject]) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                        else {
                            return 0;
                        }
                    });
                }
            } else {
                if (obj.direction == 'desc') {
                    array.sort((a: any, b: any) => {
                        if (a[args] && b[args]) {
                            if (isNaN(a[args])) {
                                if (a[args].toString().toLowerCase() < b[args].toString().toLowerCase()) {
                                    return -1;
                                } else if (a[args].toString().toLowerCase() > b[args].toString().toLowerCase()) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            } else {
                                if (parseInt(a[args]) < parseInt(b[args])) {
                                    return -1;
                                } else if (parseInt(a[args]) > parseInt(b[args])) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }

                        }
                        else {
                            return 0;
                        }
                    });
                } else {
                    array.sort((b: any, a: any) => {
                        if (a[args] && b[args]) {
                            if (isNaN(a[args])) {
                                if (a[args].toString().toLowerCase() < b[args].toString().toLowerCase()) {
                                    return -1;
                                } else if (a[args].toString().toLowerCase() > b[args].toString().toLowerCase()) {
                                    return 1;
                                }
                            } else {
                                if (parseInt(a[args]) < parseInt(b[args])) {
                                    return -1;
                                } else if (parseInt(a[args]) > parseInt(b[args])) {
                                    return 1;
                                }
                            }

                        } else {
                            return 0;
                        }
                    });
                }
            }
            return array;
        }

    }
}


@Pipe({
    name: 'filter',
    pure: false
})
export class SearchFilter implements PipeTransform {

    transform(items: any, term: string): any {
        if (!term) return items;
        if (!items) return [];

        return SearchFilter.filter(items, term);
    }

    static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {


        const toCompare = term.toLowerCase();


        return items.filter(function (item: any) {
            for (let property in item) {


                if (item[property] === null) {
                    continue;
                }

                let type = typeof item[property]
                if (type == 'object') {
                    for (let property1 in item[property]) {
                        if (item[property][property1] === null) {
                            continue;
                        }
                        if (item[property][property1].toString().toLowerCase().includes(toCompare)) {
                            return true;
                        }
                    }
                } else {
                    if (item[property].toString().toLowerCase().includes(toCompare)) {
                        return true;
                    }
                }

            }
            return false;
        });
    }
}


@Component({
    selector: '[sortable-column]',
    styles: [` 
        .sort-column {
            width:6px;
            position: relative;
            text-align: center;
            height:9px;
            padding-left:4px;
        }
        .sort-column i{
            color: rgb(218, 218, 218);
            font-size: 12px;
        }
        .sort-column i.sorted{
          color: #8b8b8b;
        }
        .hover-pointer{
            cursor: pointer;
            position: relative;
        }
    `],
    template: `
        <div class="hover-pointer">
            <span class="thead-title"><ng-content></ng-content></span>
            <span class="sort-column" *ngIf="displaySortIcon">
                <span *ngIf="sortDirection">
                    <em class="fa fa-long-arrow-up" *ngIf="sortDirection == 'asc'" [ngClass]="{'sorted' : sortDirection == 'asc'}"></em>
                    <em class="fa fa-long-arrow-down" *ngIf="sortDirection == 'desc'" [ngClass]="{'sorted' : sortDirection == 'desc'}"></em>
                </span>
                <span *ngIf="!sortDirection">
                    <em class="fa fa-arrows-v"></em> 
                </span>
            </span>
        </div>
    `
})
export class SortableColumnComponent implements OnInit, OnDestroy {

    constructor(private sortService: SortService) {
        // console.log("sort direction:", this.sortDirection)
    }

    @Input('sortable-column')
    columnName: string;

    @Input('sort-direction')
    sortDirection: string = '';

    @Input('displaySortIcon')
    displaySortIcon: string;

    @Input('object-name')
    objectName: string = '';

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        if (this.displaySortIcon) {
            this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection, objectName: this.objectName });
        }
    }

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName != event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}


@Directive({
    selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

    constructor(private sortService: SortService) { }

    @Output()
    sorted = new EventEmitter();

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}


@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(protected sanitizer: DomSanitizer) { }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}

@Pipe({
    name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {
    transform(string: any, length: any): any {
        // let dump1 = string;
        if (string && string.length > length) {
            return string.substr(0, length) + "...";
        }
        return string;
        // return dump1;
    }
}
