import { Form } from "./form.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})

export class FormService {
    baseUrl = " http://localhost:3001/forms";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }


    create(form: Form): Observable<Form> {
        return this.http.post<Form>(this.baseUrl, form).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    read(): Observable<Form[]> {
        return this.http.get<Form[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    readById(id: string): Observable<Form> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Form>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    update(form: Form): Observable<Form> {
        const url = `${this.baseUrl}/${form.id}`;
        return this.http.put<Form>(url, form).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    delete(id: number): Observable<Form> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Form>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
