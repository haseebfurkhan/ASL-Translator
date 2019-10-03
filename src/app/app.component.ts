import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('translation') container;

  title = 'ASL-Translator';
  input = '';
  index = 0;
  classFade = '';
  char = '';
  interval;
  showAnimation = 'hidden';

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particlesconfig.json', null);
  }


  animate() {
    clearInterval(this.interval);
    this.index = 0;
    this.showAnimation = 'animated fadeIn delay-1s show';
    this.interval = setInterval(() => {
      if (this.input[this.index] == null || this.input[this.index].trim() === '') {
        this.char = '.';
      } else {
        this.char = this.input[this.index];
      }

      if (this.index >= this.input.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }, 1000);
  }

  save() {
    domtoimage.toPng(this.container.nativeElement)
      .then(function (blob) {
        saveAs(blob, 'my-node.png');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      })
  }
}
