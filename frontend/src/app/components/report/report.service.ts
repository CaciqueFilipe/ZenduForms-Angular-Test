import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Report } from "./report.model";

@Injectable({
    providedIn: "root",
})

export class ReportService {
    baseUrl = " http://localhost:3001/reports";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }


    create(report: Report): Observable<Report> {
        return this.http.post<Report>(this.baseUrl, report).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    read(): Observable<Report[]> {
        return this.http.get<Report[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    readById(id: string): Observable<Report> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Report>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    update(report: Report): Observable<Report> {
        const url = `${this.baseUrl}/${report.id}`;
        return this.http.put<Report>(url, report).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    delete(id: number): Observable<Report> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Report>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
