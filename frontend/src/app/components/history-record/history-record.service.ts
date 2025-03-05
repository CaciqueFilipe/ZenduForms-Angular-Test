import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HistoryRecord } from "./history-record.model";

@Injectable({
    providedIn: "root",
})

export class HistoryRecordsService {
    baseUrl = " http://localhost:3001/historyRecords";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }


    create(historyRecord: HistoryRecord): Observable<HistoryRecord> {
        return this.http.post<HistoryRecord>(this.baseUrl, historyRecord).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    read(): Observable<HistoryRecord[]> {
        return this.http.get<HistoryRecord[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    readById(id: string): Observable<HistoryRecord> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<HistoryRecord>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    update(historyRecord: HistoryRecord): Observable<HistoryRecord> {
        const url = `${this.baseUrl}/${historyRecord.id}`;
        return this.http.put<HistoryRecord>(url, historyRecord).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    delete(id: number): Observable<HistoryRecord> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<HistoryRecord>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
