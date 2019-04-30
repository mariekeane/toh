import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    })
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    expect(service.messages.length).toEqual(0);
    service.add("Test");
    expect(service.messages.length).toEqual(1);
    expect(service.messages).toEqual(['Test']);
  });

  it('should clear messages', () => {
    service.add("Test1");
    service.add("Test2");
    service.add("Test3");
    service.clear();
    expect(service.messages.length).toEqual(0);
  });


});
