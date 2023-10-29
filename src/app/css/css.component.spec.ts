import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from '../accordion/accordion.component';
import { AddNewComponent } from '../add-new/add-new.component';
import { DbService } from '../service/db.service';

import { CssComponent } from './css.component';

describe('CssComponent', () => {
  let component: CssComponent;
  let fixture: ComponentFixture<CssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssComponent ,
      AddNewComponent, AccordionComponent],
      imports:[HttpClientTestingModule,ReactiveFormsModule,NgbModule],
      providers:[DbService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
