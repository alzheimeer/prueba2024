import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario, Producto } from '../../shared/interfaces/inventario.interfaces';



@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

  agregarInventario(inventario: Omit<Inventario, 'id'>): Observable<{ mensaje: string, id_inventario: string }> {
    return this.http.post<{ mensaje: string, id_inventario: string }>(`${this.apiUrl}/inventario`, inventario);
  }

  obtenerInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${this.apiUrl}/inventario`);
  }

  actualizarEstadoEntrega(id: string, entregado: boolean): Observable<any> {
    const url = `${this.apiUrl}/inventario`;
    const body = {
      "id_inventario": id,
      "entregado": entregado
    }
    console.log('body: ',body);
    return this.http.put(url, body);
  }
}