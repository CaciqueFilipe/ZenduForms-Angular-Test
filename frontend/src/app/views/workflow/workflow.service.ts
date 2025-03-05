import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Workflow } from "./workflow.model";

@Injectable({
    providedIn: "root",
})

export class WorkflowService {
    baseUrl = " http://localhost:3001/workflows";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }


    create(workflow: Workflow): Observable<Workflow> {
        return this.http.post<Workflow>(this.baseUrl, workflow).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    read(): Observable<Workflow[]> {
        return this.http.get<Workflow[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    readById(id: string): Observable<Workflow> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Workflow>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    update(workflow: Workflow): Observable<Workflow> {
        const url = `${this.baseUrl}/${workflow.id}`;
        return this.http.put<Workflow>(url, workflow).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    delete(id: number): Observable<Workflow> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Workflow>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
