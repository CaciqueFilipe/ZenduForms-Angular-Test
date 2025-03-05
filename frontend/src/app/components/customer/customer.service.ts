import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Customer } from "./customer.model";

@Injectable({
    providedIn: "root",
})

export class CustomerService {
    baseUrl = " http://localhost:3001/customers";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }


    create(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.baseUrl, customer).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    read(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    readById(id: string): Observable<Customer> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Customer>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    update(customer: Customer): Observable<Customer> {
        const url = `${this.baseUrl}/${customer.id}`;
        return this.http.put<Customer>(url, customer).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }


    delete(id: number): Observable<Customer> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Customer>(url).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandle(e))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.showMessage("Error!", true);
        return EMPTY;
    }
}
