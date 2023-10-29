import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JavascriptComponent } from './javascript.component';
import { DbService } from '../service/db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from '../add-new/add-new.component';
import { AccordionComponent } from '../accordion/accordion.component';

describe('JavascriptComponent', () => {
  let component: JavascriptComponent;
  let fixture: ComponentFixture<JavascriptComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ JavascriptComponent,AddNewComponent, AccordionComponent ],
      imports: [HttpClientTestingModule,ReactiveFormsModule, NgbModule],
    providers:[DbService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
