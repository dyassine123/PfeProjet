import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../entities/Contact.Entity';
import { Observable } from 'rxjs';
import { Client } from '../entities/Client.Entity';
import { Tuteur } from '../entities/Tuteur.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SaveCours } from '../entities/SaveCour.Entity';
import { Categorie } from '../entities/Categorie.Entity';
import { Domaine } from '../entities/Domaine.Entity';
import { Cours } from '../entities/Cours.Entity';
import { Specialite } from '../entities/Specialite.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiUrl = "http://localhost:8081/api"
  loginUserUrl ="http://localhost:8081/api/client/login"
  loginUserUrl1 ="http://localhost:8081/api/tuteur/login"
  resetMdpClt="http://localhost:8081/api/client/forgotmdp"
  helper=new JwtHelperService()

  constructor(private http: HttpClient) { }

  addContact(contact: Contact): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/message`, contact);
  }

  addClient(saveClient: SaveCours): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/client`, saveClient);
  }
  addCour(saveCour: SaveCours): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cours`, saveCour);
  }

  addTuteur(tuteur: Tuteur): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tuteur`, tuteur);
  }

  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  loginClient(client:Client){
    return this.http.post<any>(this.loginUserUrl, client);
  }

  loginTuteur(tuteur:Tuteur){
    return this.http.post<any>(this.loginUserUrl1, tuteur);
  }

  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);

    let id = decodeToken.data.id;
    
     return decodeToken.data;
   }

   

  findClientById(id : number): Observable<Client> {
    const url =`${this.apiUrl + "/client"}/${id} ; `
    return this.http.get<Client>(url)
  }

  findTuteurById(id : number): Observable<Tuteur> {
    const url =`${this.apiUrl + "/tuteur"}/${id} ; `
    return this.http.get<Tuteur>(url)
  }
  

  updateClient(id: number, client: Client) {
    const url = `http://localhost:8081/api/client/updateDetails/${id}`;
    return this.http.put<any>(url, client);
  }
  updateTuteur(id: number, tuteur: Tuteur) {
    const url = `http://localhost:8081/api/tuteur/updateDetails/${id}`;
    return this.http.put<any>(url, tuteur);
  }

 
  

  updatePassword(id: number, client: Client) {
    const url = `http://localhost:8081/api/client/updatePassword/${id}`;
    return this.http.put<any>(url, client);
  }
  getcategorie(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiUrl +"/categorie");
  }
  getUserInfo() {
    var token = localStorage.getItem("myToken");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    var decoded: any
    return decodedToken?.data
  }

  getDomaine(): Observable<Domaine[]>{
    return this.http.get<Domaine[]>(this.apiUrl +"/domaine");
  }

  getCours(): Observable<SaveCours[]>{
    return this.http.get<SaveCours[]>(this.apiUrl + "/cours");
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl + "/categorie");
  }

  getTuteur(): Observable<Tuteur[]>{
    return this.http.get<Tuteur[]>(this.apiUrl + "/tuteur");
  }


  findCoursById(id : number): Observable<Cours> {
    const url =`${this.apiUrl + "/cours"}/${id} ; `
    return this.http.get<Cours>(url)
  }


  checkOldPassword(id: number, oldPassword: string): Observable<boolean> {
    const url = `http://localhost:8081/api/client/checkOldPassword/${id}`;
    return this.http.post<boolean>(url, { oldPassword });
  }

  checkOldPasswordTuteur(id: number, oldPassword: string): Observable<boolean> {
    const url = `http://localhost:8081/api/tuteur/checkOldPassword/${id}`;
    return this.http.post<boolean>(url, { oldPassword });
  }

  updatePasswordTuteur(id: number, tuteur: Tuteur) {
    const url = `http://localhost:8081/api/tuteur/updatePassword/${id}`;
    return this.http.put<any>(url, tuteur);
  }


  updateCour(id: number, savecours: SaveCours) {
    const url = `${this.apiUrl}/cours/${id}`;
    return this.http.put<any>(url, savecours);
  }
  
  reserverFromApi(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/reservation" ,rq);
 }

 getClientInfo() {
  var token = localStorage.getItem("myToken");
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(token);
  const expirationDate = helper.getTokenExpirationDate(token);
  const isExpired = helper.isTokenExpired(token);
  var decoded: any
  return decodedToken?.data
}

getClientReservations(clientId: number): Observable<Cours[]> {
  const url = `${this.apiUrl}/reservation/get-all-by-id-client/${clientId}`;
  return this.http.get<Cours[]>(url);
}

getSpecialites(): Observable<Specialite[]> {
  return this.http.get<Specialite[]>(this.apiUrl + "/specialite");
}

onDeleteCours(id: number): Observable<any> {
  const url = `${this.apiUrl + "/cours"}/${id}`;
  return this.http.delete(url);
}
annulerReservationFromApi(reservationId: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:8081/api/reservations/${reservationId}`);
}

annulerReservation(clientId: number, courseId: number) {
  const url = `http://localhost:8081/api/reservation/cancel/${clientId}/${courseId}`;
  return this.http.delete(url);
}

checkIfReserved(clientId: number, courseId: number): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8081/api/reservation/check-reservation/${clientId}/${courseId}`);
}

resetMdpClient(client:Client){
  return this.http.post<any>(this.resetMdpClt, client);
  }
}


