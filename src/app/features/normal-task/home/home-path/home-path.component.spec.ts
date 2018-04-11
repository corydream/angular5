/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePathComponent } from './home-path.component';

describe('HomePathComponent', () => {
  let component: HomePathComponent;
  let fixture: ComponentFixture<HomePathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
