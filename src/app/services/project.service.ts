import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";

@Injectable()
export class ProjectService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    testService() {
        return "PRobando el servicio de angular"
    }

    /*Guardar proyectos en la base de datos*/
    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-project', params, { headers: headers }); //Es la url del componente global
    }

    getProjects(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url + 'projects', { headers: headers });
    }

    getProject(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'project/' + id, {headers: headers});
    }

    /*Borrar proyectos en la base de datos*/
    deleteProject(id: any): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'project/' + id, {headers: headers});
    }

    /*Editar información de proyectos */
    updateProject(project:Project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'project/'+project._id, params, {headers: headers})
    }
}