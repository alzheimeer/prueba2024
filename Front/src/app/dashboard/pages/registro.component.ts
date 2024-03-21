import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventarioService } from '../services/inventario.service';
import { Producto } from '../../shared/interfaces/inventario.interfaces';

@Component({
  selector: 'app-registro-entrega-inventario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Registro de Inventario</h2>
        <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="nombre_usuario" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input type="text" id="nombre_usuario" formControlName="nombre_usuario" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
          </div>
          <div class="mb-4">
            <label for="producto" class="block text-sm font-medium text-gray-700">Producto</label>
            <select id="producto" formControlName="producto" (change)="onProductoSeleccionado()" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
              <option value="">Seleccione un producto</option>
              <option *ngFor="let producto of productos" [value]="producto.id">{{ producto.nombre }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="numero_serie" class="block text-sm font-medium text-gray-700">Número de Serie</label>
            <input type="text" id="numero_serie" formControlName="numero_serie" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
          </div>
          <div class="mb-6">
            <label for="fecha_ingreso" class="block text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" id="fecha_ingreso" formControlName="fecha_ingreso" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
          </div>
          <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2" [ngClass]="{'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white': !registroForm.invalid && !enviando, 'bg-gray-400 cursor-not-allowed text-gray-700': registroForm.invalid || enviando}" [disabled]="registroForm.invalid || enviando">
            {{ enviando ? 'Enviando...' : 'Guardar y Enviar' }}
          </button>
        </form>
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
export class RegistroDeInventarioComponent implements OnInit {
  productos: Producto[] = [];
  registroForm: FormGroup;
  enviando = false;

  constructor(
    private inventarioService: InventarioService, 
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.registroForm = this.formBuilder.group({
      nombre_usuario: ['', Validators.required],
      nombre_producto: [''],
      producto: ['', Validators.required],
      numero_serie: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
    });
    this.registroForm.setErrors({ invalid: true });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.inventarioService.obtenerProductos().subscribe(
      (productos) => {
        this.productos = productos;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.enviando = true;
      const inventario = this.registroForm.value;
      this.inventarioService.agregarInventario(inventario).subscribe(
        (response) => {
          alert(response.mensaje);
          this.registroForm.reset();
        },
        (error) => {
          alert('Ha ocurrido un error al agregar el inventario. Por favor, inténtalo nuevamente.');
          console.error('Error al agregar el inventario:', error);
        },
        () => {
          this.enviando = false;
        }
      );
    }
  }

  onProductoSeleccionado() {
    const productoId = this.registroForm.get('producto')?.value;
    const productoSeleccionado = this.productos.find(p => p.id === Number(productoId));
    this.registroForm.patchValue({
      nombre_producto: productoSeleccionado?.nombre || ''
    });
  }
}