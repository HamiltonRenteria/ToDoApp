import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://localhost:7237/api/Todo';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<Todo[]>('getTodos', []))
            );
    }

    getTodoById(id: number): Observable<Todo> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Todo>(url)
            .pipe(
                catchError(this.handleError<Todo>(`getTodoById id=${id}`))
            );
    }

    createTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo, this.httpOptions)
            .pipe(
                catchError(this.handleError<Todo>('createTodo'))
            );
    }

    updateTodo(id: number, todo: Todo): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, todo, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('updateTodo'))
            );
    }

    deleteTodo(id: number): Observable<Todo> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<Todo>(url, this.httpOptions)
            .pipe(
                catchError(this.handleError<Todo>('deleteTodo'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return new Observable<T>((observer) => {
                observer.next(result as T);
                observer.complete();
            });
        };
    }
}