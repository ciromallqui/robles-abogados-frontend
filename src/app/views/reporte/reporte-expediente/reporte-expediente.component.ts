import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import jsPdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'reporte-expediente',
  templateUrl: './reporte-expediente.component.html',
  styleUrls: ['./reporte-expediente.component.css']
})
export class ReporteExpedienteComponent implements OnInit {

  @Input() dataInput: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor( private reporteService: ReporteService ) { }

  public pageSettings: PageSettingsModel;
  public customAttributes: Object;
  columnsToDisplay = [];
  dataSource = [];
  actoProcesal = [];
  expediente: any = {};
  progressDownload: boolean;

  ngOnInit(): void {
    this.inicializarGrilla();
    this.reporteService.expediente(this.dataInput).then(res =>{
      this.expediente = res.data.expediente;
      this.dataSource = res.data.parteProcesal;
      this.actoProcesal = res.data.documento;
    });
  }

  inicializarGrilla() {
    this.columnsToDisplay = [
      { nombre: "nroDocumento", titulo: "N° DOCUMENTO", textAlign: 'Center', visible: true, tipo: "string", width: 200 },
      { nombre: "nombreCompleto", titulo: "PARTE PROCESAL", visible: true, tipo: "string", width: '' },
      { nombre: "tipoParte", titulo: "TIPO PARTE", visible: true, tipo: "string", width: '' },
    ];
  }

  onClickDescargarReporte(){
    this.progressDownload = true;
    const DATA = document.getElementById('htmlData');
    const doc = new jsPdf('p', 'pt', 'a4',false);
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      this.progressDownload = false;
    });
  }

  onClickSalir(){
    this.close.emit(true);
  }
}
