import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../../shared/interfaces/inventario.interfaces';

@Component({
  selector: 'app-entrega-inventario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">Entrega de Inventario</h2>
        <div class="space-y-4">
          <div *ngFor="let item of inventario" class="flex flex-col items-center">
            <div class="text-lg font-semibold text-gray-900">{{ item.nombre_producto }}</div>
            <div class="text-sm text-gray-500">{{ item.numero_serie }}</div>
            <button
              class="mt-2 py-2 px-4 w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              [ngClass]="{'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': !item.entregado, 'bg-green-600 focus:ring-green-500 cursor-not-allowed': item.entregado}"
              [disabled]="item.entregado"
              (click)="actualizarEstadoEntrega(item)">
              {{ item.entregado ? 'Entregado' : 'Entregar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntregaInventarioComponent implements OnInit {
  inventario: Inventario[] = [];

  constructor(
    private inventarioService: InventarioService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.obtenerInventario();
  }

  obtenerInventario() {
    this.inventarioService.obtenerInventario().subscribe(
      (inventario) => {
        this.inventario = inventario;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al obtener el inventario:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error details:', error.error);
      }
    );
  }

  actualizarEstadoEntrega(item: any) {
    this.inventarioService.actualizarEstadoEntrega(item._id.$oid, true).subscribe(
      () => {
        item.entregado = true;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al actualizar el estado de entrega:', error);
      }
    );
  }
}