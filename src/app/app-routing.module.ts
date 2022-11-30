import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MenuComponent } from './menu/menu.component';
import { MesasComponent } from './mesas/mesas.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ProductosComponent } from './productos/productos.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: 'clientes',component:ClientesComponent},
  {path: 'empleados',component:EmpleadosComponent},
  {path: 'menu',component:MenuComponent},
  {path: 'mesas',component:MesasComponent},
  {path: '',component:OrdenesComponent},
  {path: 'registro',component:RegistroComponent},
  {path: 'userEdit',component:UserEditComponent},
  {path: 'productos',component:ProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
