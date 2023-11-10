import {Component, inject} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import { NgModel } from '@angular/forms';
import {DataService} from "../../core/services/data.service";
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonToggleModule,
        MatCardModule,
        MatSelectModule,
    ],
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      await this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }


    selectedCurrencySoles: boolean = true; // Inicialmente establecido en Soles
    selectedCurrencyDollars: boolean = false;
    selectedCurrencySymbol: string = 'S/.';
    onCurrencyChange(currency: string) {
        if (currency === 'Soles') {
            this.selectedCurrencySoles = true;
            this.selectedCurrencyDollars = false;
            this.selectedCurrencySymbol = 'S/.';
        } else if (currency === 'Dólares') {
            this.selectedCurrencySoles = false;
            this.selectedCurrencyDollars = true;
            this.selectedCurrencySymbol = '$';
        }
    }


    selectedCurrencyFisico: boolean = false;
    selectedCurrencyVirtual: boolean = false;

    asdasd(currency: string) {
        if (currency === 'Físico') {
            this.selectedCurrencyFisico = !this.selectedCurrencyFisico;
            if (this.selectedCurrencyFisico) {
                this.selectedCurrencyVirtual = false;
            }
        } else if (currency === 'Virtual') {
            this.selectedCurrencyVirtual = !this.selectedCurrencyVirtual;
            if (this.selectedCurrencyVirtual) {
                this.selectedCurrencyFisico = false;
            }
        }
    }

    /*
        showResults: boolean = false;

        generateResults() {
            // Realiza tus cálculos y asigna los resultados a las propiedades adecuadas
            this.showResults = true;

        }*/
    async navigateToResults() {
        // Calcula el resultado
        this.calculateResult();

        // Navega a la página de resultados y pasa el resultado como parámetro
        await this._router.navigate(['/results']);
    }

    // ---------------------------CALCULOS---------------------------------------
    // ---------------------------CALCULOS---------------------------------------


    //----- Variables iniciales introducidos por el usuario------------
    //----la mayoria de los datos son sacados del BBVA
    precioVenta!: number;  // de 300 a 999 999 999.99
    porcentajecuotaInicial!: number;// de 0 a 90%
    meses!:number;  // entre 1 a 72 meses
    tipoTasa!:string; // TNA o TEA
    tasa!: number; // de 2.9% a 24.99%
    frecuenciaPago!: string; // mensual, quincenal, semestral ... tengo dudas aqui
    capitalizacion!: string; // diario, mensual, semestral, quincenal o semestral ... tengo dudas aqui
   seguroDesgravamen!: 0.39;

    //--------- Variables que se calculan-------------

    cuotaInicial!: number;
    monto!: number;
    cuotasEnAño!: number;
    totalcuotas!:number;
    TNA!: number;
    TEA!: number;
    TEP!: number;
    saldo!: number;
    planPagos: Array<any> = [];
    Ncuota!: number;
    saldoInicial!: number;
    intereses!:number;
    cuota!:number;
    amortizacion!: number;
    saldoFinal!: number;


    result!: number;
    constructor(private dataService: DataService) {}
    calculateResult(): void {
       

        this.cuotaInicial=this.precioVenta*(this.porcentajecuotaInicial/100);
        this.monto=this.precioVenta-this.cuotaInicial;
        
        switch (this.frecuenciaPago) {
            case 'mensual':
              this.cuotasEnAño = 12;
              break;
            case 'quincenal':
              this.cuotasEnAño = 24;
              break;
            case 'semestral':
              this.cuotasEnAño = 2;
              break;
        };

        this.totalcuotas = Math.floor(this.meses * this.cuotasEnAño);

        if (this.tipoTasa === 'TEA') {
          // Calcular TEP (Tasa Efectiva del Periodo) basada en la frecuencia de pago
          switch (this.frecuenciaPago) {
            case 'mensual':
              this.TEP = Math.pow(1 + this.tasa / 100, 1 / 12) - 1;
              break;
            case 'quincenal':
              this.TEP = Math.pow(1 + this.tasa / 100, 1 / 24) - 1;
              break;
            case 'semestral':
              this.TEP = Math.pow(1 + this.tasa / 100, 1 / 2) - 1;
              break;
          }
        
          this.TEA = this.tasa / 100;
        } else if (this.tipoTasa === 'TNA') {
          // Calcular TEA (Tasa Efectiva Anual) a partir de la TNA y el número de períodos de capitalización
          this.TEA = Math.pow(1 + this.tasa / 100, 12 / this.cuotasEnAño) - 1;
        
          // Calcular TEP (Tasa Efectiva del Periodo) basada en la frecuencia de pago
          switch (this.frecuenciaPago) {
            case 'mensual':
              this.TEP = Math.pow(1 + this.TEA, 1 / 12) - 1;
              break;
            case 'quincenal':
              this.TEP = Math.pow(1 + this.TEA, 1 / 24) - 1;
              break;
            case 'semestral':
              this.TEP = Math.pow(1 + this.TEA, 1 / 2) - 1;
              break;
          }
        }

        for(let i=1; i<=this.totalcuotas; i++) {
          const interes = this.saldo * this.TEP;
          const cuota = this.monto * (this.TEP * Math.pow(1 + this.TEP, this.totalcuotas - i + 1)) / (Math.pow(1 + this.TEP, this.totalcuotas - i + 1) - 1);
          const amortizacion = cuota - interes;
          this.saldo -= amortizacion;
    
          this.planPagos.push({ //aqui esta el plan de pagos aun me falta ponerle en plazo de gracia y otros detalles mas
            Ncuota: i,
            saldoInicial: this.saldo + amortizacion, 
            interes: interes,
            cuota: cuota,
            amortizacion: amortizacion,
            saldoFinal: this.saldo
          });

       

        this.result = this.precioVenta * this.porcentajecuotaInicial;

        // Guarda el resultado en una propiedad
        this.dataService.setResult(this.result);
    }

    // ---------------------------CALCULOS---------------------------------------
    // ---------------------------CALCULOS---------------------------------------
}
}