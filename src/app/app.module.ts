import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MesasComponent } from './mesas/mesas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MenuComponent } from './menu/menu.component';
import { RegistroComponent } from './registro/registro.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { AddEmpleadosComponent } from './add-empleados/add-empleados.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddMesasComponent } from './add-mesas/add-mesas.component';
import { AddOrdenesComponent } from './add-ordenes/add-ordenes.component';
import { AddProductosComponent } from './add-productos/add-productos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablaComponent } from './tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    OrdenesComponent,
    EmpleadosComponent,
    MesasComponent,
    ClientesComponent,
    MenuComponent,
    RegistroComponent,
    UserEditComponent,
    AddClienteComponent,
    AddEmpleadosComponent,
    AddMenuComponent,
    AddMesasComponent,
    AddOrdenesComponent,
    AddProductosComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
