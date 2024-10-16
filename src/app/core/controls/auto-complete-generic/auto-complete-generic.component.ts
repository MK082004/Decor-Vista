import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, exhaustMap, filter, scan, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-auto-complete-generic',
  templateUrl: './auto-complete-generic.component.html',
  styleUrls: ['./auto-complete-generic.component.css']
})
export class AutoCompleteGenericComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  filteredLookups$: Observable<any[]>;
  private nextPage$ = new Subject();

  @Input() form;
  @Input() control;
  @Input() errorMessage;
  @Input() label;
  @Input() name: string[];
  @Input() functionPath: string;
  @Input() servicePath: string;
  @Input() maxlength: number;
  @Input() allowLimit: boolean;
  @Input() placeholder: string;
  @Input() limit: number = 100;
  @Input() inputParams: object;
  @Input() url: string;

  @Output() onSelection = new EventEmitter<object>();

  private async getData(startsWith: string, page: number) {
    let _limit: number;
    if (startsWith) {
      if (this.allowLimit) {
        _limit = page > 0 ? (page - 1) * this.limit : 0;
      } else {
        _limit = this.limit;
      }
      let param = { searchString: startsWith, skip: _limit, take: this.limit };
      Object.assign(param, this.inputParams);
      let data = await this.apiService.postRequest<any>(`${environment.apiUrl}/${this.url}`, param)
      .toPromise()
        .then(response => {
          return response.data || response || [];
        });
      return data;
    }
    return [];
  }

  ngOnInit() {
    const filter$ = this.form.controls[this.control].valueChanges.pipe(
      debounceTime(500),
      filter(q => typeof q === "string")
    );
    this.filteredLookups$ = this.asycSearch(filter$);
  }


  asycSearch(filter$) {
    return filter$.pipe(
      distinctUntilChanged(),
      switchMap((filter: string) => {
        let currentPage = 1;
        if (filter && filter.length > 2) {
          return this.nextPage$.pipe(
            startWith(currentPage),
            exhaustMap(async (_) => this.getData(filter.trim(), currentPage)),
            tap((record) => {
              if (record.length === 0 && currentPage === 1) {
                this.filteredLookups$ = null;
                this.filteredLookups$ = this.asycSearch(filter$);
                this.noRecordError();
                return [];
              }
              currentPage++;
            }),
            takeWhile(p => p.length > 0),
            scan((allRecords, newRecords) => {
              allRecords = allRecords.concat(newRecords)
              return allRecords;
            }, [])
          );
        } else {
          this.filteredLookups$ = null;
          this.filteredLookups$ = this.asycSearch(filter$);
          return [];
        }
      }));
  }

  displayWith(lookup: object) {
    return this.display(lookup, this.name);
  }

  onScroll() {
    if (this.allowLimit) {
      this.nextPage$.next();
    }
  }

  keyup() {
    if (typeof this.form.controls[this.control].value === 'string' && this.form.controls[this.control].value != "") {
      this.form.controls[this.control].setErrors({ incorrect: true });
    }
  }

  optionSelected() {
    const errors = this.form.controls[this.control].errors;
    if (errors && errors.hasOwnProperty('incorrect')) {
      const { incorrect, ...rest } = errors;
      this.form.controls[this.control].setErrors(...rest);
    } else {
      this.onSelection.emit(this.form.controls[this.control]);
    }
  }

  noRecordError() {
    this.form.controls[this.control].setErrors({ noRecordFound: true });
    this.form.controls[this.control].markAllAsTouched();
  }

  display(data: object, params: string[]) {
    if (data) {
      params.forEach(record => {
        if (data[record]) {
          data = data[record];
        }
      });
      return data;
    }
  }

  @Input() set disableControl(disabled: boolean) {
    disabled == true ? this.form.controls[this.control].disable(): this.form.controls[this.control].enable();
  }

  keyPress(event){
    if(event.key === "Enter"){
      event.preventDefault();
    }
  }
}
