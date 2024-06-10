import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../entities/Admin.Entity';
import { Observable } from 'rxjs';
import { Client } from '../entities/Client.Entity';
import { Tuteur } from '../entities/Tuteur.Entity';
import { Cours } from '../entities/Cours.Entity';
import { Domaine } from '../entities/Domaine.Entity';
import { Specialite } from '../entities/Specialite.Entity';
import { Contact } from '../entities/Contact.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Categorie } from '../entities/Categorie.Entity';
import { SaveCours } from '../entities/SaveCour.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiUrl = "http://localhost:8081/api"
  loginUserUrl ="http://localhost:8081/api/admin/login"
  helper=new JwtHelperService()

  constructor( private http:HttpClient) { }
  addAdmin(admin:Admin)
   {
    return this.http.post<any>(this.apiUrl+"/admin",admin);
   }

   onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` 
    return this.http.delete(url )
  }
  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl + "/admin");
  }

  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }

  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl + "/client");
  }
  getTuteur(): Observable<Tuteur[]>{
    return this.http.get<Tuteur[]>(this.apiUrl + "/tuteur");
  }

  onDeleteCours(id : number){
    const url =`${this.apiUrl+"/cours"}/${id}` 
    return this.http.delete(url )
  }
  getCours(): Observable<SaveCours[]>{
    return this.http.get<SaveCours[]>(this.apiUrl + "/cours");
  }

  onDeleteDomaine(id: number): Observable<any> {
    const url = `${this.apiUrl + "/domaine"}/${id}`;
    return this.http.delete(url);
  }

  getDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(this.apiUrl + "/domaine");
  }

 
  onDeleteSpecialite(id: number): Observable<any> {
    const url = `${this.apiUrl + "/specialite"}/${id}`;
    return this.http.delete(url);
  }
  onDeleteCategorie(id: number): Observable<any> {
    const url = `${this.apiUrl + "/categorie"}/${id}`;
    return this.http.delete(url);
  }

  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.apiUrl + "/specialite");
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl + "/categorie");
  }

  addDomaine(domaine: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/domaine`, domaine);
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categorie`, categorie);
  }

  
  addSpecialite(specialite: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/specialite`, specialite);
  }

  onDeleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl + "/message"}/${id}`; 
    return this.http.delete(url);
  }

 
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + "/message"); 
  }

  updateAdmin(id:number,admin: Admin) {
    const url =`${this.apiUrl+"/admin"}/${id}` 
    return this.http.put<any>(url, admin);
  }


 

  findAdminById(id : number): Observable<Admin> {
    const url =`${this.apiUrl + "/admin"}/${id} ; `
    return this.http.get<Admin>(url)
  }


  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }

   updateTuteur(tuteur : Tuteur,id: number) : Observable<Tuteur>{
    const url =` ${this.apiUrl+"/tuteur"}/${id}`
    return this.http.put<Tuteur>(url,tuteur)
  }
  
  findCategorieById(id : number): Observable<Categorie> {
    const url =`${this.apiUrl + "/categorie"}/${id} ; `
    return this.http.get<Categorie>(url)
  }
  findDomaineById(id : number): Observable<Domaine> {
    const url =`${this.apiUrl + "/domaine"}/${id} ; `
    return this.http.get<Domaine>(url)
  }
  findSpecialiteById(id : number): Observable<Specialite> {
    const url =`${this.apiUrl + "/specialite"}/${id} ; `
    return this.http.get<Specialite>(url)
  }
  updateCategorie(id:number,categorie: Categorie) {
    const url =`${this.apiUrl+"/categorie"}/${id}` 
    return this.http.put<any>(url, categorie);
  }
  updateDomaine(id:number,domaine: Domaine) {
    const url =`${this.apiUrl+"/domaine"}/${id}` 
    return this.http.put<any>(url, domaine);
  }
  updateSpecilite(id:number,specialite: Specialite) {
    const url =`${this.apiUrl+"/specialite"}/${id}` 
    return this.http.put<any>(url, specialite);
  }

}
