import { Component } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rel-mensal',
  templateUrl: './rel-mensal.component.html',
  styleUrls: ['./rel-mensal.component.css']
})
export class RelMensalComponent {

  pdfSrc: SafeResourceUrl = '';
  data: Date = new Date();
  mes: string = '';
  ano: string ='';
  

  constructor(private relatorioService: RelatorioService,
    private sanitizer: DomSanitizer) 
  { }

  relatorioMensal() {
    this.pdfSrc = '';
    this.relatorioService.downloadPdfRelatorio(this.mes,this.ano).subscribe(data => {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    }); 
  }

}
