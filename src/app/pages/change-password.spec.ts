import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ChangePasswordComponent } from './change-password';
import { GlobeBannerComponent } from '../components/globe-banner';

// Mock del globo 3D para evitar inicializar Three.js en los tests unitarios.
@Component({ selector: 'app-globe-banner', standalone: true, template: '' })
class MockGlobeBanner {
  @Input() skipAnimation = false;
  @Output() animationComplete = new EventEmitter<void>();
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(ChangePasswordComponent, {
        remove: { imports: [GlobeBannerComponent] },
        add: { imports: [MockGlobeBanner] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('validación de complejidad', () => {
    it('should reject short passwords without mixed characters', () => {
      expect(component.meetsComplexity('abc')).toBeFalse();
      expect(component.meetsComplexity('Abcdef12')).toBeFalse(); // sin símbolo
      expect(component.meetsComplexity('abcdef12!')).toBeFalse(); // sin mayúscula
    });

    it('should accept passwords with 8+ chars, upper, lower, number and symbol', () => {
      expect(component.meetsComplexity('Abcdef12!')).toBeTrue();
    });
  });

  describe('checklist en vivo', () => {
    it('should mark all rules as met for a strong password', () => {
      component.newPassword = 'Abcdef12!';
      const rules = component.checklistRules;
      expect(rules.length).toBe(5);
      expect(rules.every((r) => r.met)).toBeTrue();
      expect(rules.every((r) => !r.failed)).toBeTrue();
    });

    it('should mark failed rules when touched and password is weak', () => {
      component.newTouched = true;
      component.newPassword = 'abc';
      const rules = component.checklistRules;
      // 'abc' cumple solo la regla de minúsculas; el resto falla
      expect(rules[0].failed).toBeTrue(); // longitud
      expect(rules[1].failed).toBeTrue(); // mayúscula
      expect(rules[2].met).toBeTrue(); // minúscula
      expect(rules[3].failed).toBeTrue(); // número
      expect(rules[4].failed).toBeTrue(); // símbolo
    });

    it('should not show failures before the field is touched', () => {
      component.newPassword = 'abc';
      expect(component.checklistRules.every((r) => !r.failed)).toBeTrue();
    });
  });

  describe('validaciones de campo', () => {
    it('should require the current password', () => {
      component.currentTouched = true;
      expect(component.currentError).toBe(component.t.currentRequired);
      expect(component.currentState).toBe('error');
    });

    it('should validate the new password complexity on touch', () => {
      component.newTouched = true;
      component.newPassword = 'abc';
      expect(component.newError).toBe(component.t.newWeak);
      expect(component.newState).toBe('error');
    });

    it('should reject a new password equal to the current one', () => {
      component.currentPassword = 'Abcdef12!';
      component.newPassword = 'Abcdef12!';
      component.newTouched = true;
      expect(component.newError).toBe(component.t.newSameAsCurrent);
    });

    it('should detect confirmation mismatch', () => {
      component.newPassword = 'Abcdef12!';
      component.confirmPassword = 'Abcdef12?';
      component.confirmTouched = true;
      expect(component.confirmError).toBe(component.t.confirmMismatch);
      expect(component.confirmState).toBe('error');
    });

    it('should confirm passwords that match', () => {
      component.newPassword = 'Abcdef12!';
      component.confirmPassword = 'Abcdef12!';
      component.confirmTouched = true;
      expect(component.confirmError).toBe('');
      expect(component.confirmSuccess).toBe(component.t.confirmOk);
      expect(component.confirmState).toBe('success');
    });
  });

  describe('submit', () => {
    it('should not submit when the form is invalid', () => {
      component.onSubmit();
      expect(component.submitted).toBeFalse();
      expect(component.currentTouched).toBeTrue();
      expect(component.newTouched).toBeTrue();
      expect(component.confirmTouched).toBeTrue();
    });

    it('should show the success state on a valid submit', () => {
      component.currentPassword = 'Temporal1!';
      component.newPassword = 'NuevaPass1!';
      component.confirmPassword = 'NuevaPass1!';
      expect(component.isFormValid()).toBeTrue();
      component.onSubmit();
      expect(component.submitted).toBeTrue();
    });
  });

  describe('visibilidad e idioma', () => {
    it('should toggle visibility of each field', () => {
      component.toggleCurrentVisibility();
      expect(component.showCurrent).toBeTrue();
      component.toggleNewVisibility();
      expect(component.showNew).toBeTrue();
      component.toggleConfirmVisibility();
      expect(component.showConfirm).toBeTrue();
    });

    it('should switch language between es and en', () => {
      expect(component.language).toBe('es');
      component.toggleLanguage();
      expect(component.language).toBe('en');
      expect(component.title).toBe('CHANGE PASSWORD');
      component.toggleLanguage();
      expect(component.title).toBe('CAMBIAR CONTRASEÑA');
    });
  });
});
