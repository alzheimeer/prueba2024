import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidemenuComponent,
    RouterModule
  ],
  template:
    `

 <div class="flex bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
   <div class="flex relative w-screen h-screen">
      <button type="button"  (click)="toggleMenu()" class="relative  bg-gray-900 p-2 text-gray-400 lg:hidden vertical-text">MENU
        <span class="absolute -inset-0.5"></span>
        <span class="sr-only">Open menu</span>
      </button>

      @if (menu) {
        <app-sidemenu class="min-h-screen" />
      }@else {
        <div hidden="hidden">
            <app-sidemenu />
        </div>
      }



     <div class="text-black px-2 mt-2 w-full">
       <router-outlet />
     </div>
   </div>
 </div>
  `,
  styles: `
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  .min-h-screen {
    min-height: 100vh;
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  menu = true;
  menusm = true;
  menumd = true;
  menulg = true;
  menuxl = true;
  menu2xl = true;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.setMenu(window.innerWidth);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setMenu(event?.target?.innerWidth);
  }

  setMenu(width: number) {
    this.menusm = width > 0 && width < 768;
    this.menumd = width > 768 && width < 1024;
    this.menulg = width > 1024 && width < 1280;
    this.menuxl = width > 1280 && width < 1536;
    this.menu2xl = width >= 1536;
    this.menu = !(this.menumd || this.menusm);
  }

  toggleMenu() {
    this.menu = !this.menu;
  }

}
