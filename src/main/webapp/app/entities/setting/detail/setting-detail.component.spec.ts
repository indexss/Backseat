import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SettingDetailComponent } from './setting-detail.component';

describe('Setting Management Detail Component', () => {
  let comp: SettingDetailComponent;
  let fixture: ComponentFixture<SettingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ setting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SettingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SettingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load setting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.setting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
