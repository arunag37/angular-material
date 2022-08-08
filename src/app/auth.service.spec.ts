import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from './models/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', [ 'post']) }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should return a User List with 16 users', (done: DoneFn) => {
    // service.doLogout().then((response) => {
    //   expect(response).toBe(Boolean);
    //   done();
    // });
  });
});
