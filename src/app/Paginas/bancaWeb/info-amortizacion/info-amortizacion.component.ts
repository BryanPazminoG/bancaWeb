import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmortizacionService } from 'src/app/Servicios/amortizacion.service';
import { CreditoService } from 'src/app/Servicios/credito.service';
import { FlujoDatosService } from 'src/app/Servicios/flujo-datos.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-info-amortizacion',
  templateUrl: './info-amortizacion.component.html',
  styleUrls: ['./info-amortizacion.component.css']
})
export class InfoAmortizacionComponent implements OnInit {
  TablaAmortizacion = [{
    'codCuota': 0,
    'fechaPlanificadaPago': '',
    'capital': 0,
    'interes': 0,
    'montoCuota': 0,
    'capitalRestante': 0
  }];

  @ViewChild('contenedor', { static: false }) tablaAmortizacion!: ElementRef; // Hace una referencia de una parte del html para el uso en la lógica

  constructor(private router: Router, private creditoService: CreditoService, private flujoDatosService: FlujoDatosService) { }

  ngOnInit(): void {
    this.cargarTablaAmortizacion(this.flujoDatosService.getIdCredito());
  }

  cargarTablaAmortizacion(idCredito: number) {
    this.creditoService.getATablaAmortizacionAPI(idCredito).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.TablaAmortizacion = data;
        }
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  formatoFecha(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const day = fecha.getDate().toString().padStart(2, '0');

    const fechaFormateado = `${year}-${month}-${day}`;

    return fechaFormateado;
  }
  async imprimirTabla() { // Función para imprimir contenido HTML
    const cardContainer = this.tablaAmortizacion.nativeElement; // Toma el contenido HTML 
    const pageWidth = 210;
    const pageHeight = 297;
    // Espacios de margen para el documento PDF
    const margin = 15;
    const topMargin = 10;
    // Dimenseiones para el documento PDF
    const maxWidth = (pageWidth - 2 * margin);
    const maxHeight = (pageHeight - topMargin - margin);
    // Dimenseiones de la Imagen
    let imgWidth = cardContainer.offsetWidth;
    let imgHeight = maxHeight * 3.80;
    // Numero de imagenes de la factura
    const numImg = Math.ceil(cardContainer.offsetHeight / imgHeight);
    //Auxiliar: posicion eje Y de cada img con respecto al html 
    let pageY = 0;
    const pdf = new jsPDF('p', 'mm', 'a4'); // Configuraciones del documento PDF

    for (let index = 0; index < numImg; index++) {
      await html2canvas(cardContainer, {
        x: 0,
        y: pageY,
        width: imgWidth,
        height: imgHeight
      }).then( // Toma el contenido y lo convierte en una imagen
        (canvas) => {
          const imgData = canvas.toDataURL('image/png'); // Guarda el contenido tomado en la variable imgData
          // Calcula el ancho y alto de la imagen ajustada   
          let imgHeightAjustado = 0;
          let imgWidthAjustado = 0;
          if (imgWidth > maxWidth) {
            imgHeightAjustado = (imgHeight * maxWidth) / imgWidth;
            imgWidthAjustado = maxWidth;
          }

          if (imgHeight > maxHeight) {
            imgWidthAjustado = (imgWidth * maxHeight) / imgHeight;
            imgHeightAjustado = maxHeight;
          }
          const imageX = margin + (maxWidth - imgWidthAjustado) / 2;
          const imageY = topMargin + (maxHeight - imgHeightAjustado) / 2;

          if (index > 0) pdf.addPage();
          pdf.addImage(imgData, 'SVG', 0, 0, imgWidthAjustado - 25, imgHeightAjustado);
          pageY += imgHeight;
        }
      );
    }
    pdf.save('tabla-amortizacion.pdf');
  }

  btnImprimir() {
    this.imprimirTabla();
    Swal.fire({
      icon: "success",
      title: "Listo",
      text: "Impresion Lista",
      showConfirmButton: false,
      timer: 2500
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(["info-credito"]);
      }
    });
  }

  regresar() {
    this.router.navigate(["info-credito"]);
  }
}
