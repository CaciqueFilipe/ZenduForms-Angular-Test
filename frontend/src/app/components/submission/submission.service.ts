import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Submission } from "./submission.model";

@Injectable({
    providedIn: "root",
})

export class SubmissionService {
    baseUrl = " http://localhost:3001/submissions";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }

    create(submission: Submission): Observable<Submission> {
        return this.http.post<Submission>(this.baseUrl, submission).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    read(): Observable<Submission[]> {
        return this.http.get<Submission[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    readById(id: string): Observable<Submission> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Submission>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    update(submission: Submission): Observable<Submission> {
        const url = `${this.baseUrl}/${submission.id}`;
        return this.http.put<Submission>(url, submission).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    delete(id: number): Observable<Submission> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Submission>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
