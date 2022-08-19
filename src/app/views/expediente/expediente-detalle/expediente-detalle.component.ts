import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { PersonaService } from 'src/app/services/persona.service';
import swal from 'sweetalert2';

@Component({
  selector: 'expediente-detalle',
  templateUrl: './expediente-detalle.component.html',
  styleUrls: ['./expediente-detalle.component.css']
})
export class ExpedienteDetalleComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private personaService: PersonaService,
    private expedienteService: ExpedienteService
  ) { }

  seleccionado: string;
  expediente: any = {};
  public listaArea: [];
  public listaMotivo: [];
  public listaProcedencia: [];
  public listaDepartamento: [];
  public listaProvincia: [];
  public listaDistrito: [];
  public listaTipoParte: [];
  public datosLista: Object = { text: 'descripcion', value: 'id' };

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public date: number = new Date().getDate();
  // public minValue: Date = new Date(this.fullYear, this.month, this.date, 7, 0, 0);

  ngOnInit(): void {
    this.seleccionado = 'D';
    this.expedienteService.inicializar({idExpediente: this.dataInput.idExpediente, idArea: this.dataInput.idArea}).then(res => {
      this.listaArea = res.data.listaArea;
      if(this.dataInput.opcion=="MODIFICAR"){
        this.expediente = res.data.expediente;
        this.expediente.partesProcesales = res.data.partesProcesales;
      }else{
        this.expediente  = this.expedienteInicializado;
        this.expediente.idExpediente = 0;
        this.expediente.idArea = this.dataInput.idArea;
        this.expediente.nroExpediente = "EXP-01";
        let fechaActual = new Date(this.fullYear, this.month, this.date, 7, 0, 0);
        this.expediente.fechaInicio = fechaActual
        this.expediente.fecha = fechaActual
        this.expediente.fechaCreacion = fechaActual
        this.expediente.partesProcesales = [{nombreCompleto: '', nroDocumento: '', codTipoParte: '', nuevaLista: false}];
      }
      this.expediente.usuario = localStorage.getItem("USUARIO_SESSION");
    });
  }

  onClickAgregarParteProcesal(){
    this.expediente.partesProcesales.push({nombreCompleto: '', nroDocumento: '', codTipoParte: '', nuevaLista: true});
  }

  onClickBuscar(){
    this.personaService.buscarPorDocumento({nroDocumento: this.expediente.nroDocumento}).then(res => {
      if(res.data.persona){
        var persona = res.data.persona;
        this.expediente.nombre = persona.nombre;
        this.expediente.apellido = persona.apellido;
        this.expediente.idPersona = persona.idPersona;
        this.expediente.idUsuario = persona.idUsuario;
      }else{
        swal.fire({position: 'top-end',icon: 'error',title: 'No se encontró persona.',showConfirmButton: false,toast: true,timer: 5000});
      }
    });
  }

  onClickAceptar(){
    this.expediente.nroExpediente = this.expediente.correlativo +"-"+ this.expediente.anio +"-"+ this.expediente.extension;
    if(this.dataInput.opcion=="AGREGAR"){
      this.expedienteService.agregar(this.expediente).then(res => {
        if(res.status==1){
          swal.fire({position: 'top-end',icon: 'success',title: 'Expediente creado exitosamente.',showConfirmButton: false,toast: true,timer: 4000});
          this.close.emit(true);
        }else{
          swal.fire({position: 'top-end',icon: 'error',title: 'No se pudo guardar los datos del expediente.',showConfirmButton: false,toast: true,timer: 5000});
        }
      });
    }else{
      // this.expedienteService.modificar(this.expediente).then(res => {
      //   swal.fire({position: 'top-end',icon: 'success',title: 'Se modificó el perfil del usuario.',showConfirmButton: false,toast: true,timer: 5000});
      //   this.close.emit(true);
      // });
    }
  }

  onClickCancelar(){
    this.close.emit(true);
  }

  mostrarTab(args: string){
    switch(args){
      case "D": this.seleccionado = 'D'; break;
      case "O": this.seleccionado = 'O'; break;
    }
  }

  expedienteInicializado: any = {
    correlativo: '',
    anio: '',
    extension: '',
    nroExpediente: '',
    referencia: '',
    fechaInicio: '',
    delitoPrincipal: '',
    codProcedencia: '',
    codMotivo: '',
    proceso: '',
    organoJurisdiccional: '',
    sumilla: '',
    ubicacion: '',
    parteProcesal: '',
    codigo: '',
    expedienteOrigen: '',
    juezPonente: '',
    especialistaLegal: '',
    abogadoResponsable: '',
    fiscalia: '',
    fiscal: '',
    comisaria: '',
    nroCarpeta: '',
    nroDenuncia: '',
    ubicacionFisica: '',
    codDepartamento: '',
    codProvincia: '',
    codDistrito: '',
    anexoCaserio: '',
    fecha: '',
    usuario: '',
    fechaCreacion: '',
    idUsuario: ''
  };
}
