import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Banqueteros } from './banqueteros';

describe('Banqueteros', () => {
  let component: Banqueteros;
  let fixture: ComponentFixture<Banqueteros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banqueteros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Banqueteros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
