import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
          <div id="menu" class="bg-gray-900 min-h-full z-10 text-slate-300 w-64  left-0 h-max overflow-y-scroll">
            <div id="logo" class="my-4 px-6">
              <h1 class="text-lg md:text-2xl font-bold text-white">Prueba<span class="text-blue-500">2024</span></h1>
              <p class="text-slate-500 text-sm">Colombia</p>
            </div>
            <div id="profile" class="px-6 py-10">
              <p class="text-slate-500">Bienvenido</p>

            </div>
            <div id="nav" class="w-full px-6">

              <p class="text-slate-500">Modelos</p>
              @for(item of menuItems; track $index) {
              <a [routerLink]="item.path" routerLinkActive="bg-blue-800"
                class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">

                <div class="flex flex-col">
                  <span class="text-lg font-bold leading-5 text-white">{{item.title}}</span>
                  <span class="text-sm  text-white/50 md:block">{{item.data?.['subtitle']}}</span>
                </div>
              </a>
              }

            </div>
          </div>
  `,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuComponent {

  menuItems = routes
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route?.path)
    .filter(route => !route.path?.includes(':'))

}
